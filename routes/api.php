
<?php

use App\Http\Controllers\Api\AuthController;

use App\Http\Controllers\Api\BbmAnlbPackageController;
use App\Http\Controllers\Api\BbmCodeController;
use App\Http\Controllers\Api\BbmGisPackageController;
use App\Http\Controllers\Api\BbmKpiController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\GisDumpController;
use App\Http\Controllers\Api\KlwDumpController;
use App\Http\Controllers\Api\KlwFieldController;
use App\Http\Controllers\Api\UmdlCollectiveController;
use App\Http\Controllers\Api\UmdlCompanyPropertiesController;
use App\Http\Controllers\Api\UmdlKpiValuesController;
use App\Http\Controllers\Api\UserController;
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
        $user = $request->user();
        $user = $user->load('roles');
        return $user;
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/companies/index', [CompanyController::class, 'index']);
    Route::get('/companies/getcompany/{company}', [CompanyController::class, 'getcompany']);
    Route::get('/companies/getproperties/{company}', [CompanyController::class, 'getproperties']);
    Route::put('/companies/update/{company}', [CompanyController::class, 'update']);
    Route::get('/companies/fields', [CompanyController::class, 'getCompanyFields']);

    Route::put('/companyproperties/update/{umdlcompanyproperties}', [UmdlCompanyPropertiesController::class, 'update']);

    Route::get('/bbm/getcodes', [BbmCodeController::class, 'index']);
    Route::get('/bbm/getkpis', [BbmCodeController::class, 'kpis']);

    Route::get('/bbmkpi/getselected/{kpi}', [BbmKpiController::class, 'getselected']);
    Route::get('/bbmkpi/getnotselected/{kpi}', [BbmKpiController::class, 'getnotselected']);
    Route::post('/bbmkpi/{kpi}/{bbmcode}', [BbmKpiController::class, 'store']);

    Route::get('/collectives/index', [UmdlCollectiveController::class, 'index']);

    Route::put('/gisdump/uploadexcel', [GisDumpController::class, 'uploadexcel']);
    Route::get('/gisdump', [GisDumpController::class, 'index']);
    Route::get('/gisdump/{id}', [GisDumpController::class, 'show']);
    Route::delete('/gisdump/{id}', [GisDumpController::class, 'destroy']);

    Route::put('/klwdump/upload', [KlwDumpController::class, 'upload']);
    Route::put('/klwdump/uploadexcel', [KlwDumpController::class, 'uploadexcel']);
    Route::get('/klwdump', [KlwDumpController::class, 'index']);
    Route::delete('/klwdump/{klwDump}', [KlwDumpController::class, 'destroy']);

    Route::get('/umdlkpi/getscores/{company}/', array(UmdlKpiValuesController::class, 'getscores'));
    Route::get('/umdlkpi/getcollectivescores/{collective}/', array(UmdlKpiValuesController::class, 'getcollectivescores'));
    Route::get('/umdlkpi/getallscores/', array(UmdlKpiValuesController::class, 'getallscores'));
    Route::get('/umdlkpi/totalsperkpi/{collective}/', array(UmdlKpiValuesController::class, 'totalsperkpi'));

    Route::apiResource('/bbmcodes', BbmCodeController::class);
    Route::apiResource('/bbmkpi', BbmKpiController::class);
    Route::apiResource('/bbmgispackages', BbmGisPackageController::class);
    Route::apiResource('/bbmanlbpackages', BbmAnlbPackageController::class);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/companies', CompanyController::class);

});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);





