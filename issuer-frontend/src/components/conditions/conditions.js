import React, { useEffect, useState, useContext } from 'react';
import './conditions.css';
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import flechedroite from '../../assets/piv/fleche-droite.svg';
import flechegauche from '../../assets/piv/fleche-gauche.svg';
import { Context } from '../wrapper/wrapper';

function LangRepo(context) {
  if(context.locale === 'fr'){
    return (
      <p> 
        <FormattedMessage id='app.conditions.description.p2' defaultMessage={"Lorem Ipsum..."} values={{ repoexpmdl: <a href="https://github.com/CQEN-QDCE/exp-mdl">répértoire dédié</a> }}/>
      </p>      
    );
  }
  else {
    return (
      <p> 
        <FormattedMessage id='app.conditions.description.p2' defaultMessage={"Lorem Ipsum..."} values={{ repoexpmdl: <a href="https://github.com/CQEN-QDCE/exp-mdl">dedicated directory</a> }}/>
      </p>      
    );
  }
}

export default function Conditions(props) {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);

  const context = useContext(Context);

  const canBeSubmitted = () => {
    if(agree) {
      document.getElementById("continue").removeAttribute("disabled");
    } else {
      document.getElementById("continue").setAttribute("disabled", true);
    }
  }

  useEffect(() => canBeSubmitted());

  const handleContinue = (e) => {
    navigate(`/forms`, { });
  }
  const handleBack = (e) => {
    navigate(`/`, { });
  }

  return (
    <div className="container" style={{textAlign: "left"}} >

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
          <FormattedMessage id='app.conditions.description.p1' defaultMessage={"Lorem Ipsum..."} values={{ link: <a href="https://www.quebec.ca/gouvernement/politiques-orientations/vitrine-numeriqc/accompagnement-des-organismes-publics/fondations-numeriques-gouvernementales#c132534">Fondations numériques gouvernementales du Québec</a> }}/>
        </p>
        {LangRepo(context)}
        <p>
          <FormattedMessage id='app.conditions.description.p3' defaultMessage={"Lorem Ipsum..."} />
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
          <input type="checkbox" className="form-check-input" id="agree" onClick={(e) => setAgree(e.target.checked)}/>
          <label className="control-label" htmlFor="agree">
            <FormattedMessage id='app.conditions.engagement.description' defaultMessage={"Lorem Ipsum..."} />
            <span className="required" style={{color: "red"}}> * </span>
          </label>          
        </div>
      </div>
      
      <br />
      <div className='row'>
        <div className='col'>
          <button type="submit" className="service_submit btn btn-secondary" onClick={handleBack}>
            <img className='mr-1' src={flechegauche} alt=''/>            
            <FormattedMessage id='app.button.back' defaultMessage={"Submit"} />
          </button>
        </div>
        <div className='col'>
          <button type="submit" id='continue' className="service_submit btn btn-primary" onClick={handleContinue}>
            <FormattedMessage id='app.button.continue' defaultMessage={"Submit"} />
            <img className='ml-1' src={flechedroite} alt=''/>
          </button>          
        </div>        
      </div>  
    </div>       
  );
}
