import './DisplayedURL.css';

function DisplayedURL({ generatedURL }) {
    return (
        <div className="url-section">
            <div className="card">
                <div className="card-body">
                    <p>{generatedURL}</p>
                </div>
            </div>
        </div>
    )
}
  
export default DisplayedURL;