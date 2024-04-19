import React from 'react';
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/fontawesome-free-solid';

class WarningModal extends React.Component {



    render() {
        return (
            <Modal dialogClassName="ErrorAlert text-center"
                show={this.props.visible}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                    
                    <FontAwesomeIcon icon={faExclamation} />
                 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    wordWrap: 'break-word',
                    paddingLeft: '2px',
                    paddingRight: '2px',
                    backgroundImage: 'none',
                    backgroundColor: "#fff"
                }}>
                    <h4>{this.props.title}</h4>
                    <p>{this.props.message}</p>
                    <button type="button" class="btn btn-secondary Cancel" onClick={this.props.onClose}>Close</button>
                </Modal.Body>
            </Modal >
        )
    }


}


export default WarningModal;