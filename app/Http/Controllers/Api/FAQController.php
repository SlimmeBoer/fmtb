<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFAQRequest;
use App\Http\Requests\UpdateFAQRequest;
use App\Http\Resources\FAQResource;
use App\Http\Resources\SettingResource;
use App\Models\FAQ;
use App\Models\SystemLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FAQController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return FAQResource::collection(
            FAQ::query()->orderBy('order')->get()
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFAQRequest $request)
    {

        $data = $request->validated();
        $data['order'] = FAQ::max('order') + 1;

        $faq = FAQ::create($data);

        SystemLog::create(array(
            'user_id' => Auth::user()->id,
            'type' => 'CREATE',
            'message' => 'FAQ-vraag toegevoegd: ' . $faq->question,
        ));

        return response(new FAQResource($faq),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(FAQ $fAQ)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FAQ $fAQ)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFAQRequest $request, FAQ $faq)
    {
        $data = $request->validated();
        $faq->update($data);

        // Log
        SystemLog::create(array(
            'user_id' => Auth::user()->id,
            'type' => 'UPDATE',
            'message' => 'Werkte FAQ-vraag bij: ' . $faq->question,
        ));

        return new FAQResource($faq);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FAQ $faq)
    {
        // Log
        SystemLog::create(array(
            'user_id' => Auth::user()->id,
            'type' => 'DELETE',
            'message' => 'FAQ-vraag verwijderd: ' . $faq->question,
        ));

        $faq->delete();
        return response("",204);
    }

    /**
    * Rorder the FAQs with drag and drop
    */
    public function reorder(Request $request)
    {
        foreach ($request->faqs as $faqData) {
            FAQ::where('id', $faqData['id'])->update(['order' => $faqData['order']]);
        }
        return response()->json(['message' => 'Order updated']);
    }
}
