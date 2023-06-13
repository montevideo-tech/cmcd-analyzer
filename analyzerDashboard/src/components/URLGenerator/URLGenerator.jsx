import { useState } from 'react'
import './URLGenerator.css'
import InputField from '../InputField/InputFields'
import URLGenerateButton from '../Button/URLGenerateButton'
import DisplayedURL from '../DisplayedURL/DisplayedURL'
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';


function URLGenerator() {
  const [field1, setField1] = useState('');
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [key, setKey] = useState('');
  const [val, setVal] = useState('');
  const [generatedURL, setGeneratedURL] = useState('');
  const [field1Error, setField1Error] = useState(false);
  const [json, setJson] = useState({});
  const [keyError, setKeyError] = useState(false);
  const [valError, setValError] = useState(false);

  const handleField1Change = (event) => {
    setField1(event.target.value);
    setField1Error(false);
  };

  const handleIpChange = (event) => {
    setIp(event.target.value);
  };

  const handlePortChange = (event) => {
    setPort(event.target.value);
  };

  const handleKeyChange = (event) => {
    setKey(event.target.value);
    setKeyError(false);
  };

  const handleValChange = (event) => {
    setVal(event.target.value);
    setValError(false);
  };

  const encodeToBase64 = (val) => {
    let obj = json;
    obj.url = val;
    setJson(obj);
    const encodedValue = window.btoa(JSON.stringify(json));
    return encodedValue;
  }

  const divideURL = (val) => {
    const elems = val.split('/');
    const first = elems.pop();
    const second = elems.join('/') + '/';
    return (encodeToBase64(second, json) + '/' + first);
  }


  const handleGenerateURL = () => {
    const uuid = uuidv4();
    const ipValue = ip ? ip : "localhost";
    const portValue = port ? port : "3000";
    if (!field1) {
      setField1Error(true);
    }
    else {
      console.log(json);
      const url = `http://${ipValue}:${portValue}/video/${uuid}/${divideURL(field1)}`;
      setGeneratedURL(url);
    }
  };

  const handleAddNewObject = () => {
    if (!key) {
      setKeyError(true);
    }
    else if (!val) {
      setValError(true);
    }
    else {
      let obj = json;
      obj[key] = val;
      setJson(obj);
      console.log(json);
    }
  }
  
  return (
    <div className="app">
      <img src="https://montevideotech.dev/wp-content/uploads/2020/09/mvd-tech-1.png" alt="Logo" className="logo" />
      
      <div className="container-box">
        <div className='container'>
            <div className='row'>
              <div className='col'>
                <InputField
                  value={field1}
                  onChange={handleField1Change}
                  placeholder='VideoURL: '
                  name="VideoURL: "
                  error={field1Error}
                  message='Please provide a valid video URL.'
                />
                <span></span>
              </div>
            </div>
            <hr className="divider" />
            <div className='row'>
              {/* <h5 style={{ color: 'white' }} >Optional fields: </h5> */}
              <div className='col'>
                <div className="row">
                  <div className="col">
                    <InputField 
                      value={ip}
                      onChange={handleIpChange}
                      placeholder="file"
                      name="IP: "
                    />
                    <span></span>
                  </div>
                  <div className="col">
                    <InputField 
                      value={port}
                      onChange={handlePortChange}
                      placeholder="ip"
                      name="Port: "
                    />
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
            <h6 style={{ color: 'white' }}>
              The default ip and port will be localhost:3000 if no other value is assigned.
            </h6>
            <hr className="divider" />
            {/* <h6 style={{ color: 'white' }}>
              The following fields can be used to add any additional information to the generated URL.
              The information will be in json format which will be encoded inside the URL.
            </h6> */}
            <div className='row'>
              {/* <h5 style={{ color: 'white' }} >Optional fields: </h5> */}
              {/*agregar texto de que hacer para eliminar y agregar  */}
              <div className='col'>
                <div className="row">
                  <div className="col">
                    <InputField 
                      value={key}
                      onChange={handleKeyChange}
                      placeholder="key"
                      name="Key: "
                      error={keyError}
                      message='Enter this field.'
                    />
                    <span></span>
                  </div>
                  <div className="col">
                    <InputField 
                      value={val}
                      onChange={handleValChange}
                      placeholder="value"
                      name="Value: "
                      error={valError}
                      message='Enter this field.'
                    />
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <URLGenerateButton onClick={handleAddNewObject} name="Add new object"/>
              </div>
            </div>
            <hr className="divider" />
            <div className='row'>
              <div className='col'>
                <URLGenerateButton onClick={handleGenerateURL} name="Generate URL"/>
              </div>
            </div>
            <div className="row mt-3">
              <div className='col'>
                <DisplayedURL generatedURL={generatedURL}/>
              </div>
            </div>
    
        </div>
      </div>
    
    </div>
  );

}


export default URLGenerator
