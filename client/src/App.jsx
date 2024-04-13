import {BrowserRouter ,Routes, Route} from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import Footer from './components/Footer';
import ContactUss from "./pages/ContactUss";
export default function App() {
  return (
    <BrowserRouter>
    <Header />
    
    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/sign-in" element={<SignIn />}/>
    <Route path="/sign-up" element={<SignUp />}/>
    <Route path="/about" element={<About />}/>
    <Route path="/listing/:listingId" element={<Listing />}/>
    <Route path='/search' element={<Search />} />
    <Route path='/contact' element={<ContactUss/>} />
    <Route element={<PrivateRoute />}>
    <Route path="/profile" element={<Profile />}/>
      <Route path="/create-listing" element={<CreateListing/>}/>
      <Route path='/update-listing/:listingId' element={<UpdateListing />}/>
    </Route >
  
    <Route path='*' element={<h1>Page Not Found</h1>} />
    </Routes>
   
   </BrowserRouter>
    
  );
}
