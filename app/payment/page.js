'use client';

import { useContext, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CartContext } from '@/components/CartContext';


const PaymentContext = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  const {clearCart} = useContext(CartContext)

  useEffect(() => {
    if (orderId && amount) {
      loadRazorpayScript()
        .then(() => {
          initiatePayment(orderId, amount);
        })
        .catch((error) => {
          console.error('Failed to load Razorpay script:', error);
        });
    }
  }, [orderId, amount]);

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        return resolve();
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Razorpay script'));
      document.body.appendChild(script);
    });
  };

  const initiatePayment = (orderId, amount) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount, // Amount in paisa (100 INR = 10000 paisa)
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Test Transaction',
      order_id: orderId,
      handler: function (response) {
        // Handle successful payment here
        clearCart(); // Clear cart
        setTimeout(() => {
          window.location.href = `/thank-you`;
        }, 1000); // Delay redirection to ensure clearCart is processed
      },
      prefill: {
        name: 'Your Name',
        email: 'email@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  

  return (
    <>
      <div>
        <h1>Processing Payment...</h1>
      </div>
    </>
  );
};

const Payment = ()=>{
  return(
    <Suspense fallback={<div>Loading payment...</div>}>
      <PaymentContext/>
    </Suspense>
  )
}

export default Payment;



