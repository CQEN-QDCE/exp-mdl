import React, { useContext} from 'react';
import '../../css/quebec_ca.css';
import logoFooter from '../../assets/piv/logo-gouv-couleur.svg';
import './footer.css';
import { Context } from '../wrapper/wrapper';
import { FormattedMessage } from 'react-intl';

function LangFooter(context) {
  if(context.locale === 'fr'){
    return (      
      <ul className="list-inline mx-auto justify-content-center">
        <li>
          <a href="https://quebec.ca/accessibilite">
            <FormattedMessage id="app.footer.accessibility" defaultMessage={"Accessibilité"} />
          </a>
        </li>
        <li>
          <a href="https://quebec.ca/acces-information">
            <FormattedMessage id="app.footer.information" defaultMessage={"Accès à l'information"} />
          </a>
        </li>
        <li>
          <a href="https://quebec.ca/politique-confidentialite">                      
            <FormattedMessage id="app.footer.privacy" defaultMessage={"Politique de confidentialité"} />
          </a>
        </li>                  
        <li>
          <a href="https://quebec.ca/conditions-utilisation">
            <FormattedMessage id="app.footer.use" defaultMessage={"Conditions d'utilisation"} />
          </a>
        </li>
        <li>
          <a href="https://quebec.ca/a-propos">
            <FormattedMessage id="app.footer.about" defaultMessage={"À propos de Québec.ca"} />
          </a>
        </li>                  
      </ul>      
    );            
  }
  return (    
    <ul className="list-inline mx-auto justify-content-center">
      <li>
        <a href="https://www.quebec.ca/en/accessibility">
          <FormattedMessage id="app.footer.accessibility"/>
        </a>
      </li>
      <li>
        <a href="https://www.quebec.ca/en/access-information">
          <FormattedMessage id="app.footer.information"/>
        </a>
      </li>
      <li>
        <a href="https://www.quebec.ca/en/privacy-policy">                      
          <FormattedMessage id="app.footer.privacy"/>
        </a>
      </li>                  
      <li>
        <a href="https://www.quebec.ca/en/gouvernement/politiques-orientations/langue-francaise/modernization-charter-french-language#c214034">
          <FormattedMessage id="app.footer.consult"/>
        </a>
      </li>                  
    </ul>     
  );      
}

export default function Footer(props) {

  const context = useContext(Context);

  return (    
    <div className="Footer">
      <div className="container-fluid piv_bas" role="contentinfo">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex">
              {LangFooter(context)}         
            </div>
            <div className="col-12 d-flex align-items-center justify-content-center" lang="fr">
              <a href="https://quebec.ca">
                <img id="logoFooter" alt="Gouvernement du Québec." src={logoFooter} width="117" height="35" />
              </a>
            </div>
            <div className="col-12 d-flex align-items-center justify-content-center">
              <p>
                <a href={context.locale === 'fr' ? 'https://quebec.ca/droit-auteur' : 'https://www.quebec.ca/en/copyright'}>
                  <FormattedMessage id="app.footer.copyright" defaultMessage={"© Gouvernement du Québec, 2024"} />                  
                </a>
              </p>
            </div>        
          </div>
        </div>
        <div id="flecheHaut" tabIndex="0" role="link"><span className="visuallyHidden">Retour en haut</span></div>
      </div>
    </div>
  )
}

