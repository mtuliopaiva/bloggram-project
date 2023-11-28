import './App.css';

//Importing react-router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
