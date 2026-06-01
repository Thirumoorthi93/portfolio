<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    /**
     * Store a new contact form submission.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'service_interest' => 'nullable|array',
            'service_interest.*' => 'string',
            'message' => 'required|string|max:2000',
        ]);

        if (isset($validated['service_interest']) && is_array($validated['service_interest'])) {
            $validated['service_interest'] = implode(', ', $validated['service_interest']);
        }

        $contact = Contact::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Thank you for reaching out! We will get back to you shortly.',
            'data' => $contact,
        ], 201);
    }

    /**
     * List all contact submissions (admin endpoint).
     */
    public function index(): JsonResponse
    {
        $contacts = Contact::latest()->paginate(20);

        return response()->json($contacts);
    }
}
