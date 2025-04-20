<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\SystemLog;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return UserResource::collection(
            User::with('roles')->orderBy('id')->get()
        );
    }

    public function byLastName(): AnonymousResourceCollection
    {
        return UserResource::collection(
            User::with('roles')->orderBy('last_name')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreUserRequest $request
     * @return Response
     */
    public function store(StoreUserRequest $request): Response
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);

        // Assign roles
        $role = Role::find($data['role_id']);
        $user->syncRoles([$role]);

        SystemLog::create(array(
            'user_id' => Auth::user()->id,
            'type' => 'CREATE',
            'message' => 'Gebruiker toegevoegd: ' . $data['email'],
        ));

        return response(new UserResource($user),201);
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return UserResource
     */
    public function show(User $user): UserResource
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateUserRequest $request
     * @param User $user
     * @return UserResource
     */
    public function update(UpdateUserRequest $request, User $user): UserResource
    {
        $data = $request->validated();

        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        $user->update($data);

        // Assign roles
        $role = Role::find($data['role_id']);
        $user->syncRoles([$role]);

        // Log
        SystemLog::create(array(
            'user_id' => Auth::user()->id,
            'type' => 'UPDATE',
            'message' => 'Gebruiker gewijzigd: ' . $data['email'],
        ));

        return new UserResource($user);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return Response
     */
    public function destroy(User $user): Response
    {
        // Log
        SystemLog::create(array(
            'user_id' => Auth::user()->id,
            'type' => 'DELETE',
            'message' => 'Gebruiker verwijderd: ' . $user->email,
        ));

        $user->delete();
        return response("",204);

    }

    public function getCurrentRole()
    {
        return response()->json(Auth::user()->getRoleNames()->first());
    }

    public function getUsersinCurrentCollective()
    {
        $user = User::where('id', Auth::id())->first();
        $collective = $user->collectives()->first();

        return response()->json($collective->users()->orderBy('last_name')->get());
    }

    public function roles()
    {
        return Role::orderBy('name')->get(['id', 'name']);
    }
}
