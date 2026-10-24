<?php
/* Ouroboros Hospitality, booking enquiry handler (Resend) */
header('Content-Type: application/json; charset=utf-8');

function out($code, $data) { http_response_code($code); echo json_encode($data); exit; }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(405, ['ok' => false, 'error' => 'Method not allowed']);

$cfg = require __DIR__ . '/config.php';
if (empty($cfg['resend_api_key'])) out(500, ['ok' => false, 'error' => 'Mail is not configured']);

// honeypot: bots fill hidden fields, pretend success
if (!empty($_POST['website'])) out(200, ['ok' => true]);

$f = function ($k, $max = 200) { return trim(mb_substr((string)($_POST[$k] ?? ''), 0, $max)); };
$name = $f('name');
$phone = $f('phone', 30);
$email = $f('email');
$checkin = $f('checkin', 10);
$checkout = $f('checkout', 10);
$guests = $f('guests', 30);
$occasion = $f('occasion', 50);
$extras = isset($_POST['extras']) ? implode(', ', array_map(function ($x) { return mb_substr(trim((string)$x), 0, 50); }, (array)$_POST['extras'])) : '';
$message = $f('message', 3000);

if ($name === '' || !preg_match('/^[0-9+\s\-]{8,}$/', $phone)) out(422, ['ok' => false, 'error' => 'Name and a valid phone number are required']);
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) $email = '';

$rows = [
  'Name' => $name, 'Phone' => $phone, 'Email' => $email,
  'Check-in' => $checkin, 'Check-out' => $checkout, 'Guests' => $guests,
  'Occasion' => $occasion, 'Add-ons' => $extras,
];
$e = function ($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); };
$html = '<h2 style="font-family:Georgia,serif">New booking enquiry</h2><table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">';
$text = "New booking enquiry\n\n";
foreach ($rows as $k => $v) {
  if ($v === '') continue;
  $html .= '<tr><td style="color:#777">' . $e($k) . '</td><td><b>' . $e($v) . '</b></td></tr>';
  $text .= "$k: $v\n";
}
$html .= '</table>';
if ($message !== '') {
  $html .= '<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">' . $e($message) . '</p>';
  $text .= "\n$message\n";
}

$payload = [
  'from' => $cfg['from_email'],
  'to' => [$cfg['to_email']],
  'subject' => $cfg['subject_prefix'] . ': ' . $name . ($checkin ? " ($checkin to $checkout)" : ''),
  'html' => $html,
  'text' => $text,
];
if ($email !== '') $payload['reply_to'] = $email;

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 15,
  CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $cfg['resend_api_key'], 'Content-Type: application/json'],
  CURLOPT_POSTFIELDS => json_encode($payload),
]);
$res = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($res === false || $status < 200 || $status >= 300) {
  error_log('Resend error ' . $status . ': ' . $res);
  out(502, ['ok' => false, 'error' => 'Could not send enquiry']);
}
out(200, ['ok' => true]);
