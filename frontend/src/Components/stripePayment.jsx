import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51OnGlMKW10USdtx6siG6uAaAJr5KcArZbiN4CTL1P8hMVU5gDFhkr5YxHrYIRSMW9ZsMa7pqLZcgH6Mvl8C3lQDM00yhhmRDW0');

const CheckoutButton = ({all_product,cartItems}) => {
    
    const handleCheckout = async () => {

        const stripe = await stripePromise;
        const response = await fetch('http://localhost:4000/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({all_product,cartItems}),
        });
        const session = await response.json();
        const result = await stripe.redirectToCheckout({
            sessionId: session.sessionId
        });
        if (result.error) {
            console.error("Error redirecting to checkout:", result.error.message);
        }
    };

    return (
        <button onClick={handleCheckout}>Checkout</button>
    );
};

export default CheckoutButton;
