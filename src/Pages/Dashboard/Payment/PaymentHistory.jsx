import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const PaymentHistory = () => {
    const { user } = UseAuth()
    const axiosSecure = useAxiosSecure()

    const { data: paymentHistory = [] } = useQuery({
        queryKey: ['paymentHistory', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data
        }

    })

    console.log(paymentHistory)

    // animation
    const { ref, inView } = useInView({
        triggerOnce: true, // Ensures animation triggers only once
        threshold: 0, // Trigger when 20% of the element is visible
      });
    
      const [isAnimated, setIsAnimated] = useState(false);
    
      if (inView && !isAnimated) {
        setIsAnimated(true); // Set animation only once
      }


    return (
        <div ref={ref} className={`mb-20 ${isAnimated ? "animate-fade-left" : ""}`}>
            <SectionTitle heading={'---At a Glance!---'} subHeading={'PAYMENT HISTORY'}></SectionTitle>
            <h2 className="ms-32 text-2xl text-black font-semibold">Total Payments: {paymentHistory.length}</h2>
            {/* Data Table */}
            <div className="overflow-x-auto md:mx-32 mt-3 text-black mx-2">
                {paymentHistory.length === 0 ? (
                    <div className="text-center py-5 font-semibold text-gray-500">
                        No Payment History Avialable.
                    </div>
                ) : (
                    <table className="table">
                        {/* Table Head */}
                        <thead>
                            <tr className="text-black bg-yellow-500">
                                <th>No</th>
                                <th>Email</th>
                                <th>Price</th>
                                <th>Transaction ID</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory.map((payment, index) => (
                                <tr key={payment._id}>
                                    <td>{index + 1}</td>
                                    <td>{payment.email}</td>
                                    <td>${payment.price.toFixed(2)}</td>
                                    <th>{payment.transactionId}</th>
                                    <th>{payment.date}</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;