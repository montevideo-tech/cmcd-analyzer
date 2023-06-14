import React from 'react';
import '../../App.css'

function URLGenerateButton({ onClick, name }) {
  return <button className="custom-button" onClick={onClick}>{name}</button>;
}

export default URLGenerateButton;