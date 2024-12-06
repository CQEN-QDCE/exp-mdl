import React, { useEffect, useState } from 'react';
import './qrcode.css';
import QRCode from 'qrcode.react';
import { useNavigate, useLocation } from "react-router-dom";  
import { useInterval } from "../useInterval";
import axios from "axios";
import { FormattedMessage } from 'react-intl';


const Qrcode = ( ) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { invitationData } = state;
  const { userData } = state;
/*
  console.log("invitationData: ", invitationData);
  console.log("userData: ", userData);
  */
  
  const [qrData, setQRData] = useState("");
  const urlOffer = invitationData.invitation_url;
  let tmpDemoTimer = 0;

  const API_BASE_URL = process.env.REACT_APP_ANONCREDS_ISSUER_API_BASE_URL;
  const schema_name = process.env.REACT_APP_ANONCREDS_SCHEMA_NAME;
  const schema_version = process.env.REACT_APP_ANONCREDS_SCHEMA_VERSION;
  const cred_def_id = process.env.REACT_APP_ANONCREDS_CRED_DEF_ID;
  const ISSUE_CREDENTIAL_URL = `${API_BASE_URL}/issue-credential/send`;


  const name = userData.name ? userData.name : "Alain";
  const lastName = userData.lastName ? userData.lastName : "Tremblay";
  const referenceNumber = userData.referenceNumber ? userData.referenceNumber : "A2BC445D6";
  const height = userData.height ? userData.height : "1.75";
  const eyeColor = userData.eyeColor ? userData.eyeColor : "brown";
  const weight = userData.weight ? userData.weight : "85";
  const licenseNumber = userData.licenseNumber ? userData.licenseNumber : "L123456789123";
  const licenseClass = userData.licenseClass ? userData.licenseClass : "5";
  const address = userData.address ? userData.address : "Some address 123";
  const conditions = userData.associatedConditions ? userData.associatedConditions : "A";
  const birthDate = userData.birthDate ? userData.birthDate : "20000101";
  const gender = userData.gender ? userData.gender : "M";
  const expiryDate = userData.expiryDate ? userData.expiryDate : "20300101";
  const issueDate = userData.issueDate ? userData.issueDate : "20200101";
  console.log("name: ", name, "lastName: ", lastName, "referenceNumber: ", referenceNumber, "height: ", height, "eyeColor: ", eyeColor, "weight: ", weight, "licenseNumber: ", licenseNumber, "licenseClass: ", licenseClass, "address: ", address, "conditions: ", conditions, "birthDate: ", birthDate, "gender: ", gender, "expiryDate: ", expiryDate, "issueDate: ", issueDate);

  const headers = {
    withCredentials: true,
    "Access-Control-Allow-Origin": API_BASE_URL,
  };  

  const pollState = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/connections/${invitationData.connection_id}`,
        {
          //params: { connection_id: invitationData.connection_id },
          headers: headers,
        }
      );

      //const responseData = response.data.results[0];
      const responseData = response.data;
      console.log(responseData);
      if(tmpDemoTimer < 30) {
        tmpDemoTimer++;
      }
      else {
        tmpDemoTimer = 0;
      }

      /**
       * TODO: when responseData != 'invitation' then call to issueCredential (`/issue-credential/send`)
       */

      console.log("tmpDemoTimer: ", tmpDemoTimer);
      const invitationReceived = responseData.state !== "invitation";    

      if (invitationReceived || tmpDemoTimer === 29) {

        if (invitationReceived) {
          console.log("invitation received, so will try to send the request for credential issue");
          await axios.post(ISSUE_CREDENTIAL_URL, {
            connection_id: invitationData.connection_id,
            schema_name,
            schema_version,
            cred_def_id,
            credential_proposal: {
              "type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview",
              "attributes": [ 
                {
                  "name": "given_name",
                  "value": name
                },    
                {
                  "name": "reference_number",
                  "value": referenceNumber
                },    
                {
                  "name": "height",
                  "value": height
                },                                          
                {
                  "name": "family_name",
                  "value": lastName
                },  
                {
                  "name": "birth_date_dateint",
                  "value": birthDate
                },                 
                {
                  "name": "portrait",
                  "value": "non disponible"
                }, 
                {
                  "name": "sex",
                  "value": gender
                },   
                {
                  "name": "license_number",
                  "value": licenseNumber
                },  
                {
                  "name": "expiry_date_dateint",
                  "value": expiryDate
                },  
                {
                  "name": "conditions",
                  "value": conditions
                },  
                {
                  "name": "resident_address",
                  "value": address
                },                                                                              
                {
                  "name": "eye_colour",
                  "value": eyeColor
                },                 
                {
                  "name": "issue_date_dateint",
                  "value": issueDate
                }, 
                {
                  "name": "weight",
                  "value": weight
                },                                  
                {
                  "name": "license_class",
                  "value": licenseClass             
                },                                                
              ]
            },
             "comment": "Émission d'attestation du permis de conduire numérique"
          });
         /*
          const given_name = props.name;
          const family_name = props.lastName;
          console.log("given_name: ", given_name, "family_name: ", family_name, "from props: ", props.name, "lastname: ", props.lastName);
          */
          navigate(`/result`, { state: { name, lastName } });
          
        }/*
        else {
          navigate(`/result`);
        }    */    
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
                <img src="https://authentification.quebec.ca/resources/na6x6/login/SQIN5/img/0105-shield-check.svg" alt=''/>
                <FormattedMessage id="app.qrcode.info.p2" defaultMessage={"Lorem Ipsum..."} />  
              </p>           
              <p style={{ textAlign: "left" }}>
                <img src='https://authentification.quebec.ca/resources/na6x6/login/SQIN5/img/0111-key.svg' alt=''/>
                <FormattedMessage id="app.qrcode.info.p3" defaultMessage={"Lorem Ipsum..."} />  
              </p>                         
              <p style={{ textAlign: "left" }}>
                <img src="https://authentification.quebec.ca/resources/na6x6/login/SQIN5/img/0110-unlock.svg" alt=''/>
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
