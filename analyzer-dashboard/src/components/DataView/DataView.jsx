import Offcanvas from 'react-bootstrap/Offcanvas';
import './DataView.css'


const DataView = ({show, setShow, data}) => {

  const handleClose = () => setShow(false);

  const renderValue = (value, prefix = '') => {
    console.log(value);
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }
    if (typeof value === 'object') {
      return renderKeyValuePairs(value, prefix);
    }
    return value;
  };

  const renderKeyValuePairs = (obj, prefix = '') => {
    return Object.entries(obj).map(([key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      return (
        <div key={fullKey} className='mb-2'>
          <strong>{fullKey}</strong>
          <div className='mx-3 data-value'>{renderValue(value, fullKey)}</div>
        </div>
      );
    });
  };

  const renderTopLevel = () => {
    if (data === null) {
      return <div>No data available.</div>;
    }
    return renderKeyValuePairs(data);
  };

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Request Data
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            {renderTopLevel(data)}
          </div>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default DataView