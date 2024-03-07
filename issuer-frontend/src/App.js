import './App.css';
import Footer from './components/footer/footer';
import Form from './components/form/form';
import Header from './components/header/header';
import Main from './components/main/main';
import Qrcode from './components/qrcode/qrcode';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <Main />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/qrcode" element={<Qrcode />} />
        </Routes>
        <Footer />
      </div>      
    </Router>
  );
}

export default App;
