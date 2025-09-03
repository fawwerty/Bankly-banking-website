<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    /**
     * Get system reports (Admin only)
     * GET /api/admin/reports
     */
    public function index(Request $request)
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

            $reports = [
                'total_users' => DB::table('users')->count(),
                'total_accounts' => Account::count(),
                'total_balance' => Account::sum('balance'),
                'total_transactions' => Transaction::count(),
                'transactions_today' => Transaction::whereDate('created_at', today())->count(),
                'accounts_by_type' => Account::select('account_type', DB::raw('count(*) as count'))
                    ->groupBy('account_type')
                    ->get(),
                'transactions_by_type' => Transaction::select('transaction_type', DB::raw('count(*) as count'), DB::raw('sum(amount) as total'))
                    ->groupBy('transaction_type')
                    ->get(),
                'recent_transactions' => Transaction::with(['account.user'])
                    ->latest()
                    ->limit(10)
                    ->get(),
            ];

            return response()->json([
                'success' => true,
                'reports' => $reports
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate reports',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user-specific reports
     * GET /api/reports/user
     */
    public function userReports(Request $request)
    {
        try {
            $user = $request->user();

            $reports = [
                'total_accounts' => $user->accounts()->count(),
                'total_balance' => $user->accounts()->sum('balance'),
                'total_transactions' => Transaction::whereHas('account', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })->count(),
                'accounts' => $user->accounts()->with(['transactions' => function ($query) {
                    $query->latest()->limit(5);
                }])->get(),
                'recent_transactions' => Transaction::whereHas('account', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->with(['account'])
                ->latest()
                ->limit(10)
                ->get(),
            ];

            return response()->json([
                'success' => true,
                'reports' => $reports
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate user reports',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get account-specific reports
     * GET /api/reports/account/{accountId}
     */
    public function accountReports(Request $request, $accountId)
    {
        try {
            $account = $request->user()->accounts()->findOrFail($accountId);

            $reports = [
                'account' => $account,
                'total_transactions' => $account->transactions()->count(),
                'total_deposits' => $account->transactions()->where('transaction_type', 'deposit')->sum('amount'),
                'total_withdrawals' => $account->transactions()->where('transaction_type', 'withdraw')->sum('amount'),
                'total_transfers' => $account->transactions()->where('transaction_type', 'transfer')->sum('amount'),
                'transactions_by_month' => $account->transactions()
                    ->select(DB::raw('MONTH(created_at) as month'), DB::raw('YEAR(created_at) as year'), DB::raw('count(*) as count'), DB::raw('sum(amount) as total'))
                    ->groupBy('year', 'month')
                    ->orderBy('year', 'desc')
                    ->orderBy('month', 'desc')
                    ->get(),
                'recent_transactions' => $account->transactions()
                    ->latest()
                    ->limit(20)
                    ->get(),
            ];

            return response()->json([
                'success' => true,
                'reports' => $reports
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate account reports',
                'error' => $e->getMessage()
            ], 404);
        }
    }
}
