import './DisplayedURL.css'

function DisplayedURL({ generatedURL }) {
    // return <div>{generatedURL && <p className="url-text">Generated URL: {generatedURL}</p>}</div>;
    return (
        <div className="url-section">
            {/* <h3>Generated URL:</h3> */}
            <div className="card">
                <div className="card-body">
                    <p>{generatedURL}</p>
                </div>
            </div>
        </div>
    )
}
  
export default DisplayedURL;