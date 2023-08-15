import './DisplayedURL.css';

function DisplayedURL({ generatedURL }) {
    return (
        <div className="card">
            <p className='card-text'>{generatedURL}</p>
        </div>
    )
}
  
export default DisplayedURL;