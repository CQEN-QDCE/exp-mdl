import React from 'react';
import '../../css/quebec_ca.css';
import logoFooter from '../../assets/piv/logo-gouv-couleur.svg';
import './footer.css';
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

export default function Footer(props) {

  const navigate = useNavigate();

  const handleConditions = (e) => {
    navigate(`/conditions`, { });    
  }  

  return (    
    <div className="Footer">
      <div className="container-fluid piv_bas" role="contentinfo">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex">
              <ul className="list-inline mx-auto justify-content-center">
                <li>
                  <a href="https://github.com/CQEN-QDCE/exp-mdl">
                    <FormattedMessage id="app.footer.information" defaultMessage={"Accès à l'information"} />
                  </a>
                </li>                
                <li>
                  <a href="#" onClick={handleConditions}>
                    <FormattedMessage id="app.footer.use" defaultMessage={"Conditions d'utilisation"} />
                  </a>
                </li>
                <li>
                  <a href="https://github.com/CQEN-QDCE">
                    <FormattedMessage id="app.footer.about" defaultMessage={"À propos du CQEN"} />
                  </a>
                </li>                  
              </ul>         
            </div>
            <div className="col-12 d-flex align-items-center justify-content-center" lang="fr">
              <a href="https://github.com/CQEN-QDCE">
                <img id="logoFooter" alt="Gouvernement du Québec." src={logoFooter} width="117" height="35" />
              </a>
            </div>
            <div className="col-12 d-flex align-items-center justify-content-center">
              <p>
                <a href="https://github.com/CQEN-QDCE/exp-mdl/blob/dev/LICENSE">
                  <FormattedMessage id="app.footer.copyright" defaultMessage={"© Centre Québécois d'Excellence Numérique, Québec 2024"} />                  
                </a>
              </p>
            </div>        
          </div>
        </div>
      </div>
    </div>
  )
}

