import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import Category from './Pages/Category';
import Product from './Pages/Products';
import Carts from './Pages/Carts';
import LoginSignup from './Pages/loginSignup';
import Footer from './Components/Footer/footer';
import banner_1 from './Components/Assets/banner_sofa2.jpg'
import banner_2 from './Components/Assets/sofa.jpg'
import banner_3 from './Components/Assets/wood.jpg'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='woods/' element={<Category banner={banner_1} category="wood" />}/>
        <Route path='metals/' element={<Category banner={banner_2} category="metal"/>}/>
        <Route path='sofas/' element={<Category banner={banner_3} category="sofa"/>}/>
        <Route path='product/' element={<Product banner={banner_2}/>}>
          <Route path= ':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Carts/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
