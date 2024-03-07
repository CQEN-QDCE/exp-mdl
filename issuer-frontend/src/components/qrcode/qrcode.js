import React, { useEffect, useState } from 'react';
import './qrcode.css';
import QRCode from 'qrcode.react';
import { useNavigate, useLocation } from "react-router-dom";  
import { useInterval } from "../../components/useInterval";
import axios from "axios";


const Qrcode = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);  
  const { credentialOffer, exchangeId } = state;
  const [qrData, setQRData] = useState("");
  const jsonStr = JSON.stringify(credentialOffer);
  const encodedJson = encodeURIComponent(jsonStr);
  const urlOffer = `openid-credential-offer://?credential_offer=${encodedJson}`;  

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

      console.log(response.data);

      if (response.data.results[0].state === "issued") {
        navigate(`/`);
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
    <div className="container" style={{ padding: "3px" }}>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 input-wrapper">
          <h1 className="input-h1">QR Code Page</h1>
          <hr />
          <div className="container" style={{ padding: "3px"}}>
            <div className="row">
              <div className="col-md"></div>
              <div className="col-md input-form" style={{ backgroundColor: "white", padding: "3px 5px" }}>
                <QRCode value={qrData} />
              </div>
	          <div className="col-md"></div>
	        </div>
	      </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  </div>
  )
};

export default Qrcode;
