// import { Modal } from "bootstrap";
import React from 'react';
import Modal from 'react-bootstrap/Modal'
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import CheckCircle from '@material-ui/icons/CheckCircle';
class AlertModal extends React.Component {



    render() {

        return (
            <Modal className="InfoSuccess text-center" dialogClassName="InfoSuccess text-center" show={this.props.visible} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>

                <Modal.Body style={{

                    wordWrap: 'break-word',
                    padding: '24px',

                    backgroundImage: 'none',
                    backgroundColor: "#ec5353"


                }} className="modal-body">
                    <p style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }} className="modal-message">{this.props.message}</p>
                    <br></br>

                    <button class="btn btn-secondary Submit mt-3" type="button" onClick={this.props.onClose}>Close</button>
                </Modal.Body>
            </Modal>

        );

    }

}

export default AlertModal;