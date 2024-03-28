import React from 'react';
import './result.css';
import { FormattedMessage } from 'react-intl';
import check from '../../assets/piv/check-symbol-4794.svg';
import success from '../../assets/piv/success.7819d369.png';
import securite from '../../assets/piv/Icone_SAG_securite.7bb3bff2d69705eff5b7db1df76fa80c.svg';
import { useNavigate } from 'react-router-dom';

export default function Result(props) {
  const navigate = useNavigate();

  const handleHome = (e) => {
    navigate(`/`, { });
  }


  return (
    <div className="container" style={{textAlign: "left"}}>
      <div className='row-form'>
        <h1 className='h1 title-orange-bar'>
          <FormattedMessage id='app.result.title' defaultMessage={"Gouvernement du métier"} />
        </h1>
      </div>  

      <div className='row-form'>        
        <div className='col input-wrapper'>
          <div className='row'>
            <div className='col-lg-3'>
              <div className='row'>
                <label>
                  <FormattedMessage id='app.form.first.name' defaultMessage={"First name"} />            
                </label>
                <input type="text" className="service-input form-control" value={window.localStorage.getItem("name")} readOnly/>            
              </div>
              <div className='row'>
                <label>
                  <FormattedMessage id='app.form.last.name' defaultMessage={"Last name"} />            
                </label>
                <input type="text" className="service-input form-control" value={window.localStorage.getItem("lastName")} readOnly/>
              </div>
            </div>
            <div className='col-lg-1'></div>
            <div className='col-lg-5'>
              <img className='text-center w-25' src={securite} />
              <h4>
                <FormattedMessage id='app.result.message.title' defaultMessage={"Credential successfully issued"}/>
              </h4>            
              <p style={{textAlign: "left"}}>
                <FormattedMessage id='app.result.message.description' defaultMessage={"Lorem Ipsum..."} />
              </p>
              <button type='submit' className="service_submit btn btn-primary" onClick={handleHome}>
                <FormattedMessage id='app.button.home' defaultMessage={"Home"} />
              </button> 
            </div>            
          </div>
        </div> 
      </div>      
    </div>   
    
  );
};
