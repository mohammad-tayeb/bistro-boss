import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCarts from "../../../Hooks/useCarts";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
    const [error, setError] = useState()
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState('')
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const [cart] = useCarts()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const { user } = UseAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        const card = elements.getElement(CardElement);


        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        //confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'no email found',
                    email: user?.email || 'no user name found'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Transaction ID: ${paymentIntent.id}`,
                    showConfirmButton: false,
                });
                //save the payment in database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date().toLocaleString(), //TODO:have to convert the date to utc
                    cartIds: cart.map(item => item._id), //storeing an array in databae
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }
                //sending payment informaion
                const res = await axiosSecure.post('/payments', payment)
                console.log(res.data)
                if(res.data?.paymentResult.insertedId){
                    navigate('/dashboard/paymentHistory') 
                }
            }
        }
    }

    return (
        <>
            {/* form */}
            <form onClick={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-10">
                <div className="mb-4 p-3 border border-gray-300 rounded-lg">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret}
                    className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 disabled:bg-gray-400">
                    Pay
                </button>
            </form>
            {/* form */}

            {/* showing the error message */}
            {
                error ? (<div role="alert" className="alert alert-error mt-10 w-1/2 mx-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>) : null
            }
        </>
    );
};

export default PaymentForm;