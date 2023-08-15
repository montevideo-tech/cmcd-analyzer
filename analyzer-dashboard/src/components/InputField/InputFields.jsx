import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './InputFields.css'

function InputField({ value, onChange, placeholder, name, error, message }) {
  return (
    <InputGroup className="mb-3" htmlFor="formBasic">
        <InputGroup.Text style={{color:'white', backgroundColor: '#4dbaac'}} className="custom-input-group-text">{name}</InputGroup.Text>
        <Form.Control
          style={{color:'black', backgroundColor: 'white'}}
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