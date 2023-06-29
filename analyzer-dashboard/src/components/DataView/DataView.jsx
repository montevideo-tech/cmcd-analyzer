import Offcanvas from 'react-bootstrap/Offcanvas';
import './DataView.css'


const DataView = ({show, setShow, data}) => {

  const handleClose = () => setShow(false);

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Request Data
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default DataView