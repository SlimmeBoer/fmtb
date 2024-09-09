<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class  AuthController extends Controller
{
    public function signup(SignupRequest $request): Response|Application|ResponseFactory
    {
        $data = $request->validated();

        if (isset($data['image'])) {
            if (gettype($data['image']) != "string")
            {
                $fileName = time().'.' . $data['image']->extension();
                $data['image']->move(public_path('uploads/users/'), $fileName);
                $userImage = 'uploads/users/' . $fileName;
                $data['image'] = $userImage;
            }
        }
        else
        {
            $data['image'] = '';
        }

        /** @var User $user */
        $user = User::create([
            'first_name' => $data['first_name'],
            'middle_name' => $data['middle_name'],
            'last_name' => $data['last_name'],
            'image' => $data['image'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user','token'));
    }

    public function login(LoginRequest $request): Response|Application|ResponseFactory
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)){
            return response([
                'message'=> 'Het ingevulde e-mailadres of wachtwoord is niet correct'
            ],422);
        }
        /** @var User $user */
        $user = Auth::user();
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
