
<?php

use App\Http\Controllers\Api\AuthController;

use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\KlwDumpController;
use App\Http\Controllers\Api\KlwFieldController;
use App\Http\Controllers\Api\UmdlKpiValuesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/companies/index', [CompanyController::class, 'index']);

    Route::get('/companies/getcompany/{company}', [CompanyController::class, 'getcompany']);
    Route::get('/companies/getproperties/{company}', [CompanyController::class, 'getproperties']);

    Route::put('/klwdump/upload', [KlwDumpController::class, 'upload']);

    Route::get('/umdlkpi/getscores/{company}/', array(UmdlKpiValuesController::class, 'getscores'));


    Route::apiResource('/companies', CompanyController::class);
    /*
    Route::put('/images/bulk', [ImageController::class, 'bulk']);
    Route::get('/images/getfolder/{id}', [ImageController::class, 'getfolder']);

    Route::put('/audio/bulk', [AudioController::class, 'bulk']);
    Route::get('/audio/getfolder/{id}', [AudioController::class, 'getfolder']);

    Route::put('/video/bulk', [VideoController::class, 'bulk']);
    Route::get('/video/getfolder/{id}', [VideoController::class, 'getfolder']);

    Route::put('/config/bulk', [ConfigController::class, 'bulk']);
    Route::get('/config/getfolder/{id}', [ConfigController::class, 'getfolder']);

    Route::get('/folders/image', [FolderController::class, 'image']);
    Route::get('/folders/audio', [FolderController::class, 'audio']);
    Route::get('/folders/video', [FolderController::class, 'video']);
    Route::get('/folders/config', [FolderController::class, 'config']);

    Route::get('/blocks/quiz/{id}', [BlockController::class, 'quiz']);
    Route::get('/blocks/notquiz/{id}', [BlockController::class, 'notquiz']);
    Route::get('/blocks/nextquestion/{id}', [BlockController::class, 'nextquestion']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::put('/questions/moveup/{id}', [QuestionController::class, 'moveup']);
    Route::put('/questions/movedown/{id}', [QuestionController::class, 'movedown']);
    Route::put('/questions/duplicate/{id}', [QuestionController::class, 'duplicate']);
    Route::get('/questions/block/{id}', [QuestionController::class, 'block']);

    Route::get('/quiz/powerpoint/{id}', [QuizController::class, 'powerpoint']);
    Route::get('/quiz/powerpointanswers/{id}', [QuizController::class, 'powerpointanswers']);
    Route::get('/quiz/word/{id}', [QuizController::class, 'word']);
    Route::get('/quiz/wordanswers/{id}', [QuizController::class, 'wordanswers']);

    Route::apiResource('/users', UserController::class);
    Route::apiResource('/categories', CategoryController::class);
    Route::apiResource('/blocks', BlockController::class);
    Route::apiResource('/icons', IconController::class);
    Route::apiResource('/images', ImageController::class);
    Route::apiResource('/questions', QuestionController::class);
    Route::apiResource('/questiontypes', QuestionTypeController::class);
    Route::apiResource('/folders', FolderController::class);
    Route::apiResource('/audio', AudioController::class);
    Route::apiResource('/video', VideoController::class);
    Route::apiResource('/config', ConfigController::class);
    Route::apiResource('/quiz', QuizController::class);
    */

});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);





