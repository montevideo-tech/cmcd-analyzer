import React from 'react';
import '../App.css'

function URLGenerateButton({ onClick }) {
  return <button className="custom-button" onClick={onClick}>Generate URL</button>;
}

export default URLGenerateButton;