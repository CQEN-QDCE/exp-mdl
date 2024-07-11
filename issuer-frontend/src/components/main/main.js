import React from 'react';
//import './main.css';
import { FormattedMessage } from 'react-intl';

export default function Main(props) {

  return (      
    <div className="main">
      <h1><FormattedMessage id="app.main.title" defaultMessage={"Permis de Conduire"} /></h1>
    </div>  
  );
}
