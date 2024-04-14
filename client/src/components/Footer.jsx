import React from 'react';
import {Link} from 'react-router-dom';
import { FaWhatsapp} from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
export default function Footer (){
    return (
      <footer className="bg-cover bg-center text-black text-center py-16 px-4" style={{backgroundImage: "url('https://images.unsplash.com/photo-1520531158340-44015069e78e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBhbmQlMjB3aGl0ZSUyMGJ1aWxkaW5nfGVufDB8fDB8fHww')"}}>
         <div className='xl:flex xl:justify-around'>
          <div className='mb-12 xl:mb-0'>
          <h1 className='text-4xl font-serif mb-4'>EstateExplorer</h1>  
          <p className='mb-4 text-2xl font-serif'>
          " A platform for finding the<br/> perfect home"
          </p>
          </div>
          <div className='mb-12 xl:mb-0 justify-items-start'>
            <ul className="content-start justify-items-start">
               <Link to='/'><li>HOME</li></Link> 
               <Link to='/About'><li>ABOUT</li></Link> 
                <Link to='search?searchTerm='><li>LISTINGS</li></Link>
                <Link to='/Contact'><li>CONTACT</li></Link> 
            </ul>
         </div>
         <div className='pr-9 mb-12 xl:mb-0'>
          <h3> MAIL ID</h3>
          <a href="mailto:chgoutham199@gmail.com" className='mr-4'>chgoutham199@gmail.com</a>
          <br/>
          <div className=' ml-9 flex gap-4 mx-auto'>
            <FaWhatsapp />
            <FaInstagram />
            <FaXTwitter />
            <FaLinkedin />
          </div>
        </div>
        
         </div>  

      </footer>
    );
};
