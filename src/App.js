import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import About from './About';
import Product from './Product';
import Navbar from './Navbar';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' exact element={<Home/>}></Route>
        <Route path='/about' exact element={<About/>}></Route>
        <Route path='/product' exact element={<Product/>}></Route>
      </Routes>
    </>
  );
}

export default App;
