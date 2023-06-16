import './App.css'
import DataTable from './components/DataTable/DataTable';
import URLGenerator from './components/URLGenerator/URLGenerator';

function App() {
  return (
    <div>
      <img src="https://montevideotech.dev/wp-content/uploads/2020/09/mvd-tech-1.png" alt="Logo" className="logo"/>
      <URLGenerator/>
      {/* <DataTable index={'cmcd-1'}/> */}
    </div>
  );
}


export default App
