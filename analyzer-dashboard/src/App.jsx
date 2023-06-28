import './App.css'
import DataTable from './components/DataTable/DataTable';
import URLGenerator from './components/URLGenerator/URLGenerator';


function App() {
  return (
    <div>
      <img src="https://montevideotech.dev/wp-content/uploads/2020/09/mvd-tech-1.png" alt="Logo" className="logo"/>
      <div className="row">
        <div className="container-box">
          <div className='col'>
            <URLGenerator/>
          </div>
        </div>
        <div className="container-box">
          <div className='col'>
            <DataTable/>
          </div>
        </div>
      </div>
    </div>
  );
}


export default App
