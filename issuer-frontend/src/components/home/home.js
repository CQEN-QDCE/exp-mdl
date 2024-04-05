import React from 'react';
import './home.css';
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import flechedroite from '../../assets/piv/fleche-droite.svg';

export default function Home(props) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    navigate(`/conditions`, { });    
  }

  return (
    <div className='container' style={{textAlign: "left"}} > 
      <div className='row-form'>
        <h1 className='h1 title-orange-bar'>
          <FormattedMessage id='app.home.title' defaultMessage={"Digital Driver License"} />
        </h1>
      </div>
      <div className='row-form'>
        <h2>
          <FormattedMessage id='app.home.subtitle' defaultMessage={"Proof of concept"} />
        </h2>        
      </div>
      <div className='row-form'>        
        <p>
          <FormattedMessage id='app.home.description' defaultMessage={"Lorem Ipsum..."} />        
        </p>                        
      </div>
      <br />
      <div className='row-form'>
        <div className='col-lg-2'>

        </div>
        <div className='col-lg-8'>
          
          <button type="submit" className="service_submit btn btn-primary" onClick={handleSubmit}>
            <FormattedMessage id='app.home.button' defaultMessage={"Continue"} />
            <img className='ml-1' src={flechedroite}/>
          </button>      
        </div>
      </div>
    </div>
  );
};
