import { useState } from 'react';
import './URLGenerator.css';
import InputField from '../InputField/InputFields';
import DisplayedURL from '../DisplayedURL/DisplayedURL';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { IoMdCloseCircle } from 'react-icons/io'


function URLGenerator() {
  const [field1, setField1] = useState('');
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [generatedURL, setGeneratedURL] = useState('');
  const [field1Error, setField1Error] = useState(false);
  const [objList, setobjList] = useState([{key: '', val: ''}]);

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

  const listToJson = () => {
    const jsonData = objList.reduce((acc, field) => {
      acc[field.key] = field.val;
      return acc;
    }, {});
    delete jsonData[""];
    return jsonData;
  }

  const encodeToBase64 = (val) => {
    let obj = listToJson();
    obj.url = val;
    console.log(obj);
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
    const uuid = uuidv4().replaceAll('-','');
    const ipValue = ip ? ip : "localhost";
    const portValue = port ? port : "3000";
    if (!field1) {
      setField1Error(true);
    }
    else {
      const url = `http://${ipValue}:${portValue}/video/${uuid}/${divideURL(field1)}`;
      setGeneratedURL(url);
    }
  };

  const handleInpuChange = (e, index, field) => {
    const newData = [...objList];
    newData[index][field] = e.target.value;
    setobjList(newData);
  }


  const handleAddNewObject = () => {
    const newObj = [...objList, {key: '', val: ''}];
    setobjList(newObj);
  }

  const handleRemoveField = (index) => {
    const newFields = [...objList];
    newFields.splice(index, 1);
    setobjList(newFields);
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
                  error={field1Error}
                  message='Please provide a valid video URL.'
                />
                <span></span>
              </div>
            </div>
            <hr className="divider" />
            <div className='row'>
              <div className='col'>
                <div className="row">
                  <div className="col">
                    <InputField 
                      value={ip}
                      onChange={handleIpChange}
                      placeholder="ip"
                      name="IP: "
                    />
                    <span></span>
                  </div>
                  <div className="col">
                    <InputField 
                      value={port}
                      onChange={handlePortChange}
                      placeholder="port"
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

            {objList.map((item, index) => (
              <div key={index}>
                <div className="row">
                  <div className="col-5">
                    <InputField 
                      value={item.key}
                      onChange={(e) => handleInpuChange(e, index, 'key')}
                      placeholder="key"
                      name="Key: "
                      message='Enter this field.'
                    />
                    <span></span>
                  </div>
                  <div className="col-5">
                    <InputField 
                      value={item.val}
                      onChange={(e) => handleInpuChange(e, index, 'val')}
                      placeholder="value"
                      name="Value: "
                      message='Enter this field.'
                    />
                    <span></span>
                  </div>
                  <div className="col-1 d-flex align-items-center justify-content-center">
                    <button className="remove-button" onClick={() => handleRemoveField(index)}>
                      <IoMdCloseCircle className="close-icon" size={24}/>
                    </button>
                  </div>
                </div>
              </div>
            ))}

                <div className='row'>
                  <div className='col'>
                    <button className="custom-button" onClick={handleAddNewObject}>Add new object</button>;
                  </div>
                </div>

            <hr className="divider" />
            <div className='row'>
              <div className='col'>
                <button className="custom-button" onClick={handleGenerateURL}>Generate URL</button>;
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
