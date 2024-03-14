import React, { useContext} from 'react';
import './header.css';
import '../../css/quebec_ca.css';
import logo from '../../assets/piv/logo-quebec-constraste.png';
import signature from '../../assets/piv/signature-PIV.svg';
import { Context } from '../wrapper/wrapper';
import { FormattedMessage } from 'react-intl';

function LangJoinUs(context) {
  if(context.locale === 'fr'){
    console.log("header lang join us fr");
    return (
      <ul className="listePiv">
      <li>
        <a lang="en" tabIndex="20" href="#"  onClick={context.selectLanguage}>
          <FormattedMessage id="app.header.lang.label" defaultMessage={"English"}/>
        </a>
      </li>
      <li><a tabIndex="25" href="https://quebec.ca/nous-joindre/renseignements-generaux">
        <FormattedMessage id="app.header.join.us" defaultMessage={"Nous joindre"}/>                                  
        </a>
      </li>
    </ul>      
    );            
  }
  return (
    <ul className="listePiv">
    <li>
      <a lang="fr" tabIndex="20" href="#"  onClick={context.selectLanguage}>
        <FormattedMessage id="app.header.lang.label" defaultMessage={"Français"}/>
      </a>     
    </li>
    <li><a tabIndex="25" href="https://www.quebec.ca/en/how-to-reach-us/general-information">
      <FormattedMessage id="app.header.join.us" defaultMessage={"Contact us"}/>                                  
      </a>
    </li>
  </ul>      
  );      
}

export default function Header(props) {

  const context = useContext(Context);

  return (
    <div className="Header">
      <div className="container-fluid piv">
        <div className="container">
          <div className="row">
            <div className="col-4 d-flex align-items-center">
              <a href="/#main" className="visuallyHidden passerContenu" tabIndex="1">
                <FormattedMessage id="app.header.pass.content" defaultMessage={"Passer au contenu"}/>
              </a>
            </div>
          </div>
          <div className="row" id="entetePiv">
            <div className="col-4 d-flex align-items-center container_piv" lang="fr">
              <a tabIndex="5" data-evenement="click" href="https://www.quebec.ca">
                <img id="pivImage" alt="Site Web du Gouvernement du Québec." src={signature} width="463" height="91"/>
                </a>
                <img id="pivImagePrint" alt="Site Web du Gouvernement du Québec." src={logo} width="199" height="60"></img>
            </div>  
            <div className="col-8 d-flex justify-content-end align-items-center ">
              {LangJoinUs(context)}             
            </div>            

          </div>
        </div>
      </div>
    </div>
      
  )

}
