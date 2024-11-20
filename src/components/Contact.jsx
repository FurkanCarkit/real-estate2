import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", "3988ddfc-5bfb-4636-8efb-036dd7842d4e");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data); // Konsolda hata kontrolü için

      if (data.success) {
        setResult("");
        toast.success("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error:", data.message);
        toast.error(data.message || "An unexpected error occurred.");
        setResult("");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("An error occurred while submitting the form.");
      setResult("");
    }
  };

  return (
    <div className='text-center p-6 py-20 lg:px-32 w-full overflow-hidden' id='Contact'>
      <ToastContainer /> {/* Bildirimler için ToastContainer */}
      <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center text-red-600'>
        Contact <span className='text-black'>With Us</span>
      </h1>
      <p className='text-center text-gray-500 mb-12 max-w-80 mx-auto'>
        Ready to Make a Move? Let's Build Your Future Together
      </p>

      <form onSubmit={onSubmit} className='max-w-2xl mx-auto text-gray-600 pt-8'>
        <div className='flex flex-wrap'>
          <div className='w-full md:w-1/2 text-left'>
            Name
            <input
              className='w-full border border-gray-300 rounded py-3 px-4 mt-2'
              type='text'
              name='Name'
              placeholder='Your Name'
              required
            />
          </div>
          <div className='w-full md:w-1/2 text-left md:pl-4'>
            E-mail
            <input
              className='w-full border border-gray-300 rounded py-3 px-4 mt-2'
              type='email'
              name='Email'
              placeholder='E-Mail'
              required
            />
          </div>
        </div>
        <div className='my-6 text-left'>
          Message
          <textarea
            className='w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none'
            name='Message'
            placeholder='Message'
            required
          ></textarea>
        </div>
        <button className='bg-red-500 text-white py-2 px-12 mb-10 rounded'>
          {result ? result : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
