import React from 'react';
import './warning.css';
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import flechedroite from '../../assets/piv/fleche-droite.svg';
import flechegauche from '../../assets/piv/fleche-gauche.svg';
import appStore from '../../assets/piv/app-store-logo.png';
import githubIcon from '../../assets/piv/github-icon.png';
import googlePlay from '../../assets/piv/google-play-badge.png';

export default function Warning() {
  const navigate = useNavigate();

  const handleContinue = (e) => {
    navigate(`/forms`, { });
  }

  const handleBack = (e) => {
    navigate(`/conditions`, { });
  }  

  return (
    <div className="container" style={{textAlign: "left"}} >
      <div className='row-form'>
        <h1 className='h1 title-orange-bar'>
          <FormattedMessage id='app.warning.title' defaultMessage={"Gouvernement du Québec"} />
        </h1>         
      </div>
      <br /> 
      <div className='row-form' style={{textAlign: "left"}}>       
        <FormattedMessage id='app.warning.p1.1' defaultMessage={"Lorem Ipsum..."} />
        <b><FormattedMessage id='app.warning.p1.2' defaultMessage={"Lorem Ipsum..."} /></b>
        <FormattedMessage id='app.warning.p1.3' defaultMessage={"Lorem Ipsum..."} />
        <br />          
        <FormattedMessage id='app.warning.p2' defaultMessage={"Lorem Ipsum..."} />                
      </div>                 
      <div className='row-form' style={{textAlign: "left"}}> 
        <h4>  
          <FormattedMessage id='app.warning.quebec.driver.license.title' defaultMessage={"Lorem Ipsum..."} />
        </h4>
        <FormattedMessage id='app.warning.quebec.driver.license.p1' defaultMessage={"Lorem Ipsum..."} />
      </div>            
      
      <div className='row-form' style={{textAlign: "left"}}>         
          <ul>
            <li>
              <u><i><FormattedMessage id='app.warning.quebec.driver.license.wallet1.name' defaultMessage={"Lorem Ipsum..."} /></i></u>
              <FormattedMessage id='app.warning.quebec.driver.license.wallet1.description' defaultMessage={"Lorem Ipsum..."} /> 
              <div className='col input-wrapper'>
                <div className='row'>
                  <div className='col-lg-1'/>
                  <div className='col-lg-3'>
                    <div className='row'>
                      <FormattedMessage id='app.warning.quebec.driver.license.wallet1.download.link1' defaultMessage={"Lorem Ipsum..."} />
                    </div>
                    <div className='row'>
                      <a href='https://apps.apple.com/us/app/bc-wallet/id1587380443'>
                        <img src={appStore} alt='App Store'/>
                      </a>
                    </div>
                  </div>
                  <div className='col-lg-3'>
                    <div className='row'>
                      <FormattedMessage id='app.warning.quebec.driver.license.wallet1.download.link2' defaultMessage={"Lorem Ipsum..."} />
                    </div>
                    <div className='row'>
                      <a href='https://play.google.com/store/apps/details?id=ca.bc.gov.BCWallet'>
                        <img src={googlePlay} alt='App Store'/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>   
            <br />        
            <li>
              <u><i><FormattedMessage id='app.warning.quebec.driver.license.wallet2.name' defaultMessage={"Lorem Ipsum..."} /></i></u>
              <FormattedMessage id='app.warning.quebec.driver.license.wallet2.description' defaultMessage={"Lorem Ipsum..."} />                 
              <div className='col'>
                <div className='row'>                
                  <a href='https://github.com/MCN-ING/Portefeuille-mobile-qc'>
                    <FormattedMessage id='app.warning.quebec.driver.license.wallet2.github.repo.link' defaultMessage={"Lorem Ipsum..."} /> 
                    <img src={githubIcon} alt='App Store'/>
                  </a>               
                </div>
              </div>
            </li>          
          </ul>        
      </div>             
      <div className='row-form' style={{textAlign: "left"}}> 
          <h4>
            <FormattedMessage id='app.warning.international.driver.license.title' defaultMessage={"Lorem Ipsum..."} />
          </h4>          
          <ul>
            <li>
              <u><i><FormattedMessage id='app.warning.international.driver.license.wallet1.name' defaultMessage={"Lorem Ipsum..."} /></i></u>
              <FormattedMessage id='app.warning.international.driver.license.wallet1.description.p1' defaultMessage={"Lorem Ipsum..."} />
              <br /> 
              <FormattedMessage id='app.warning.international.driver.license.wallet1.description.p2' defaultMessage={"Lorem Ipsum..."} />
              <br /> 
              <FormattedMessage id='app.warning.international.driver.license.wallet1.description.p3' defaultMessage={"Lorem Ipsum..."} />              
              <div className='col'>
                <div className='row'>                
                  <a href='https://github.com/CQEN-QDCE/portefeuille-mobile-mdl'>
                    <FormattedMessage id='app.warning.international.driver.license.wallet1.github.repo.link' defaultMessage={"Lorem Ipsum..."} /> 
                    <img src={githubIcon} alt='App Store'/>
                  </a>               
                </div>
              </div>              
            </li>
          </ul>        
      </div>   
      <div className='row-form' style={{textAlign: "left"}}>         
        <p>  
          <FormattedMessage id='app.warning.p3' defaultMessage={"Lorem Ipsum..."} />
        </p>
      </div>                              
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
