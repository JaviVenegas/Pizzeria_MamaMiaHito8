// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'; 
import Register from './pages/Register';
import Login from './pages/Login'; 
import Footer from './components/Footer';
import Cart from './pages/Cart';
import Nav from './components/Nav';
import Profile from './pages/Profile';
import Pizza from './pages/Pizza';
import Notfound from './pages/Notfound';
import CartProvider from './contexts/CartContext.jsx';
import DataPizzaProvider from './contexts/DataPizzaContext.jsx';
import UserProvider from './contexts/UserContext.jsx';

const App = () => {
    return (
        <Router>
            <UserProvider>
                <DataPizzaProvider>
                    <CartProvider>
                        <Nav />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/pizza/:id" element={<Pizza />} />
                            <Route path="*" element={<Notfound />} />
                        </Routes>
                        <Footer /> 
                    </CartProvider> 
                </DataPizzaProvider>    
            </UserProvider>
        </Router>
    );
};

export default App;



