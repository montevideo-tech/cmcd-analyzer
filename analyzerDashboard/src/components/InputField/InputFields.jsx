import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './InputFields.css'

function InputField({ value, onChange, placeholder, name, error, message }) {
  // return <input type="text" value={value} onChange={onChange} placeholder={placeholder} />;
  return (
    <InputGroup className="mb-3" htmlFor="formBasic">
        <InputGroup.Text className="custom-input-group-text" id="basic-addon1" >{name}</InputGroup.Text>
        <Form.Control
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={placeholder}
          aria-describedby="basic-addon1"
          isInvalid={error}
        />
        {error && (
          <Form.Control.Feedback type="invalid">
            {message}
          </Form.Control.Feedback>
        )}
    </InputGroup>
  )
}

export default InputField;