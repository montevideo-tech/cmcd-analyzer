import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputField from './components/InputFields'
import URLGenerateButton from './components/URLGenerateButton'
import DisplayedURL from './components/DisplayedURL'
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';



function App() {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [generatedURL, setGeneratedURL] = useState('');

  const handleField1Change = (event) => {
    setField1(event.target.value);
  };

  const handleField2Change = (event) => {
    setField2(event.target.value);
  };

  const handleField3Change = (event) => {
    setField3(event.target.value);
  };

  const encodeToBase64 = (val) => {
    let obj = {};
    obj.url = val;
    const encodedValue = window.btoa(JSON.stringify(obj));
    return encodedValue;
  }

  const divideURL = (val) => {
    const elems = val.split('/');
    const first = elems.pop();
    const second = elems.join('/') + '/';
    return (encodeToBase64(second) + '/' + first);
  }

  const handleGenerateURL = () => {
    const uuid = uuidv4();
    const url = `http://localhost:3000/video/${uuid}/${divideURL(field1)}`;
    setGeneratedURL(url);
  };
  
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
                />
                <span></span>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <h5 style={{ color: 'white' }}>Optional fields: </h5>
                <div className="row">
                  <div className="col">
                    <InputField 
                      value={field2}
                      onChange={handleField2Change}
                      placeholder="file"
                      name="ip: "
                    />
                    <span></span>
                  </div>
                  <div className="col">
                    <InputField 
                      value={field3}
                      onChange={handleField3Change}
                      placeholder="ip"
                      name="port: "
                    />
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <URLGenerateButton onClick={handleGenerateURL}/>
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


export default App
