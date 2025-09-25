
<?php

use App\Http\Controllers\Api\AreaController;
use App\Http\Controllers\Api\AuthController;

use App\Http\Controllers\Api\BbmAnlbPackageController;
use App\Http\Controllers\Api\BbmCodeController;
use App\Http\Controllers\Api\BbmGisPackageController;
use App\Http\Controllers\Api\BbmKpiController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\ExcelController;
use App\Http\Controllers\Api\FAQController;
use App\Http\Controllers\Api\GisDumpController;
use App\Http\Controllers\Api\KlwDumpController;
use App\Http\Controllers\Api\KpiScoreController;
use App\Http\Controllers\Api\OldResultController;
use App\Http\Controllers\Api\PdfController;
use App\Http\Controllers\Api\RawFileController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\SystemLogController;
use App\Http\Controllers\Api\CollectiveController;
use App\Http\Controllers\Api\CompanyPropertiesController;
use App\Http\Controllers\Api\KpiValuesController;
use App\Http\Controllers\Api\UserController;
use App\Mail\ResetPasswordMail;
use App\Models\SystemLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;

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

    Route::get('/areas/index', [AreaController::class, 'index']);
    Route::post('areas/update-weights', [AreaController::class, 'updateWeights']);
    Route::get('areas/getbycompany/{company}', [AreaController::class, 'getByCompany']);

    Route::get('/companies/index', [CompanyController::class, 'index']);
    Route::get('/companies/anonymous', [CompanyController::class, 'anonymous']);
    Route::get('/companies/currentcollective', [CompanyController::class, 'getcurrentcollective']);
    Route::get('/companies/getcompany/{company}', [CompanyController::class, 'getcompany']);
    Route::get('/companies/getcompanyanon/{company}', [CompanyController::class, 'getcompanyanon']);
    Route::get('/companies/getproperties/{company}', [CompanyController::class, 'getproperties']);
    Route::put('/companies/update/{company}', [CompanyController::class, 'update']);
    Route::get('/companies/fields', [CompanyController::class, 'getCompanyFields']);
    Route::get('/companies/actionscollective', [CompanyController::class, 'getCollectiveActions']);
    Route::get('/companies/actions', [CompanyController::class, 'getAllActions']);
    Route::get('/companies/signalscollective', [CompanyController::class, 'getCollectiveSignals']);
    Route::get('/companies/signals', [CompanyController::class, 'getAllSignals']);
    Route::get('/companies/completion', [CompanyController::class, 'getCompletion']);
    Route::get('/companies/publishedcompleted', [CompanyController::class, 'getPublishedCompleted']);
    Route::post('/companies/savedata', [CompanyController::class, 'saveData']);
    Route::get('/companies/getviewingallowed/{company}', [CompanyController::class, 'getViewingAllowed']);

    Route::put('/companyproperties/update/{companyproperties}', [CompanyPropertiesController::class, 'update']);

    Route::get('/bbm/getcodes', [BbmCodeController::class, 'index']);
    Route::get('/bbm/getbykpi/{kpi}', [BbmCodeController::class, 'getByKpi']);
    Route::get('/bbm/getkpis', [BbmCodeController::class, 'kpis']);

    Route::get('/bbmkpi/getselected/{kpi}', [BbmKpiController::class, 'getselected']);
    Route::get('/bbmkpi/getnotselected/{kpi}', [BbmKpiController::class, 'getnotselected']);
    Route::post('/bbmkpi/{kpi}/{bbmcode}', [BbmKpiController::class, 'store']);

    Route::get('/bbmgispackages/overview', [BbmGisPackageController::class, 'getOverview']);

    Route::get('/bbmanlbpackages/overview', [BbmAnlbPackageController::class, 'getOverview']);

    Route::get('/export/download', [ExcelController::class, 'download']); // sync, één call

    Route::get('/pdf/getcompany/{company}', [PdfController::class, 'generatePdf']);
    Route::get('/pdf/currentcompany', [PdfController::class, 'generatePdfCurrentCompany']);
    Route::get('/pdf/currentcompanyconcept', [PdfController::class, 'generatePdfCurrentCompanyConcept']);

    Route::get('/collectives/index', [CollectiveController::class, 'index']);
    Route::get('/collectives/getcurrent', [CollectiveController::class, 'getCurrent']);
    Route::get('/collectives/completion', [CollectiveController::class, 'getCompletion']);

    Route::post('/faq/reorder', [FAQController::class, 'reorder']);

    Route::put('/gisdump/uploadexcel', [GisDumpController::class, 'uploadexcel']);
    Route::get('/gisdump', [GisDumpController::class, 'index']);
    Route::get('/gisdump/currentcollective', [GisDumpController::class, 'currentcollective']);
    Route::get('/gisdump/runall', [GisDumpController::class, 'runall']);
    Route::get('/gisdump/runcollective', [GisDumpController::class, 'runcollective']);
    Route::get('/gisdump/{id}', [GisDumpController::class, 'show']);
    Route::delete('/gisdump/{id}', [GisDumpController::class, 'destroy']);

    Route::put('/klwdump/upload', [KlwDumpController::class, 'upload']);
    Route::get('/klwdump/dumpscollective', [KlwDumpController::class, 'dumpscollective']);
    Route::get('/klwdump/alldumps', [KlwDumpController::class, 'getAllDumps']);
    Route::get('/klwdump/currentcollective', [KlwDumpController::class, 'currentcollective']);
    Route::get('/klwdump/currentcompany', [KlwDumpController::class, 'currentcompany']);
    Route::put('/klwdump/uploadexcel', [KlwDumpController::class, 'uploadexcel']);
    Route::get('/klwdump', [KlwDumpController::class, 'index']);
    Route::delete('/klwdump/{klwDump}', [KlwDumpController::class, 'destroy']);

    Route::put('/oldresults/upload', [OldResultController::class, 'upload']);
    Route::get('/oldresults/getbycompany/{id}', [OldResultController::class, 'getByCompany']);

    Route::get('/kpi/getscores/{company}/', array(KpiValuesController::class, 'getscores'));
    Route::get('/kpi/getscorescurrentcompany', array(KpiValuesController::class, 'getscorescurrentcompany'));
    Route::get('/kpi/getcollectivescores/{collective}/', array(KpiValuesController::class, 'getcollectivescores'));
    Route::get('/kpi/getareascores/{area}/', array(KpiValuesController::class, 'getareascores'));
    Route::get('/kpi/getallscores/', array(KpiValuesController::class, 'getallscores'));
    Route::get('/kpi/getallscoresanon/', array(KpiValuesController::class, 'getallscoresanon'));
    Route::get('/kpi/totalsperkpi/', array(KpiValuesController::class, 'totalsperkpi'));
    Route::get('/kpi/totalsperkpicollective/{collective}/', array(KpiValuesController::class, 'totalsperkpicollective'));
    Route::get('/kpi/totalsperkpiarea/{area}/', array(KpiValuesController::class, 'totalsperkpiarea'));

    Route::get('/user/getcurrentrole', [UserController::class, 'getCurrentRole']);
    Route::get('/user/bylastname', [UserController::class, 'byLastName']);
    Route::get('/user/getusersincurrentcollective', [UserController::class, 'getUsersinCurrentCollective']);
    Route::get('/user/roles', [UserController::class, 'roles']);
    Route::get('/user/getdropdown', [UserController::class, 'getDropDown']);

    Route::apiResource('/areas', AreaController::class);
    Route::apiResource('/bbmcodes', BbmCodeController::class);
    Route::apiResource('/bbmkpi', BbmKpiController::class);
    Route::apiResource('/kpiscores', KpiScoreController::class);
    Route::apiResource('/bbmgispackages', BbmGisPackageController::class);
    Route::apiResource('/bbmanlbpackages', BbmAnlbPackageController::class);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/oldresults', OldResultController::class);
    Route::apiResource('/faq', FAQController::class);
    Route::apiResource('/companies', CompanyController::class);
    Route::apiResource('/settings', SettingController::class);
    Route::apiResource('/systemlogs', SystemLogController::class);
    Route::apiResource('/rawfiles', RawFileController::class);

});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/forgot-password', function (Request $request) {
    $request->validate(['email' => 'required|email']);

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['message' => 'Het e-mailadres is niet gevonden in de database.']);
    }

    $token = Password::createToken($user);

    $frontendUrl = config('app.frontend_url'); // << frontend URL uit .env
    $url = "{$frontendUrl}/reset-wachtwoord/{$token}?email=" . urlencode($user->email);

    Mail::to($user->email)->send(new ResetPasswordMail($url));

    SystemLog::create(array(
        'user_id' => $user->id,
        'type' => 'RESET LINK',
        'message' => 'Reset-link verstuurd voor ' . $user->email,
    ));

    return response()->json(['message' => 'De reset-link is verzonden naar je e-mailadres.']);
});

Route::post('/reset-password', function (Request $request) {
    $validator = Validator::make($request->all(), [
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:6|confirmed',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function (User $user, string $password) {
            $user->forceFill([
                'password' => Hash::make($password),
            ])->save();

            SystemLog::create(array(
                'user_id' => $user->id,
                'type' => 'PASSWORD RESET',
                'message' => 'Password gereset voor ' . $user->email,
            ));
        }
    );

    return response()->json([
        'message' => $status === Password::PASSWORD_RESET
            ? 'Het wachtwoord is succesvol gewijzigd. Je wordt over 5 seconden teruggestuurd naar het inlogscherm.'
            : 'Ongeldig token of e-mailadres.'
    ]);
});





