import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import Footer from '../components/Footer.jsx';
import ListingItem from '../components/ListingItem';
import ContactUss from './ContactUss';
import Homeimg1 from '../images/Homeimg1.jpeg';
import AboutUs1 from '../images/AboutUs1.jpeg';
import AboutUs2 from '../images/AboutUs2.jpeg';
import AboutUs3 from '../images/AboutUs3.jpeg';
export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      <div className='flex flex-col p-12 max-w-full mx-auto'>
    <div class="flex items-center">
      <div class="gap-38 w-full max-w-screen-lg mx-auto flex items-center text-black bg-lightgrey rounded-lg shadow-md" style={{height:"500px"}}>
        <div class="flex flex-col px-9">
          <p class="font-serif xl:text-xl">EstateExplorer is the platform where
          <br/>
          <h1 className='xl:text-5xl font-serif font-medium xl:mb-5'>Your Journey to finding</h1><h1 className='xl:mb-5 xl:text-5xl font-serif font-medium'>the perfect <span className='italic'>home</span></h1><h1 className='xl:text-5xl font-serif font-medium'> begins here</h1><br/></p>
        </div>
        <img class="h-full w-full py-2 ml-5" src={Homeimg1} style={{width:"400px"}}></img>
      </div>
    </div>
  </div>
  <div className='flex flex-row'>
  <img className='hidden md:block ml-5 px-28 pb-28' src={AboutUs1} style={{ height:'500px' }}></img>
  <div className='font-serif flex-col pt-20'>
  <h1 className='xl:text-3xl pl-40 xl:mb-5 sm:text-2xl'>DreamSpot</h1>
  <h1 className='xl:text-5xl xl:mb-5'> “ Welcome to where your </h1>
  <div className='flex sm:ml-20'><h1 className='xl:text-5xl'><span>story begins ” </span></h1>
  <img className='hidden md:block pl-36' src={AboutUs2} style={{height:"400px"}}></img></div>
  </div>
  </div>
  <div className='relative p-16'>
  <img src={AboutUs3} className='hidden md:block ml-9 absolute pb-10 h-72 w-auto' style={{height:"500px"}}></img>
    <div id='about' className='hidden md:block bg-gray-300 p-20 w-full left-0 flex flex-col' style={{marginTop:'50px',height:'450px'}}>
      <h1 className='font-serif text-5xl mb-5' style={{marginLeft:'350px'}}>About Us</h1>
      <h1 className='font-serif text-2xl' style={{marginLeft:'350px'}}>Welcome to EstateExplorer, your premier destination for real estate services. Real estate encompasses land, buildings, and structures. At EstateExplorer, we understand that buying or selling a home is a significant 
    decision, and we're here to make the process as smooth as possible. Whether you're a 
    first-time homebuyer, seasoned investor, or looking to rent, we have the knowledge 
    and resources to assist you every step of the way.</h1>
    </div>
  </div>
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-4xl font-serif'>Recent offers</h2>
             
            </div>
            <div className='flex flex-wrap gap-4'>
  {offerListings.map((listing, index) => (
    index <= 2 && <ListingItem listing={listing} key={listing._id} />
  ))}
</div>

            <Link className='text-center xl:ml-96 xl:pl-20 text-semibold text-2xl text-blue-800 hover:underline' to={'/search?offer=true'} style={{marginTop:"20px"}}>Show More Offers</Link>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-4xl font-serif'>Recent places for rent</h2>
             
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing,index) => (
                index<=2 && <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
            <Link className='xl:ml-96 xl:pl-20 text-semibold text-2xl text-blue-800 hover:underline' to={'/search?type=rent'}>View More</Link>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              
            </div>
            
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing,index) => (
                index<=2 && <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
            <Link className='xl:ml-96 xl:pl-20 text-semibold text-2xl text-blue-800 hover:underline' to={'/search?type=sale'}>View More</Link>
          </div>
        )}
         <ContactUss/>
        </div>
        <Footer/>
      </div>

  );
}