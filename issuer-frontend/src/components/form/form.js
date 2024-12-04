import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, useHistory } from "react-router-dom";
import './form.css';
import '../../css/quebec_ca.css';
import { FormattedMessage } from 'react-intl';
import flechedroite from '../../assets/piv/fleche-droite.svg';
import flechegauche from '../../assets/piv/fleche-gauche.svg';
import flechedroitesecondary from '../../assets/piv/fleche-droite-secondary.svg'

export default function Form(props) {

  const navigate = useNavigate();

  // States for registration
  const [name, setName] = useState("Alain");
  const [lastName, setLastName] = useState("Tremblay");
  const [licenseNumber, setLicenseNumber] = useState("L123456789123");
  const [birthDate, setBirthDate] = useState(new Date("01-01-1999").toLocaleDateString("en-CA"));
  const [gender, setGender] = useState("M");
  const [height, setHeight] = useState("1.75");
  const [heightUnit, setHeightUnit] = useState("75");
  const [eyeColor, setEyeColor] = useState("brown");
  const [streetAddress, setStreetAddress] = useState("Rue des Amériques");
  const [doorNumber, setDoorNumber] = useState("123");
  const [streetNumber, setStreetNumver] = useState("123");
  const [city, setCity] = useState("Montréal");
  const [province, setProvince] = useState("QC");
  const [postalCode, setPostalCode] = useState("H3R 0J6");
  const addressRegion = "Province";
  const [licenseClass, setLicenseClass] = useState("5");
  const [associatedConditions, setAssociatedConditions] = useState("A");
  const [referenceNumber, setReferenceNumber] = useState("A2BC445D6");      
  const [issueDate, setIssueDate] = useState(new Date("01-01-2024").toLocaleDateString("en-CA"));
  const [expiryDate, setExpiryDate] = useState(new Date("01-01-2034").toLocaleDateString("en-CA"));

        
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});      

  const MDL_ISSUER_API_URL = process.env.REACT_APP_MDL_ISSUER_API_BASE_URL;
  const createDidUrl = () => `${MDL_ISSUER_API_URL}/wallet/did/create`;
  const exchangeCreateUrl = `${MDL_ISSUER_API_URL}/oid4vci/exchange/create`;
  const credentialOfferUrl = `${MDL_ISSUER_API_URL}/oid4vci/credential-offer`;

  const ANONCREDS_ISSUER_API_URL = process.env.REACT_APP_ANONCREDS_ISSUER_API_BASE_URL;
  const createInvitation = ()=> `${ANONCREDS_ISSUER_API_URL}/connections/create-invitation`;


  const API_KEY = "thisistheplace";  
  const headers = {
    accept: "application/json",
  };   
  const commonHeaders = {
    accept: "application/json",
    "X-API-KEY": API_KEY,
    "Content-Type": "application/json",
    // ONLY for development! TODO remove it when deploying to Openshift!
    'Access-Control-Allow-Origin'  : '*', 
    'Access-Control-Allow-Methods' : 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS', 
    'Access-Control-Allow-Headers' : 'Content-Type', 
    'Access-Control-Max-Age'       : '86400'    
  };        

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);      

  // Handling the name change
  const handleName = (e) => {
      setName(e.target.value);
      setSubmitted(false);
      errors["name"] = null;
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    setSubmitted(false);
    errors["lastName"] = null;
  }; 
  
  const handleLicenseNumber = (e) => {
    setLicenseNumber(e.target.value);
    setSubmitted(false);
    errors["licenseNumber"] = null;
  };       

  const handleBirthDate = (e) => {
      setBirthDate(e.target.value);
      setSubmitted(false);
      errors["birthDate"] = null;
  };

  const handleGender = (e) => {
    e.preventDefault();  
    setGender(e.target.name);
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

  const handleStreetAddress = (e) => {
    setStreetAddress(e.target.value);
    setSubmitted(false);
  };

  const handleDoorNumber = (e) => {
    setDoorNumber(e.target.value);
    setSubmitted(false);
  };
  
  const handleStreetNumber = (e) => {
    setStreetNumver(e.target.value);
    setSubmitted(false);
  }

  const handleCity = (e) => {
    setCity(e.target.value);
    setSubmitted(false);
  }
  
  const handleProvince = (e) => {
    setProvince(e.target.value);
    setSubmitted(false);
  };
  
  const handlePostalCode = (e) => {
    setPostalCode(e.target.value);
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
  
  const handleIssueDate = (e) => {
    setIssueDate(e.target.value);
    setSubmitted(false);
    errors["issueDate"] = null;
  };

  const handleExpiryDate = (e) => {
    setExpiryDate(e.target.value);
    setSubmitted(false);
    errors["expiryDate"] = null;
  };

  const handleValidation = () => {
    const formErrors = {};
    let formIsValid = false;

    if(isEmpty(name)){
      formErrors["name"] = "Cannot be empty";
    } else if(isEmpty(lastName)){
      formErrors["lastName"] = "Cannot be empty";
    } else if(isEmpty(licenseNumber)){
      formErrors["licenseNumber"] = "Cannot be empty";
    }
    else {
      formIsValid = true;
    }   
    
    setErrors(formErrors);        

    return formIsValid;
  };

  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  }

  const createDidOptions = () => ({
    method: "POST",
    headers: commonHeaders,
    body: JSON.stringify({
      method: "key",
    }),
  });

  const createInvitationOptions = () => ({
    method: "POST",
    headers: commonHeaders,
  });  

  async function fetchApiData(url, options) {
    console.log("fetchApiData: ", url, options);
    const response = await fetch(url, options);
    return await response.json();
  };   
  
  const getAddress = () => {
    return (isEmpty(doorNumber) ? "" : doorNumber) + (isEmpty(streetNumber) ? "" : " " + streetNumber) + (isEmpty(streetAddress) ? "" : ", " + streetAddress) + (isEmpty(city) ? "" : ", " + city);
  }

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString('en-GB').split('/').reverse().join(''); // '20211124'
    console.log("format date, input: ", date, " formatted date: ", formattedDate);
    return formattedDate;
  }
  
  const handleRegistrationIsoMdl = async () => {
    console.log("handleRegistration, api base url: ", MDL_ISSUER_API_URL);
    if(handleValidation()) {
      try {
        console.log("call to createDidUrl: ", createDidUrl());
        const didData = await fetchApiData(createDidUrl(), createDidOptions());
        console.log("didData", didData);      
        
        const did = didData.result.did;            

        axios.defaults.withCredentials = true;
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = MDL_ISSUER_API_URL;   
          
        console.log("about to call exchangeCreateUrl: ", exchangeCreateUrl, did, process.env.REACT_APP_OID4VCI_SUPPORTED_CREDENTIAL_ID, name, lastName, birthDate);
        const address = getAddress();
        
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
              "address": {
                "@type": "PostalAddress",
                "street_address":address,
                "address_locality":province,
                "postal_code":postalCode,
                "address_region":addressRegion
              },
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

  const handleRegistrationAnonCreds = async () => {
    console.log("handleRegistration AnonCreds, api base url: ", ANONCREDS_ISSUER_API_URL);

    if(handleValidation()) {
      try {
        console.log("call to createInvitation: ", createInvitation());
        const address = getAddress();

        const invitationData = await fetchApiData(createInvitation(), createInvitationOptions());        
        console.log("invitationData", invitationData);  

        const userData = {
          "name": name,
          "referenceNumber": referenceNumber,
          "height": height,
          "lastName": lastName,
          "birthDate": formatDate(birthDate),
          "portrait": 'non disponible',
          "gender": gender,
          "licenseNumber": licenseNumber,
          "conditions": associatedConditions,
          "address": address,
          "eyeColor": eyeColor,
          "weight": '85',
          "licenseClass": licenseClass,
          "issueDate": formatDate(issueDate),
          "expiryDate": formatDate(expiryDate),    
        }  
        console.log("userData: ", userData);
  
        navigate(`/qrcodeAnoncreds`, { state: { userData, invitationData } });            

      } catch (error) {
        console.error("Error during API call:", error);
      }

    }
  }    
  
  const handleBack = () => {
    navigate(`/conditions`, { });
  } 

const handleSubmit = (e) => {
  e.preventDefault();  
  console.log("in handleSubmit");
  console.log("button: "+e.target.id);
  
  if (!handleValidation()) {
    setError(true);
  }
  else {
    if (e.target.id === 'isomdl') {
      console.log("will try to request the mDL");
      handleRegistrationIsoMdl();
    }
    else {
      // default: anoncreds      
      console.log("will try to request the anoncreds mobile license number");
      handleRegistrationAnonCreds();
    }
    setSubmitted(true);
    setError(false);
    window.localStorage.setItem("name", name);
    window.localStorage.setItem("lastName", lastName);    
  }  
}

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
      <div className="row-form">        
        <div className="col-md-9 input-wrapper">

          <div className='row'> 
            <div className='col-lg-9 col-md-9 col-sm-12 d-flex align-items-center'>
              <h1 className="h1 title-orange-bar">
                <FormattedMessage id="app.form.title" defaultMessage={"Inscription"} />
              </h1>
            </div>
          </div>
          {/* <div className="messages">
            {errorMessage()}
            {successMessage()}
          </div>         */}
        

          <div className='frame frame-default frame-type-list frame-layout-0'>
            
            {/*About you*/}
            <form className="service-form" onSubmit={handleSubmit}>
              <div className='coordonnees-section'  style={{textAlign: "left", backgroundColor: "white"}}>
                <div className='row'>
                  <label className='control-label'>
                    <FormattedMessage id="app.form.about.you.title" defaultMessage={"About you"} />
                  </label>
                  <span>
                    <FormattedMessage id="app.form.about.you.description" defaultMessage={"Lorem Ipsum..."} />
                  </span>              
                </div>
                <br />
                <div className='row'>
                  <div className='col'>
                      <label className='font-weight-lighter' style={{color: "gray"}}>
                        <FormattedMessage id="app.form.gender.driver.license.reference" />                      
                      </label>
                      <label className='control-label'>                      
                        <FormattedMessage id="app.form.gender" defaultMessage={"About you"} />
                      </label>                    
                  </div>
                </div>
                <div className='row'>
                  <div className="col-3">
                    <button name='F' className="service_submit btn btn-secondary rounded-pill" onClick={handleGender}>
                      <FormattedMessage id="app.form.gender.female"/>
                    </button>  
                  </div>                  
                  <div className="col-3">
                    <button name='M' className="service_submit btn btn-secondary rounded-pill" onClick={handleGender}>
                    <FormattedMessage id="app.form.gender.male"/>
                    </button>  
                  </div>
                  <div className="col-3">
                    <button name='X' className="service_submit btn btn-secondary rounded-pill" onClick={handleGender}>
                      <FormattedMessage id="app.form.gender.not.specified"/>
                    </button>  
                  </div>                  
                </div>
                <br />
                <div className='row'> 
                  <div className="col">
                    <label className='font-weight-lighter' style={{color: "gray"}}>
                      <FormattedMessage id="app.form.last.name.driver.license.reference" />                      
                    </label>                    
                    <label htmlFor="lastName" className="control-label">
                      <FormattedMessage id="app.form.last.name" defaultMessage={"Last Name"} />
                      <span className="required">*</span>
                    </label>               
                    <input type="text" id="lastName" value={lastName} onChange={handleLastName} className="service-input form-control"/>
                    {errors["lastName"] && 
                      <span style={{ color: "red" }}>
                        <FormattedMessage id="app.form.validation.not.empty" defaultMessage={"Cannot be empty"} />
                      </span>
                    }
                  </div>            
                  <div className="col">
                    <label className='font-weight-lighter' style={{color: "gray"}}>
                      <FormattedMessage id="app.form.first.name.driver.license.reference" />                      
                    </label>                     
                    <label htmlFor="name" className="control-label">
                        <FormattedMessage id="app.form.first.name" defaultMessage={"First Name"} />
                        <span className="required">*</span>
                    </label>                                 
                    <input type="text" id="name" value={name} onChange={handleName} className="service-input form-control"/> 
                    {errors["name"] && 
                      <span style={{ color: "red" }}>
                          <FormattedMessage id="app.form.validation.not.empty" defaultMessage={"Cannot be empty"} />
                      </span>
                    }                 
                  </div>            
                </div>  
                <br />
                <div className='row'>
                  <div className='col'>
                    <label className='font-weight-lighter' style={{color: "gray"}}>
                      <FormattedMessage id="app.form.height.driver.license.reference" />                      
                    </label>                     
                    <label htmlFor="height" className="control-label">
                      <FormattedMessage id="app.form.height" defaultMessage={"Height"} />
                    </label>
                      <input type="text" id="height" value={height} onChange={handleHeight} className="service-input form-control" />                   
                  </div>  
                  <div className='col'>
                    <label className='font-weight-lighter' style={{color: "gray"}}>
                      <FormattedMessage id="app.form.eye.color.driver.license.reference" />                      
                    </label>                     
                    <label htmlFor="eyeColor" className="control-label">
                        <FormattedMessage id="app.form.eye.color" defaultMessage={"Eye Color"} />
                      </label>
                      <input type="text" id="eyeColor" value={eyeColor} onChange={handleEyeColor} className="service-input form-control" />                                      
                  </div>     
                  <div className='col'>
                    <label className='font-weight-lighter' style={{color: "gray"}}>
                      <FormattedMessage id="app.form.birthdate.driver.license.reference" />                      
                    </label>                     
                    <label htmlFor='birthDate' className='control-label'>
                      <FormattedMessage id="app.form.birthdate" defaultMessage={"Birthdate"} />
                      <span className="required">*</span>
                    </label>
                    <input type='date' id='birthDate' value={birthDate} onChange={handleBirthDate} className='service-input form-control'/>
                    <label htmlFor='birthDate' className='control-label' style={{fontWeight: "normal"}}>
                      <FormattedMessage id="app.form.birthdate.format"/>
                    </label>                    
                    {errors["birthDate"] && 
                      <span style={{ color: "red" }}>
                        <FormattedMessage id="app.form.validation.not.empty" defaultMessage={"Cannot be empty"} />
                      </span>
                    }
                  </div>                        
                </div>                                     
              </div>
              
              {/*Address*/}
              <div className='coordonnees-section' style={{textAlign: "left", backgroundColor: "white"}}>
                <div className='row'>
                  <label className='control-label'>
                    <FormattedMessage id="app.form.address.title" defaultMessage={"Address"} />
                  </label>
                  <span>
                    <FormattedMessage id="app.form.address.description" defaultMessage={"Lorem Ipsum..."} />
                  </span>  
                </div>
                <br />
                <div className='row'>
                  <div className='col'>
                    <label className='font-weight-lighter' style={{color: "gray"}}>
                      <FormattedMessage id="app.form.address.driver.license.reference" />                      
                    </label>                     
                    <label className='control-label'>
                      <FormattedMessage id="app.form.address" defaultMessage={"Address"} />
                    </label>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <input type='text' id='doorNumber' value={doorNumber} onChange={handleDoorNumber} className='service-input form-control'/>
                    <p>
                      <FormattedMessage id="app.form.address.door.number" defaultMessage={"Door number"} />
                    </p>
                  </div>
                  <div className='col'>
                    <input type='text' id='streetAddress' value={streetAddress} onChange={handleStreetAddress} className='service-input form-control'/>
                    <p>
                      <FormattedMessage id="app.form.address.street" defaultMessage={"Street Address"} />
                    </p>                                          
                  </div>                                               
                  <div className='col'>
                    <input type='text' id='city' value={city} onChange={handleCity} className='service-input form-control'/>
                    <p>
                      <FormattedMessage id="app.form.address.city" defaultMessage={"City"} />
                    </p>                                                              
                  </div>               
                  <div className='col'>
                    <input type='text' id='postalCode' value={postalCode} onChange={handlePostalCode} className='service-input form-control'/>
                    <p>
                      <FormattedMessage id="app.form.address.postal.code" defaultMessage={"Postal Code"} />
                    </p>                                                              
                  </div>           
                </div>
              </div>

              {/*License Information*/}
              <div className='coordonnees-section' style={{textAlign: "left", backgroundColor: "white"}}>
                <div className='row'>                  
                  <label className='control-label'>
                    <FormattedMessage id="app.form.fieldset.license" defaultMessage={"License Information"} />
                  </label>              
                </div>            
                <div className='row'>
                  <div className="col">
                    <label className='font-weight-lighter' style={{color: "gray"}}>
                      <FormattedMessage id="app.form.license.number.driver.license.reference" />                      
                    </label>                     
                    <label htmlFor="licenseNumber" className="control-label">
                      <FormattedMessage id="app.form.license.number" defaultMessage={"License Number"} />
                      <span className="required">*</span>
                    </label>
                    <input type="text" id="licenseNumber" value={licenseNumber} onChange={handleLicenseNumber} className="service-input form-control" />
                    {errors["licenseNumber"] &&
                      <span style={{ color: "red" }}>
                        <FormattedMessage id="app.form.validation.not.empty" defaultMessage={"Cannot be empty"} />
                      </span>
                    }
                  </div>
                  <div className='col'>
                    <label className='font-weight-lighter' style={{color: "gray"}}>
                      <FormattedMessage id="app.form.reference.number.driver.license.reference" />                      
                    </label>                     
                    <label htmlFor='referenceNumber' className='control-label'>
                      <FormattedMessage id="app.form.reference.number" defaultMessage={"Reference Number"} />
                    </label>                  
                    <input type="text" id="referenceNumber" value={referenceNumber} onChange={handleReferenceNumber} className="service-input form-control" />                                    
                  </div>
                </div> 
                <br />
                <div className='row'>
                  <div className='col'>
                    <label className='font-weight-lighter' style={{color: "gray"}}>
                      <FormattedMessage id="app.form.license.class.driver.license.reference" />                      
                    </label>                     
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
                    <label className='font-weight-lighter' style={{color: "gray"}}>
                      <FormattedMessage id="app.form.associated.conditions.driver.license.reference" />                      
                    </label>                     
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
                <br />
                <div className='row'>
                  <div className='col'>
                    <label className='font-weight-lighter' style={{color: "gray"}}>
                      <FormattedMessage id="app.form.issuedate.driver.license.reference" />                      
                    </label>                     
                    <label htmlFor='issueDate' className='control-label'>
                      <FormattedMessage id="app.form.issuedate" defaultMessage={"Issuedate"} />
                      <span className="required">*</span>
                    </label>
                    <input type='date' id='issueDate' value={issueDate} onChange={handleIssueDate} className='service-input form-control'/>
                    <label htmlFor='issueDate' className='control-label' style={{fontWeight: "normal"}}>
                      <FormattedMessage id="app.form.issuedate.format"/>
                    </label>                  
                  </div>            
                  <div className='col'>
                    <label className='font-weight-lighter' style={{color: "gray"}}>
                        <FormattedMessage id="app.form.expirydate.driver.license.reference" />                      
                      </label>                     
                      <label htmlFor='expiryDate' className='control-label'>
                        <FormattedMessage id="app.form.expirydate" defaultMessage={"Expirydate"} />
                        <span className="required">*</span>
                      </label>
                      <input type='date' id='expiryDate' value={expiryDate} onChange={handleExpiryDate} className='service-input form-control'/>
                      <label htmlFor='expiryDate' className='control-label' style={{fontWeight: "normal"}}>
                        <FormattedMessage id="app.form.expirydate.format"/>
                      </label>                 
                  </div>                                    
              </div> 
              </div>              
              <div className='row'>
                <div className="col">
                    <button type="submit" onClick={handleBack} className="service_submit btn btn-secondary">
                      <img className='mr-1' src={flechegauche} alt=''/>
                      <FormattedMessage id="app.button.back" defaultMessage={"Back"} />
                    </button>
                </div>  
                <div className='col'>
                  <button type="submit" onClick={handleSubmit} id='isomdl' className="service_submit btn btn-secondary">
                    <FormattedMessage id="app.form.submit.format2.isomdl" defaultMessage={"Submit"} />
                    <img className='mr-1' src={flechedroitesecondary} alt=''/>
                  </button>            
                </div>                  
                <div className='col'>
                  <button type="submit" onClick={handleSubmit} id='anoncreds' className="service_submit btn btn-primary">
                    <FormattedMessage id="app.form.submit.format1.anoncreds" defaultMessage={"Submit"} />
                    <img className='ml-1' src={flechedroite} alt=''/>
                  </button>            
                </div>                            
              </div>                                   
            
            </form> 
          </div>                               
          
        </div>
    </div>
  </div>
  );
}
