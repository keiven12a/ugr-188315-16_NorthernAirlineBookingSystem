<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';

// Return available payment methods
$payment_methods = [
    [
        'id' => 'visa',
        'name' => 'Visa / MasterCard',
        'description' => 'Credit or Debit Card',
        'icon' => '💳',
        'requires_card' => true
    ],
    [
        'id' => 'paypal',
        'name' => 'PayPal',
        'description' => 'Pay with PayPal account',
        'icon' => '🔵',
        'requires_email' => true
    ],
    [
        'id' => 'bank',
        'name' => 'Bank Transfer',
        'description' => 'Direct bank transfer',
        'icon' => '🏦',
        'requires_bank_details' => true
    ],
    [
        'id' => 'mobile',
        'name' => 'Mobile Money',
        'description' => 'M-Pesa, CBE Birr, etc.',
        'icon' => '📱',
        'requires_mobile' => true
    ]
];

jsonResponse(true, 'Payment methods retrieved', $payment_methods);
?>