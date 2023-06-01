import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [textInputs, setTextInputs] = useState(['', '', '', '']);

  const handleInputChange = (event, index) => {
    const updatedInputs = [...textInputs];
    updatedInputs[index] = event.target.value;
    setTextInputs(updatedInputs);
  };
  
  return (
    <div>
      <h1>Mi Aplicación React</h1>
      <div>
        <input
          type="text"
          value={textInputs[0]}
          onChange={(e) => handleInputChange(e, 0)}
          className="input-field"
        />
        <span>/</span>
        <input
          type="text"
          value={textInputs[1]}
          onChange={(e) => handleInputChange(e, 1)}
          className="input-field"
        />
        <span>/</span>
        <input
          type="text"
          value={textInputs[2]}
          onChange={(e) => handleInputChange(e, 2)}
          className="input-field"
        />
        <span>/</span>
        <input
          type="text"
          value={textInputs[3]}
          onChange={(e) => handleInputChange(e, 3)}
          className="input-field"
        />
      </div>
      <p>{textInputs.join('/')}</p>
    </div>
  );

}


export default App
