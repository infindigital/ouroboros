<?php
/* Ouroboros Hospitality, mail settings for send-enquiry.php */
if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === basename(__FILE__)) { http_response_code(403); exit; }

return [
  // Resend API key (https://resend.com/api-keys), starts with "re_"
  'resend_api_key' => '',

  // Where booking enquiries are delivered
  'to_email' => 'ouroboroshospitality@gmail.com',

  // Sender. Must be on a domain verified in Resend.
  // Until a domain is verified, "onboarding@resend.dev" works but only delivers
  // to the email address that owns the Resend account.
  'from_email' => 'Ouroboros Koksar <onboarding@resend.dev>',

  'subject_prefix' => 'Booking enquiry',
];
