<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class Authorization extends Controller
{
    /**
     * function for view page register
     */
    public function index()
    {
        return view('auth.register');
    }

    /**
     * function for view page register
     */
    public function login()
    {
        return view('auth.login');
    }

    /**
     * function for  register
     */
    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => 'user'
        ]);

        return redirect('/login')->with('success', 'Registration successful! Please login.');
    }

    /**
     * function for  login
     */
    public function authorization(Request $request)
    {
        $request->validate([
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }
}
