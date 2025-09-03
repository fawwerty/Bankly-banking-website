<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\CreateAccountRequest;
use App\Models\Account;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AccountController extends Controller
{
    /**
     * Get all accounts for authenticated user
     * GET /api/accounts
     */
    public function index(Request $request)
    {
        try {
            $user = $request->user();
            $accounts = $user->accounts()
                ->with(['transactions' => function ($query) {
                    $query->latest()->limit(5);
                }])
                ->get();

            return response()->json([
                'success' => true,
                'accounts' => $accounts
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch accounts',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create a new account
     * POST /api/accounts
     */
    public function store(CreateAccountRequest $request)
    {
        try {
            DB::beginTransaction();

            $user = $request->user();
            $data = $request->validated();

            $account = new Account($data);
            $account->user_id = $user->id;
            $account->account_number = Account::generateAccountNumber();
            $account->save();

            // Create initial deposit transaction if provided
            if (isset($data['initial_deposit']) && $data['initial_deposit'] > 0) {
                $account->balance = $data['initial_deposit'];
                $account->save();

                $account->transactions()->create([
                    'transaction_type' => 'deposit',
                    'amount' => $data['initial_deposit'],
                    'balance_after' => $data['initial_deposit'],
                    'description' => 'Initial deposit',
                    'reference_number' => Transaction::generateReferenceNumber(),
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Account created successfully',
                'account' => $account->load('transactions')
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create account',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get specific account
     * GET /api/accounts/{id}
     */
    public function show(Request $request, $id)
    {
        try {
            $account = $request->user()
                ->accounts()
                ->with(['transactions' => function ($query) {
                    $query->latest();
                }])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'account' => $account
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Account not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update account
     * PUT /api/accounts/{id}
     */
    public function update(Request $request, $id)
    {
        try {
            $account = $request->user()->accounts()->findOrFail($id);

            $validated = $request->validate([
                'status' => 'sometimes|in:active,inactive,suspended,closed',
                'branch_code' => 'sometimes|string|max:10',
            ]);

            $account->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Account updated successfully',
                'account' => $account
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update account',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete account
     * DELETE /api/accounts/{id}
     */
    public function destroy(Request $request, $id)
    {
        try {
            $account = $request->user()->accounts()->findOrFail($id);

            if ($account->balance > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete account with positive balance'
                ], 422);
            }

            $account->delete();

            return response()->json([
                'success' => true,
                'message' => 'Account deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete account',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get account balance
     * GET /api/accounts/{id}/balance
     */
    public function balance(Request $request, $id)
    {
        try {
            $account = $request->user()->accounts()->findOrFail($id);

            return response()->json([
                'success' => true,
                'balance' => $account->balance,
                'currency' => $account->currency
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get balance',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Get all accounts system-wide (Admin only)
     * GET /api/admin/accounts
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

            $accounts = Account::with(['user' => function($query) {
                $query->select('id', 'name', 'email');
            }])
            ->orderBy('created_at', 'desc')
            ->get();

            return response()->json([
                'success' => true,
                'accounts' => $accounts,
                'total_accounts' => $accounts->count(),
                'total_balance' => $accounts->sum('balance')
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch accounts',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get accounts for teller operations
     * GET /api/teller/accounts
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

            $accounts = Account::with(['user' => function($query) {
                $query->select('id', 'name', 'email');
            }])
            ->where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->get();

            return response()->json([
                'success' => true,
                'accounts' => $accounts
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch accounts',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
