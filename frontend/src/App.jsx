import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Explore from './pages/explore';
import Home from './pages/home';
import AddListing from './pages/AddListing';
import ListingDetails from './pages/ListingDetails';
import AuthPage from './pages/auth/AuthPage';
import About from './pages/about';
import Contact from './pages/contact';
import Auth2 from './pages/auth/Auth2'; 
import ProtectedRoute from './pages/ProtectedRoute';

import { Navigate } from 'react-router-dom';







function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/add" element={<ProtectedRoute><AddListing /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/explore" />} />

        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
<Route path="/register" element={<AuthPage mode="register" />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="/seller-login"    element={<Auth2 mode="login" />} />
<Route path="/seller-register" element={<Auth2 mode="register" />} />



      </Routes>
    </Router>
  );
}

export default App;
