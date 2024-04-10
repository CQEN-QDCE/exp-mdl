import React from 'react';
import './home.css';
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import flechedroite from '../../assets/piv/fleche-droite.svg';
import cel from '../../assets/piv/iPhone 13.png';
import { isMobile } from 'react-device-detect';

export default function Home(props) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    navigate(`/conditions`, { });    
  }

  return (
    <div className='container' style={{textAlign: "left"}} > 
      <div className='row-form'>
        <div className='col-input-wrapper'>
          <div className='row'>
            <div className='col-lg-1'>

            </div>
            <div className='col-lg-5'>
              <h2>
                <FormattedMessage id='app.home.subtitle' defaultMessage={"Proof of concept"} />
              </h2>                    
              <p>
                <FormattedMessage id='app.home.description' defaultMessage={"Lorem Ipsum..."} />        
              </p>                              
              <button type="submit" className="service_submit btn btn-primary" onClick={handleSubmit}>
                <FormattedMessage id='app.home.button' defaultMessage={"Continue"} />
                <img className='ml-1' src={flechedroite} alt=''/>
              </button>             
            </div>
            <div className='col-lg-5' visibility={isMobile ? "hidden" : "visible"}>
              <img className='w-100'  src={cel} alt='' style={{width: "100%", height: "100%"}}/>            
            </div>          
          </div>
        </div>      
      </div>
      <br />
    </div>
  );
};
