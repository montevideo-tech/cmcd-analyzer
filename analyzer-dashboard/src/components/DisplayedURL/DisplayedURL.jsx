import './DisplayedURL.css';

function DisplayedURL({ generatedURL }) {
    return (
        <div className="card">
            <p>{generatedURL}</p>
        </div>
    )
}
  
export default DisplayedURL;