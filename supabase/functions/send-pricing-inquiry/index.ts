
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define the structure of the pricing inquiry
interface PricingInquiry {
  name: string;
  email: string;
  role: string;
  institution: string;
  message?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the incoming request body
    const inquiry: PricingInquiry = await req.json();

    // Send email to the admin (replace with your email)
    const emailResponse = await resend.emails.send({
      from: 'Authentiya Pricing Inquiry <onboarding@resend.dev>',
      to: ['your-email@example.com'], // Replace with your actual email
      subject: 'New Pricing Inquiry from Authentiya Website',
      html: `
        <h1>New Pricing Inquiry Received</h1>
        <p><strong>Name:</strong> ${inquiry.name}</p>
        <p><strong>Email:</strong> ${inquiry.email}</p>
        <p><strong>Role:</strong> ${inquiry.role}</p>
        <p><strong>Institution:</strong> ${inquiry.institution}</p>
        ${inquiry.message ? `<p><strong>Message:</strong> ${inquiry.message}</p>` : ''}
      `,
    });

    console.log('Email sent successfully:', emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error('Error in send-pricing-inquiry function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
