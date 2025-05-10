import React, { useState } from "react";
import ethereum from "../../assets/payment.svg";
import dahabia from "../../assets/payment1.svg";
import paypal from "../../assets/payment2.svg";
import bg from "../../assets/LogInbg.png";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    yearEnd: "",
    cvc: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-mygreen p-10 rounded-2xl shadow-xl max-w-lg w-full hover:scale-105 transition-transform duration-300"
      >
        {/* Payment Selection */}
        <div className="flex justify-center space-x-4 mb-4">
          {[
            { id: "dahabia", src: dahabia },
            { id: "paypal", src: paypal },
            { id: "ethereum", src: ethereum },
          ].map((item) => (
            <label key={item.id} className="cursor-pointer">
              <input type="radio" name="payment" value={item.id} className="hidden peer" />
              <div className="w-16 h-16 bg-mywhite bg-opacity-60 rounded-md flex items-center justify-center peer-checked:bg-white peer-checked:border-2">
                <img src={item.src} alt={item.id} className="w-10 h-10 object-contain" />
              </div>
            </label>
          ))}
        </div>

        {/* Card Number */}
        <label className="block text-mywhite font-jakarta mb-1">Card Edahabia Number</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="0157 xxxxxxxxxxxxxxxx"
          className="w-full p-2 border rounded-md mb-3"
        />

        {/* Expiry Date & CVC */}
        <div className=" flex flex-col md:flex-row md:space-x-2">
          <div className="md:w-1/2">
            <label className="block text-mywhite font-jakarta mb-1">Year End Card</label>
            <input
              type="text"
              name="yearEnd"
              value={formData.yearEnd}
              onChange={handleChange}
              placeholder="DD-MM-YYYY"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="md:w-1/2">
            <label className="block text-mywhite font-jakarta mb-1">CVC2/CVV2</label>
            <input
              type="text"
              name="cvc"
              value={formData.cvc}
              onChange={handleChange}
              placeholder="1457"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Amount */}
        <label className="block text-mywhite font-jakarta mt-3 mb-1">Montant</label>
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="20000"
          className="w-full p-2 border rounded-md mb-3"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 bg-yellow-400 text-black p-2 rounded-md font-semibold hover:bg-yellow-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

function Payment() {
  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center gap-28 relative pl-20 pr-40"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <PaymentForm />
      <div className=" hidden md:block text-white max-w-md">
        <div className="bg-black bg-opacity-40 px-3 py-1  rounded-md inline-block mb-8">
          We're happy to see you! 👋
        </div>
        <p className="text-[48px] font-bold font-jakarta leading-tight">
          Your <span className="text-[#C1B49A]">Sadaka</span> <br /> 
          will make a  <br /> Diffrence.
        </p>
      </div>
    </div>
  );
}

export default Payment;
