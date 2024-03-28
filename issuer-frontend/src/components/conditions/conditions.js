import React from 'react';
import './conditions.css';
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

export default function Conditions(props) {
  const navigate = useNavigate();

  const handleContinue = (e) => {
    navigate(`/forms`, { });
  }
  const handleBack = (e) => {
    navigate(`/`, { });
  }

  return (
    <div className="container" style={{textAlign: "left"}}>

      <div className='row-form'>
        <h1 className='h1 title-orange-bar'>
          <FormattedMessage id='app.conditions.before.start' defaultMessage={"Gouvernement du Québec"} />
        </h1>         
      </div>
      <br />
      <div className='row-form'>
        <h1>
          <FormattedMessage id='app.conditions.title' defaultMessage={"Conditions"} />
        </h1>                     
      </div>        
          
      <div className='row-form' style={{textAlign: "left"}}>
        <p>
          <FormattedMessage id='app.conditions.description.p1' defaultMessage={"Lorem Ipsum..."} />
        </p>
        <p> 
          <FormattedMessage id='app.conditions.description.p2' defaultMessage={"Lorem Ipsum..."} />
        </p>
        <p>
          <FormattedMessage id='app.conditions.description.p3' defaultMessage={"Lorem Ipsum..."} />
        </p>
        <p>
          <FormattedMessage id='app.conditions.description.p4' defaultMessage={"Lorem Ipsum..."} />
        </p>
      </div>
      
      <div className='row-form'>
        <h1>
          <FormattedMessage id='app.conditions.limitations.title' defaultMessage={"Conditions"} />
        </h1>
      </div>
      <div className='row-form' style={{textAlign: "left"}}> 
        <p>  
          <FormattedMessage id='app.conditions.limitations.description.p1' defaultMessage={"Lorem Ipsum..."} />
        </p>
      </div>

      <div className='row-form'> 
        <div className='form-check mb-3'>
          <input type="checkbox" className="form-check-input" id="engagement" />
          <label className="form-check-label" htmlFor="engagement">
            <FormattedMessage id='app.conditions.engagement.description' defaultMessage={"Lorem Ipsum..."} />
          </label>
        </div>
      </div>
      
      <br />
      <div className='row'>
        <div className='col'>
          <button type="submit" className="service_submit btn btn-secondary" onClick={handleBack}>
            <FormattedMessage id='app.button.back' defaultMessage={"Submit"} />
          </button>
        </div>
        <div className='col'>
          <button type="submit" className="service_submit btn btn-primary" onClick={handleContinue}>
            <FormattedMessage id='app.button.continue' defaultMessage={"Submit"} />
          </button>          
        </div>        
      </div>  
    </div>       
  );
}
