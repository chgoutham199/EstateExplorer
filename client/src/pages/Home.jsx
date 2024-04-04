import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import Footer from '../components/Footer.jsx';
import ListingItem from '../components/ListingItem';
import ContactUs from '../images/ContactUs.jpeg';
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
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          EstateExplorer is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
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
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        <div className='contact'>
  <h1 className="font-bold text-3xl mb-4">CONTACT US</h1>
  <div class="flex items-center">
    <div class="w-full max-w-screen-lg mx-auto flex items-center h-96 text-black bg-customblue rounded-lg shadow-md">
      <div class="flex flex-col px-9">
        <form>
          <label><h1 className='text-2xl font-bold mb-2'>Full Name:</h1></label>
          <div class="border-b border-black mb-4">
            <input type="text" className="outline-none w-full text-black font-bold border-b-2 border-solid border-black bg-customblue" style={{ width: '550px' }} placeholder="Alayna" />
          </div>
          <label><h1 className='text-2xl font-bold mb-2'>Email:</h1></label>
          <div class="border-b border-black mb-4">
            <input type="email" className="outline-none w-full text-black font-bold border-b-2 border-solid border-black bg-customblue" style={{ width: '550px' }} placeholder="alaysha@gmail.com" />
          </div>
          <label><h1 className='text-2xl font-bold mb-2'>Phone number:</h1></label>
          <div class="border-b border-black mb-4">
            <input type="number" className="outline-none w-full text-black font-bold border-b-2 border-solid border-black bg-customblue" style={{ width: '550px' }} placeholder="9000000000" />
          </div>
          <label><h1 className='text-2xl font-bold mb-2'>Your Message:</h1></label>
          <div class="border-b border-black mb-4">
            <input type="text" className="outline-none w-full text-black font-bold border-b-2 border-solid border-black bg-customblue" style={{ width: '550px' }} placeholder="your message here" />
          </div>
          <div className='text-white bg-black rounded-md'><button type='submit' value='Send Message' className='flex items-center justify-center h-full w-full'>SEND MESSAGE</button></div>
        </form>
      </div>
      <img class="h-full w-full py-2 pr-4" src={ContactUs} height="50px" style={{marginLeft:"90px"}}></img>
    </div>
  </div>
</div>


        </div>
        <Footer/>
      </div>
  );
}