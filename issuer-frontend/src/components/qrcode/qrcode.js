import React, { useEffect, useState } from 'react';
import './qrcode.css';
import QRCode from 'qrcode.react';
import { useNavigate, useLocation } from "react-router-dom";  
import { useInterval } from "../../components/useInterval";
import axios from "axios";
import { FormattedMessage } from 'react-intl';


const Qrcode = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);  
  const { credentialOffer, exchangeId } = state;
  const [qrData, setQRData] = useState("");
  const jsonStr = JSON.stringify(credentialOffer);
  const encodedJson = encodeURIComponent(jsonStr);
  const urlOffer = `openid-credential-offer://?credential_offer=${encodedJson}`;  
  let tmpDemoTimer = 0;

  const API_BASE_URL = process.env.REACT_APP_ISSUER_API_BASE_URL;

  const headers = {
    withCredentials: true,
    "Access-Control-Allow-Origin": API_BASE_URL,
  };  

  const pollState = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/oid4vci/exchange/records`,
        {
          params: { exchange_id: exchangeId },
          headers: headers,
        }
      );

      const responseData = response.data.results[0];
      console.log(responseData);
      if(tmpDemoTimer < 30) {
        tmpDemoTimer++;
      }
      else {
        tmpDemoTimer = 0;
      }

      console.log("tmpDemoTimer: ", tmpDemoTimer);
      const issued = responseData.state === "issued";    

      if (issued || tmpDemoTimer === 29) {

        if (issued) {
          console.log("issued state, so will try to get the name and the family_name from the response");
          //TODO TEST! get given_name and family_name from json extract from response
          const given_name = responseData.claims["org.iso.18013.5.1.given_name"];
          const family_name = responseData.claims["org.iso.18013.5.1.family_name"];          
          console.log("given_name: ", given_name, ", family_name: ", family_name);
          navigate(`/result`, { state: { given_name, family_name } });
        }
        else {
          navigate(`/result`);
        }        
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Use the useInterval hook to start polling every 1000ms (1 second)
  useInterval(pollState, 1000);
  useEffect(() => {
    // Combine the data from the URL params to generate the QR code data.
    setQRData(urlOffer);
  }, [urlOffer]);  

  return (
    <div className="container" style={{ textAlign: "left"}}>
      <div className='row-form'>
        <h1 className='h1 title-orange-bar'>
        <FormattedMessage id="app.qrcode.title" defaultMessage={"Digital credential"} />
        </h1>
      </div>    
      <div className='row-form'>
        <div className="col input-wrapper">
          <div className='row'>
            <div className='col'> 
              <div className="col-md input-form" style={{ backgroundColor: "white", padding: "3px 5px" }}>
                <QRCode value={qrData} size={300} />
                <p style={{ textAlign: "left" }}>
                  <FormattedMessage id="app.qrcode.instructions" defaultMessage={"Scan this QR code to continue"} />
                </p>
              </div>
            </div>
            <div className='col' style={{ textAlign: "left" }}>
              <h4>
                <FormattedMessage id="app.qrcode.info.title" defaultMessage={"Access to your credential with your mobile"} />
              </h4>  
              <p style={{ textAlign: "left" }}>
                <FormattedMessage id="app.qrcode.info.p1" defaultMessage={"Lorem Ipsum..."} />
              </p> 
              <p style={{ textAlign: "left" }}>
                <img src="https://authentification.quebec.ca/resources/na6x6/login/SQIN5/img/0105-shield-check.svg"/>
                <FormattedMessage id="app.qrcode.info.p2" defaultMessage={"Lorem Ipsum..."} />  
              </p>           
              <p style={{ textAlign: "left" }}>
                <img src='https://authentification.quebec.ca/resources/na6x6/login/SQIN5/img/0111-key.svg'/>
                <FormattedMessage id="app.qrcode.info.p3" defaultMessage={"Lorem Ipsum..."} />  
              </p>                         
              <p style={{ textAlign: "left" }}>
                <img src="https://authentification.quebec.ca/resources/na6x6/login/SQIN5/img/0110-unlock.svg"/>
                <FormattedMessage id="app.qrcode.info.p4" defaultMessage={"Lorem Ipsum..."} />  
              </p>                                       
            </div>
          </div>
        </div>              
      </div>  

  </div>
  )
};

export default Qrcode;
