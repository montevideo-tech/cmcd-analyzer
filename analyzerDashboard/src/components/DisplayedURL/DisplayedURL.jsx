import './DisplayedURL.css'
import Card from 'react-bootstrap/Card';

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
    // return (
    //     <Card className="mt-4">
    //         <Card.Body>
    //             {/* <Card.Title>Generated URL</Card.Title> */}
    //             <div className="url-container">
    //                 <pre className="generated-url">{generatedURL}</pre>
    //             </div>
    //         </Card.Body>
    //     </Card>
    // )
}
  
export default DisplayedURL;