import './App.css';
import Footer from './components/footer/footer';
import Form from './components/form/form';
import Header from './components/header/header';
import Qrcode from './components/qrcode/qrcode';
import Home from './components/home/home';
import Conditions from './components/conditions/conditions';
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
          <Route path="/forms" exact element={<Form />} />
          <Route path="/qrcode" element={<Qrcode />} />
          <Route path="/result" element={<Result />} />
        </Routes>
        <Footer />
      </div>      
    </Router>
  );
}

export default App;
