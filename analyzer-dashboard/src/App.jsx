import { useState } from 'react';
import './App.css'
// import DataTable from './components/DataTable/DataTable';
import URLGenerator from './components/URLGenerator/URLGenerator';

function App() {

  const [index, setIndex] = useState(''); 
  const [generatedURL, setGeneratedURL] = useState('');
  const [autoplay, setAutoplay] = useState(false);
  const [bypass, setBypass] = useState(false);

  return (
    <div>
      <a className="logo" href="https://www.qualabs.com/" target="_blank" rel="noreferrer">
        <img src="https://www.qualabs.com/packages/website/images/logos/qualabs.svg" alt="Logo" className="logo"/>
      </a>
      <div className="custom-row">
        <div className='col'>
          <div className="container-box">
            <URLGenerator setIndex={setIndex} index={index} 
              setAutoplay={setAutoplay} autoplay={autoplay} 
              setBypass={setBypass} bypass={bypass} 
              setGeneratedURL={setGeneratedURL}/>
          </div>
        </div>
        { generatedURL ? (
            <div className='col'>
              <div className="container-box">
                 {/* <DataTable index={index} /> */}
                <iframe src={`public/cmcd.html?autoplay=${autoplay}&url=${generatedURL}`}></iframe>
              </div>
            </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}


export default App
