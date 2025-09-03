<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\TransactionRequest;
use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    /**
     * Get all transactions for authenticated user
     * GET /api/transactions
     */
    public function index(Request $request)
    {
        try {
            $user = $request->user();
            $transactions = Transaction::whereHas('account', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->orWhereHas('relatedAccount', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->with(['account', 'relatedAccount'])
            ->latest()
            ->paginate(20);

            return response()->json([
                'success' => true,
                'transactions' => $transactions
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch transactions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get specific transaction
     * GET /api/transactions/{id}
     */
    public function show(Request $request, $id)
    {
        try {
            $user = $request->user();
            $transaction = Transaction::where(function ($query) use ($user) {
                $query->whereHas('account', function ($subQuery) use ($user) {
                    $subQuery->where('user_id', $user->id);
                })
                ->orWhereHas('relatedAccount', function ($subQuery) use ($user) {
                    $subQuery->where('user_id', $user->id);
                });
            })
            ->with(['account', 'relatedAccount'])
            ->findOrFail($id);

            return response()->json([
                'success' => true,
                'transaction' => $transaction
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Transaction not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Get transactions for specific account
     * GET /api/accounts/{id}/transactions
     */
    public function getAccountTransactions(Request $request, $accountId)
    {
        try {
            $account = $request->user()->accounts()->findOrFail($accountId);
            $transactions = $account->transactions()
                ->with(['relatedAccount'])
                ->latest()
                ->paginate(20);

            return response()->json([
                'success' => true,
                'transactions' => $transactions
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch account transactions',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Process deposit
     * POST /api/transactions/deposit
     */
    public function deposit(TransactionRequest $request)
    {
        try {
            DB::beginTransaction();

            $data = $request->validated();
            $account = $request->user()->accounts()->findOrFail($data['account_id']);

            $account->balance += $data['amount'];
            $account->save();

            $transaction = $account->transactions()->create([
                'transaction_type' => 'deposit',
                'amount' => $data['amount'],
                'balance_after' => $account->balance,
                'description' => $data['description'] ?? 'Deposit',
                'reference_number' => Transaction::generateReferenceNumber(),
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Deposit successful',
                'transaction' => $transaction->load('account')
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Deposit failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Process withdrawal
     * POST /api/transactions/withdraw
     */
    public function withdraw(TransactionRequest $request)
    {
        try {
            DB::beginTransaction();

            $data = $request->validated();
            $account = $request->user()->accounts()->findOrFail($data['account_id']);

            if ($account->balance < $data['amount']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Insufficient funds'
                ], 422);
            }

            $account->balance -= $data['amount'];
            $account->save();

            $transaction = $account->transactions()->create([
                'transaction_type' => 'withdraw',
                'amount' => $data['amount'],
                'balance_after' => $account->balance,
                'description' => $data['description'] ?? 'Withdrawal',
                'reference_number' => Transaction::generateReferenceNumber(),
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Withdrawal successful',
                'transaction' => $transaction->load('account')
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Withdrawal failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Process transfer
     * POST /api/transactions/transfer
     */
    public function transfer(TransactionRequest $request)
    {
        try {
            DB::beginTransaction();

            $data = $request->validated();
            $fromAccount = $request->user()->accounts()->findOrFail($data['account_id']);
            $toAccount = Account::findOrFail($data['to_account_id']);

            if ($fromAccount->id === $toAccount->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot transfer to the same account'
                ], 422);
            }

            if ($fromAccount->balance < $data['amount']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Insufficient funds'
                ], 422);
            }

            // Deduct from source account
            $fromAccount->balance -= $data['amount'];
            $fromAccount->save();

            // Add to destination account
            $toAccount->balance += $data['amount'];
            $toAccount->save();

            // Create transaction for source account
            $fromTransaction = $fromAccount->transactions()->create([
                'transaction_type' => 'transfer',
                'amount' => $data['amount'],
                'balance_after' => $fromAccount->balance,
                'related_account_id' => $toAccount->id,
                'description' => $data['description'] ?? 'Transfer to ' . $toAccount->account_number,
                'reference_number' => Transaction::generateReferenceNumber(),
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Transfer successful',
                'transaction' => $fromTransaction->load('account')
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Transfer failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all transactions system-wide (Admin only)
     * GET /api/admin/transactions
     */
    public function adminIndex(Request $request)
    {
        try {
            $user = $request->user();

            // Check if user is admin
            if (!$user->hasRole('admin')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access'
                ], 403);
            }

            $transactions = Transaction::with(['account.user', 'relatedAccount'])
                ->latest()
                ->paginate(50);

            return response()->json([
                'success' => true,
                'transactions' => $transactions,
                'total_transactions' => $transactions->total(),
                'total_amount' => $transactions->sum('amount')
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch transactions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get transactions for teller operations
     * GET /api/teller/transactions
     */
    public function tellerIndex(Request $request)
    {
        try {
            $user = $request->user();

            // Check if user is teller
            if (!$user->hasRole('teller')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access'
                ], 403);
            }

            $transactions = Transaction::with(['account.user', 'relatedAccount'])
                ->where('status', 'completed')
                ->latest()
                ->paginate(50);

            return response()->json([
                'success' => true,
                'transactions' => $transactions
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch transactions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Process transaction for teller
     * POST /api/teller/transactions/process
     */
    public function processTransaction(Request $request)
    {
        try {
            $user = $request->user();

            // Check if user is teller
            if (!$user->hasRole('teller')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access'
                ], 403);
            }

            $validated = $request->validate([
                'transaction_id' => 'required|integer|exists:transactions,id',
                'action' => 'required|in:approve,reject',
                'notes' => 'nullable|string|max:255',
            ]);

            $transaction = Transaction::findOrFail($validated['transaction_id']);

            if ($validated['action'] === 'approve') {
                $transaction->status = 'completed';
                $transaction->save();
                $message = 'Transaction approved successfully';
            } else {
                $transaction->status = 'cancelled';
                $transaction->save();
                $message = 'Transaction rejected successfully';
            }

            return response()->json([
                'success' => true,
                'message' => $message,
                'transaction' => $transaction
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to process transaction',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
