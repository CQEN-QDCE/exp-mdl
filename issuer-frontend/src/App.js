import './App.css';
import Footer from './components/footer/footer';
import Form from './components/form/form';
import Header from './components/header/header';
import Qrcode from './components/qrcode/qrcode';
import QRCodeAnoncreds from './components/qrcode/qrcodeAnoncreds';
import Home from './components/home/home';
import Conditions from './components/conditions/conditions';
import Warning from './components/warning/warning';
import Result from './components/result/result';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/conditions" exact element={<Conditions />} />
          <Route path="/warning" exact element={<Warning />} />
          <Route path="/forms" exact element={<Form />} />
          <Route path="/qrcode" element={<Qrcode />} />
          <Route path="/qrcodeAnoncreds" element={<QRCodeAnoncreds />} />
          <Route path="/result" element={<Result />} />
        </Routes>
        <Footer />
      </div>      
    </Router>
  );
}

export default App;
