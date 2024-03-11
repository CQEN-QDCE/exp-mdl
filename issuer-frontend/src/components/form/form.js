import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './form.css';
import '../../css/quebec_ca.css';
import { FormattedMessage } from 'react-intl';

export default function Form(props) {

  const navigate = useNavigate();

      // States for registration
      const [name, setName] = useState("");
      const [lastName, setLastName] = useState("");
      const [licenseNumber, setLicenseNumber] = useState("");
      const [birthDate, setBirthDate] = useState(new Date().toLocaleDateString("en-CA"));
      const [gender, setGender] = useState("");
      const [height, setHeight] = useState("");
      const [heightUnit, setHeightUnit] = useState("");
      const [eyeColor, setEyeColor] = useState("");
      const [address, setAddress] = useState("");
      const [licenseClass, setLicenseClass] = useState("");
      const [associatedConditions, setAssociatedConditions] = useState("");
      const [referenceNumber, setReferenceNumber] = useState("");      
      const [licenseInformationVisible, setLicenseInformationVisible] = useState(false);
      const [personCharacteristicsVisible, setPersonCharacteristicsVisible] = useState(false);          
      

      const [fields, setFields] = useState({});
      const [errors, setErrors] = useState({});      

      const API_BASE_URL = process.env.REACT_APP_ISSUER_API_BASE_URL;
      const createDidUrl = () => `${API_BASE_URL}/wallet/did/create`;
      const exchangeCreateUrl = `${API_BASE_URL}/oid4vci/exchange/create`;
      const credentialOfferUrl = `${API_BASE_URL}/oid4vci/credential-offer`;

      const API_KEY = "thisistheplace";  
      const headers = {
        accept: "application/json",
      };   
      const commonHeaders = {
        accept: "application/json",
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      };        
   
      // States for checking the errors
      const [submitted, setSubmitted] = useState(false);
      const [error, setError] = useState(false);      
   
      // Handling the name change
      const handleName = (e) => {
          setName(e.target.value);
          setSubmitted(false);
      };

      const handleLastName = (e) => {
        setLastName(e.target.value);
        setSubmitted(false);
      }; 
      
      const handleLicenseNumber = (e) => {
        setLicenseNumber(e.target.value);
        setSubmitted(false);
      };       
   
      const handleBirthDate = (e) => {
          setBirthDate(e.target.value);
          setSubmitted(false);
      };

      const handleGender = (e) => {
        setGender(e.target.value);
        setSubmitted(false);
      };

      const handleHeight = (e) => {
        setHeight(e.target.value);
        setSubmitted(false);
      };

      const handleHeightUnit = (e) => {
        setHeightUnit(e.target.value);
        setSubmitted(false);
      };
      
      const handleEyeColor = (e) => {
        setEyeColor(e.target.value);
        setSubmitted(false);
      };

      const handleAddress = (e) => {
        setAddress(e.target.value);
        setSubmitted(false);
      };

      const handleLicenseClass = (e) => {
        setLicenseClass(e.target.value);
        setSubmitted(false);
      };

      const handleAssociatedConditions = (e) => {
        setAssociatedConditions(e.target.value);
        setSubmitted(false);
      };

      const handleReferenceNumber = (e) => {
        setReferenceNumber(e.target.value);
        setSubmitted(false);
      };

      const toogleLicenseInformationVisible = (e) => {
        setLicenseInformationVisible(!licenseInformationVisible);
        setSubmitted(false);
        e.preventDefault();
      };
   
      const tooglePersonCharacteristicsVisible = (e) => {
        setPersonCharacteristicsVisible(!personCharacteristicsVisible);
        setSubmitted(false);
        e.preventDefault();
      };

      const handleValidation = (e) => {
        console.log("handleValidation");
        const formFields = {...fields};
        const formErrors = {};
        let formIsValid = true;

        if(typeof formFields["licenseNumber"] !== "undefined"){
          if(!formFields["licenseNumber"].match(/(A|D)?R?(B|C|E|F)?(G[12]?)?L?S?(M[12]?)?/)){
            formIsValid = false;
            formErrors["name"] = "Only letters";
          }       
        }     
        
        setErrors(formErrors);        

        return formIsValid;
      };

      const createDidOptions = () => ({
        method: "POST",
        headers: commonHeaders,
        body: JSON.stringify({
          method: "key",
        }),
      });

      async function fetchApiData(url, options) {
        console.log("fetchApiData: ", url, options);
        const response = await fetch(url, options);
        return await response.json();
      };       
      
      const handleRegistration = async () => {
        console.log("handleRegistration, api base url: ", API_BASE_URL);
        if(handleValidation()) {
          try {
            console.log("call to createDidUrl: ", createDidUrl());
            const didData = await fetchApiData(createDidUrl(), createDidOptions());
            console.log("didData", didData);      
            
            const did = didData.result.did;            

            axios.defaults.withCredentials = true;
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = API_BASE_URL;   
              
            console.log("about to call exchangeCreateUrl: ", exchangeCreateUrl, did, process.env.REACT_APP_OID4VCI_SUPPORTED_CREDENTIAL_ID, name, lastName, birthDate);
            
            const exchangeResponse = await axios.post(exchangeCreateUrl, {              
              did,
              supported_cred_id: process.env.REACT_APP_OID4VCI_SUPPORTED_CREDENTIAL_ID,
              claims: { 
                "org.iso.18013.5.1": {
                  "given_name":name,
                  "family_name":lastName,
                  "license_number":licenseNumber,
                  "birth_date":birthDate,
                  "gender":gender,
                  "height":height,
                  "eye_color":eyeColor,
                  "address":address,
                  "license_class":licenseClass,
                  "associated_conditions":associatedConditions,
                  "reference_number":referenceNumber
                },  
                "org.iso.18013.5.1.aamva":{"organ_donor":true}
              },                            
            });          
            const exchangeId = exchangeResponse.data.exchange_id;
            console.log("exchangeId: ", exchangeId);
      
            const queryParams = {
              user_pin_required: false,
              exchange_id: exchangeId,
            };
      
            console.log("about to call credentialOfferUrl: ", credentialOfferUrl);
            const offerResponse = await axios.get(credentialOfferUrl, {
              params: queryParams,
              headers: headers,
            });
      
            const credentialOffer = offerResponse.data;
      
            navigate(`/qrcode`, { state: { credentialOffer, exchangeId } });            

          } catch (error) {
            console.error("Error during API call:", error);
          }

        }
      }      
   
      // Handling the form submission
      const handleSubmit = (e) => {
          e.preventDefault();       
          if (name === "" || lastName === "") {
            setError(true);
          } else {
            handleRegistration();
            setSubmitted(true);
            setError(false);
          }            
      };
   
      // Showing success message
      const successMessage = () => {
          return (
              <div
                  className="success"
                  style={{
                      display: submitted ? "" : "none",
                  }}
              >
                  <h1>
                    <FormattedMessage id='app.form.message.success' defaultMessage={"User successfully registered!"}/>
                  </h1>
              </div>
          );
      };
   
      // Showing error message if error is true
      const errorMessage = () => {
          return (
              <div
                  className="error"
                  style={{
                      display: error ? "" : "none",
                  }}
              >
                  <h1>
                    <FormattedMessage id='app.form.message.error' defaultMessage={"Please enter required fields"} />
                  </h1>
              </div>
          );
      };  

      return (
        <div className="container" style={{padding: "3px"}}>        
        <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 input-wrapper">
        <h1 className="input-h1">
          <FormattedMessage id="app.form.title" defaultMessage={"User Regitration"} />
        </h1>
  
        <br />

        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>        
  
        <div>
          
          <form className="service-form" onSubmit={handleSubmit}>
            <div className='service-fieldset'>
              <div className='row'> 
                <div className="col">
                  <label htmlFor="name" className="control-label">
                      <FormattedMessage id="app.form.first.name" defaultMessage={"First Name"} />
                  </label>                                 
                  <input type="text" id="name" value={name} onChange={handleName} className="service-input form-control"/>                  
                </div>            
              </div>
              <div className='row'>
                <div className="col">
                  <label htmlFor="lastName" className="control-label">
                    <FormattedMessage id="app.form.last.name" defaultMessage={"Last Name"} />
                  </label>               
                  <input type="text" id="lastName" value={lastName} onChange={handleLastName} className="service-input form-control"/>
                </div>
              </div>              
                                        
              <div className='row'>
                <div className='col'>
                  <label htmlFor='birthDate' className='control-label'>
                    <FormattedMessage id="app.form.birthdate" defaultMessage={"Birthdate"} />
                  </label>
                  <input type='date' id='birthDate' value={birthDate} onChange={handleBirthDate} className='service-input form-control'/>
                </div>            
              </div>                           
            </div>

            <div className='service-fieldset'>
              <label className="control-label">
                <FormattedMessage id="app.form.fieldset.person" defaultMessage={"Person Characteristics"} />
              </label> 
              <button id='person' onClick={tooglePersonCharacteristicsVisible}> {personCharacteristicsVisible ? " <--" : " -->"}</button>
              <div id='personCharacteristics' style={{display: personCharacteristicsVisible ? 'block' : 'none'}}>
                <div className='row'>
                  <div className='col'>
                    <label htmlFor='gender' className='control-label'>
                        <FormattedMessage id="app.form.gender" defaultMessage={"Gender"} />
                      </label>
                      <select id='gender' value={gender} onChange={handleGender} className='service-input form-control'>
                        <option value='N'>-</option>
                        <option value='M'>
                          <FormattedMessage id="app.form.gender.male" defaultMessage={"Male"} />
                        </option>
                        <option value='F'>
                          <FormattedMessage id="app.form.gender.female" defaultMessage={"Female"} />
                        </option>
                      </select>
                      <label htmlFor="eyeColor" className="control-label">
                        <FormattedMessage id="app.form.eye.color" defaultMessage={"Eye Color"} />
                      </label>
                      <input type="text" id="eyeColor" value={eyeColor} onChange={handleEyeColor} className="service-input form-control" />                      
                  </div>
                  <div className='col'>
                    <label htmlFor="height" className="control-label">
                      <FormattedMessage id="app.form.height" defaultMessage={"Height"} />
                    </label>
                    <div style={{display: 'inline-flex'}}>
                      <input type="text" id="height" value={height} onChange={handleHeight} className="service-input form-control" />
                      <select id='heightUnit' value={heightUnit} onChange={handleHeightUnit} className='service-input form-control'>
                        <option value='cm'>
                          <FormattedMessage id="app.form.height.unit.cm" defaultMessage={"cm(s)"} />
                        </option>
                        <option value='in'>
                          <FormattedMessage id="app.form.height.unit.in" defaultMessage={"in(es)"} />
                        </option>
                      </select>  
                    </div>                     
                  </div>           
                </div>                 
              </div>                                        
            </div>

            <div className='service-fieldset'>
              <label className="control-label">
                <FormattedMessage id="app.form.fieldset.license" defaultMessage={"License Information"} />
              </label>
              <button name='license' onClick={toogleLicenseInformationVisible}> {licenseInformationVisible ? " <--" : " -->"}</button>              
              <div id='licenseInformation' style={{display: licenseInformationVisible ? 'block' : 'none'}}>
              <div className='row'>
                <div className="col">
                  <label htmlFor="licenseNumber" className="control-label">
                    <FormattedMessage id="app.form.license.number" defaultMessage={"License Number"} />
                  </label>
                  <input type="text" id="licenseNumber" value={licenseNumber} onChange={handleLicenseNumber} className="service-input form-control" />
                  </div>
                  <div className='col'>
                  <label htmlFor='referenceNumber' className='control-label'>
                    <FormattedMessage id="app.form.reference.number" defaultMessage={"Reference Number"} />
                  </label>                  
                  <input type="text" id="referenceNumber" value={referenceNumber} onChange={handleReferenceNumber} className="service-input form-control" />                                    
                </div>
              </div> 
              <div className='row'>
                <div className='col'>
                  <label htmlFor='licenseClass' className='control-label'>
                    <FormattedMessage id="app.form.license.class" defaultMessage={"License Class"} />
                  </label>
                  <select id='licenseClass' value={licenseClass} onChange={handleLicenseClass} className='service-input form-control'>
                      <option value='N'>-</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4A'>4A</option>
                      <option value='4B'>4B</option>
                      <option value='4C'>4C</option>
                      <option value='5'>5</option>
                      <option value='6A'>6A</option>
                    </select>                  
                </div>            
                <div className='col'>
                  <label htmlFor='associatedConditions' className='control-label'>
                    <FormattedMessage id="app.form.associated.conditions" defaultMessage={"Associated Conditions"} />
                  </label>                  
                    <select id='associatedConditions' value={associatedConditions} onChange={handleAssociatedConditions} className='service-input form-control'>
                      <option value='N'>-</option>
                      <option value='A'>A</option>
                      <option value='C'>C</option>
                    </select>                  
                </div>                                    
              </div>          
              </div>          
            </div>

            <br />

            <div className='row'>
              <div className="form-group-col-md-12 col-lg-9">
                <div className="col-sm-offset-2">
                  <button type="submit" className="service_submit btn btn-primary">
                    <FormattedMessage id="app.form.submit" defaultMessage={"Submit"} />
                  </button>
                </div>
              </div>              
            </div>                                   
            
          </form>          
                   
        </div>
        </div>
        </div>
      </div>
      );
}
