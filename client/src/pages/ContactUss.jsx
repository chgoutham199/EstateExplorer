import React from 'react';
import ContactUs from '../images/ContactUs.jpeg';
const ContactUss = () => {
  return (
    <div className='flex flex-col gap-6 px-3 max-w-6xl mx-auto'>
    <h1 className="font-serif text-4xl my-4">Contact Us</h1>
    <div class="flex items-center">
      <div class="w-full max-w-screen-lg mx-auto flex items-center h-96 text-black sm:bg-customblue rounded-lg shadow-md">
        <div class="flex flex-col px-9">
          <form>
            <label><h1 className='text-2xl font-serif mb-2'>Full Name:</h1></label>
            <div class="border-b border-black mb-4">
              <input type="text" className="outline-none w-full text-black font-bold border-b-2 border-solid border-black sm:bg-customblue" style={{ width: '550px' }} placeholder="Alayna" />
            </div>
            <label><h1 className='text-2xl font-serif mb-2'>Email:</h1></label>
            <div class="border-b border-black mb-4">
              <input type="email" className="outline-none w-full text-black font-bold border-b-2 border-solid border-black sm:bg-customblue" style={{ width: '550px' }} placeholder="alaysha@gmail.com" />
            </div>
            <label><h1 className='text-2xl font-serif mb-2'>Phone number:</h1></label>
            <div class="border-b border-black mb-4">
              <input type="number" className="outline-none w-full text-black font-bold border-b-2 border-solid border-black sm:bg-customblue" style={{ width: '550px' }} placeholder="9000000000" />
            </div>
            <label><h1 className='text-2xl font-serif mb-2'>Your Message:</h1></label>
            <div class="border-b border-black mb-4">
              <input type="text" className="outline-none w-full text-black font-bold border-b-2 border-solid border-black sm:bg-customblue" style={{ width: '550px' }} placeholder="your message here" />
            </div>
            <div className='text-white bg-black rounded-md'><button type='submit' value='Send Message' className='flex items-center py-2 justify-center h-full w-full'>SEND MESSAGE</button></div>
          </form>
        </div>
        <img class="h-full w-full py-2 pr-4 sm:visible" src={ContactUs} height="50px" style={{marginLeft:"90px"}}></img>
      </div>
    </div>
  </div>
  )
}

export default ContactUss
