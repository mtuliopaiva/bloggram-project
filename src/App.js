import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

//Importing react-router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
