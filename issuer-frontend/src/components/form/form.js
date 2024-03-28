import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './form.css';
import '../../css/quebec_ca.css';
import { FormattedMessage } from 'react-intl';

export default function Form(props) {

  const navigate = useNavigate();

  // States for registration
  const [name, setName] = useState("Melissa");
  const [lastName, setLastName] = useState("Tremblay");
  const [licenseNumber, setLicenseNumber] = useState("A0A 1B1");
  const [birthDate, setBirthDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [gender, setGender] = useState("F");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [doorNumber, setDoorNumber] = useState("");
  const [streetNumber, setStreetNumver] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const addressRegion = "Province";
  const [licenseClass, setLicenseClass] = useState("");
  const [associatedConditions, setAssociatedConditions] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");      
        
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
    console.log("handleName");
      setName(e.target.value);
      setSubmitted(false);
      errors["name"] = null;
  };

  const handleLastName = (e) => {
    console.log("handleLastName");
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
  
    //TODO: Add more validation
    // if(typeof formFields["licenseNumber"] !== "undefined"){
    //   if(!formFields["licenseNumber"].match(/(A|D)?R?(B|C|E|F)?(G[12]?)?L?S?(M[12]?)?/)){
    //     formIsValid = false;
    //     formErrors["name"] = "Only letters";
    //   }       
    // }     
    
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

  async function fetchApiData(url, options) {
    console.log("fetchApiData: ", url, options);
    const response = await fetch(url, options);
    return await response.json();
  };   
  
  const getAddress = () => {
    return streetNumber + ", " + streetAddress + isEmpty(doorNumber) ? "" : ", " + doorNumber;
  }
  
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
  
  const handleBack = () => {
    navigate(`/conditions`, { });
  }

  // Handling the form submission
  const handleSubmit = (e) => {
      e.preventDefault();       
      if (!handleValidation()) {
        setError(true);
      }
      else {
        handleRegistration();
        setSubmitted(true);
        setError(false);
        window.localStorage.setItem("name", name);
        window.localStorage.setItem("lastName", lastName);
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
              <div className='coordonnees-section'  style={{textAlign: "left"}}>
                <div className='row'>
                  <label className='control-label'>
                    <FormattedMessage id="app.form.about.you.title" defaultMessage={"Physical Characteristics"} />
                  </label>
                  <span>
                    <FormattedMessage id="app.form.about.you.description" defaultMessage={"Lorem Ipsum..."} />
                  </span>              
                </div>
                <br />
                <div className='row'> 
                  <div className="col">
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
                <div className='row'>
                  <div className='col'>
                    <label htmlFor="height" className="control-label">
                      <FormattedMessage id="app.form.height" defaultMessage={"Height"} />
                    </label>
                      <input type="text" id="height" value={height} onChange={handleHeight} className="service-input form-control" />                   
                  </div>  
                  <div className='col'>
                    <label htmlFor="eyeColor" className="control-label">
                        <FormattedMessage id="app.form.eye.color" defaultMessage={"Eye Color"} />
                      </label>
                      <input type="text" id="eyeColor" value={eyeColor} onChange={handleEyeColor} className="service-input form-control" />                                      
                  </div>     
                  <div className='col'>
                    <label htmlFor='birthDate' className='control-label'>
                      <FormattedMessage id="app.form.birthdate" defaultMessage={"Birthdate"} />
                      <span className="required">*</span>
                    </label>
                    <input type='date' id='birthDate' value={birthDate} onChange={handleBirthDate} className='service-input form-control'/>
                    {errors["birthDate"] && 
                      <span style={{ color: "red" }}>
                        <FormattedMessage id="app.form.validation.not.empty" defaultMessage={"Cannot be empty"} />
                      </span>
                    }
                  </div>                        
                </div>                                     
              </div>
              
              {/*Address*/}
              <div className='coordonnees-section' style={{textAlign: "left"}}>
                <div className='row'>
                  <label className='control-label'>
                    <FormattedMessage id="app.form.address.title" defaultMessage={"Physical Characteristics"} />
                  </label>
                  <span>
                    <FormattedMessage id="app.form.address.description" defaultMessage={"Lorem Ipsum..."} />
                  </span>  
                </div>
                <br />
                <div className='row'>
                  <div className='col'>
                    <label htmlFor='doorNumber' className='control-label'>
                      <FormattedMessage id="app.form.address.door.number" defaultMessage={"Door number"} />
                    </label>
                    <input type='text' id='doorNumber' value={doorNumber} onChange={handleDoorNumber} className='service-input form-control'/>
                  </div>
                  <div className='col'>
                    <label htmlFor='streetNumber' className='control-label'>
                      <FormattedMessage id="app.form.address.street.number" defaultMessage={"Street number"} />
                    </label>
                    <input type='text' id='streetNumber' value={streetNumber} onChange={handleStreetNumber} className='service-input form-control'/>
                  </div>                              
                  <div className='col'>
                    <label htmlFor='streetAddress' className='control-label'>
                      <FormattedMessage id="app.form.address.street" defaultMessage={"Street Address"} />
                    </label>
                    <input type='text' id='streetAddress' value={streetAddress} onChange={handleStreetAddress} className='service-input form-control'/>
                  </div>               
                </div>
                <div className='row'>
                  <div className='col'>
                    <label htmlFor='city' className='control-label'>
                      <FormattedMessage id="app.form.address.city" defaultMessage={"City"} />
                    </label>
                    <input type='text' id='city' value={city} onChange={handleCity} className='service-input form-control'/>
                  </div>               
                  <div className='col'>
                    <label htmlFor='postalCode' className='control-label'>
                      <FormattedMessage id="app.form.address.postal.code" defaultMessage={"Postal Code"} />
                    </label>
                    <input type='text' id='postalCode' value={postalCode} onChange={handlePostalCode} className='service-input form-control'/>
                  </div>           
                  <div className='col'>         
                    <label htmlFor='province' className='control-label'>
                      <FormattedMessage id="app.form.address.province" defaultMessage={"Province"} />
                    </label>
                    <input type='text' id='province' value={province} onChange={handleProvince} className='service-input form-control'/>
                  </div>
                </div>                                       
              </div>

              <div className='coordonnees-section' style={{textAlign: "left"}}>
                <div className='row'>
                  <label className='control-label'>
                    <FormattedMessage id="app.form.fieldset.license" defaultMessage={"License Information"} />
                  </label>              
                </div>            
                <div className='row'>
                  <div className="col">
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
              <div className='row'>
                <div className="col">
                    <button type="submit" onClick={handleBack} className="service_submit btn btn-secondary">
                      <FormattedMessage id="app.button.back" defaultMessage={"Back"} />
                    </button>
                </div>  
                <div className='col'>
                  <button type="submit" className="service_submit btn btn-primary">
                    <FormattedMessage id="app.form.submit" defaultMessage={"Submit"} />
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
