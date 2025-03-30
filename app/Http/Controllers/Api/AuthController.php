<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class  AuthController extends Controller
{

    public function login(LoginRequest $request): Response|Application|ResponseFactory
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)){
            return response([
                'message'=> 'Het ingevulde e-mailadres of wachtwoord is niet correct',
                "errors" => [
                    "email" => ["Het ingevulde e-mailadres of wachtwoord is niet correct"],
                    ]

            ],422);
        }
        /** @var User $user */
        $user = Auth::user();
        $user = $user->load('roles');

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request): Response|Application|ResponseFactory
    {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('',204);
    }


}
