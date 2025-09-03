<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateAccountRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Adjust authorization logic as needed
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'account_type' => 'required|string|in:savings,checking,business',
            'initial_deposit' => 'nullable|numeric|min:0',
            'currency' => 'nullable|string|size:3',
            'branch_code' => 'nullable|string|max:10',
        ];
    }
}
