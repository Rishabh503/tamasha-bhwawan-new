"use client"
import { useState } from 'react';
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import emailjs from 'emailjs-com';

 const Contact = () => {
    const [formData,setFormData]=useState({
        name:"",contact:"",email:"",subject:"",message:""
    })

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        emailjs.send(
            "service_dt0wm0g",
            "template_pwg94dg",
            formData,
            'nx8l8Db3kmBQLw3R7'
          ).then(
            (response) => {
              alert('Email sent successfully!');
            },
            (error) => {
              alert('Failed to send email.');
            }
          );
          setFormData({...formData,[e.target.name]:""})
    }
  return (
    <section className='w-full mt-10 sm:mt-0 mb-24 h-auto min-h-screen'>
        <div className=' bg-[#4A1A1A] p-12 sm:p-20 flex flex-col items-center mt-2 justify-center'>
            <h1 className='font-[poppins] text-white text-[32px] sm:text-[48px]'>
                Get in Touch
            </h1>
            <h3 className='text-gray-300 text-[18px] sm:text[16px]'>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </h3>
        </div>
        <div className=' flex flex-col px-6 py-6 sm:px-24 sm:py-20'>
           <div className='bg-white shadow-md rounded-lg p-6 sm:p-10 border-[#A68A8A]'>
                <p className='text-lg text-[#4B2E39] sm:text-xl font-semibold'>Send us a Message</p>
                <form className='text-[#4A1A1A] mt-4 gap-3 flex flex-col' onSubmit={handleSubmit}>
                    <label className='text-[14px] font-semibold'>Your Name</label>
                    <input className='h-12 rounded-md border border-[#A68A8A]' type="text" name="name" required onChange={handleChange} />
                    <label className='text-[14px] font-semibold'>Your Contact</label>
                    <input className='h-12 rounded-md border border-[#A68A8A]' type="text" name="contact" required onChange={handleChange} />
                    <label className='text-[14px] font-semibold'>Email Address</label>
                    <input className='h-12 rounded-md border border-[#A68A8A]' type="email" name="email" required onChange={handleChange}/>
                    <label className='text-[14px] font-semibold'>Subject</label>
                    <input className='h-12 rounded-md border border-[#A68A8A]' type="text" name="subject" required onChange={handleChange} />
                    <label className='text-[14px] font-semibold'>Message</label>
                    <textarea className='h-48 rounded-md border border-[#A68A8A]' type="text" name="message" required onChange={handleChange}/>
                    <button type="submit" className='sm:p-4 px-4 flex justify-center items-center gap-2 bg-[#6F4E37] text-white rounded-lg sm:w-2/5 w-3/4'>
                    <p className='text-3xl'> <IoIosSend/> </p>
                    <p className='text-lg'>Send Message</p>
                    </button>
                </form>
           </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-5 px-6 py-6 sm:px-24 sm:py-6 -mb-16'>
            <div className='bg-white sm:w-1/2 flex flex-col gap-4 shadow-md rounded-lg p-6 sm:p-10 border-[#4A1A1A]'>
                <h1 className='text-[#4B2E39] text-lg sm:text-xl font-semibold'>
                    Contact Information
                </h1>
               <div className='flex items-center gap-2'>
               <p className='text-3xl text-[#A68A8A]'>
               <AiOutlineMail/>
               </p>
                     <div>
                        <h1 className='font-semibold text-[#6F4E37]'>Email</h1>
                        <p className='text-[#6F4E37]'>tamashabhawan@gmail.com</p>
                    </div>
               </div>
                <div className='flex gap-2 items-center'>
                    <p className='text-3xl text-[#6F4E37]'>
                    <AiOutlinePhone/>
                    </p>
                    <div>
                        <h1 className='font-semibold text-[#6F4E37]'>Contact</h1>
                        <p className='text-[#6F4E37]'>9310395103</p>
                    </div>
                </div>
            </div>
            <div className='bg-white text-[#6F4E37] sm:w-1/2 flex flex-col shadow-md rounded-lg p-6 sm:p-10 border-[#A68A8A] gap-8'>
                <h1 className='text-[#4B2E39] text-lg sm:text-xl font-semibold'>
                    Business Hours
                </h1>
                <div className='flex flex-wrap text-lg'>
                    <p className='w-1/2 font-semibold'>Monday-Friday</p>
                    <p className='w-1/2 font-semibold'>9.00 AM-9.00 PM</p>
                </div>
                <div className='flex flex-wrap text-lg'>
                    <p className='w-1/2 font-semibold'>Saturday</p>
                    <p className='w-1/2 font-semibold'>9.00 AM-6.00 PM</p>
                </div>
                <div className='flex flex-wrap text-lg'>
                    <p className='w-1/2 font-semibold'>Sunday</p>
                    <p className='w-1/2 font-semibold'>9.00 AM-4.00 PM</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Contact