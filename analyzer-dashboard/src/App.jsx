import { useState } from 'react';
import './App.css'
import DataTable from './components/DataTable/DataTable';
import URLGenerator from './components/URLGenerator/URLGenerator';

function App() {

  const [index, setIndex] = useState(''); 
  
  return (
    <div>
      <a className="logo" href="https://montevideotech.dev/" target="_blank" rel="noreferrer">
        <img src="https://montevideotech.dev/wp-content/uploads/2020/09/mvd-tech-1.png" alt="Logo" className="logo"/>
      </a>
      <div className="custom-row">
        <div className='col'>
          <div className="container-box">
            <URLGenerator setIndex={setIndex} index={index}/>
          </div>
        </div>
        { index ? (
            <div className='col'>
              <div className="container-box">
                <DataTable index={index} />
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
