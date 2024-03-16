// import { Modal } from "bootstrap";
import React from 'react';
import Modal from 'react-bootstrap/Modal'

class WarningModal extends React.Component {



    render() {

        return (
            <Modal className="modal" dialogClassName=" text-center" show={this.props.visible} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body className="modal-body">
                    <p className="modal-message">{this.props.message}</p>
                    <br></br>
                   
                    <button className="modal-close" type="button" onClick={this.props.onClose}>Close</button>
                </Modal.Body>
            </Modal>

        );

    }

}


export default WarningModal;