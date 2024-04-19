import React from 'react';
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/fontawesome-free-solid';


export default class InfoSuccess extends React.Component {

    render() {
        return (
            <Modal dialogClassName="InfoSuccess text-center"
                show={this.props.visible}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    wordWrap: 'break-word',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    backgroundImage: 'none',
                    backgroundColor: "#fff"
                }}>
                    <h4>{this.props.title}</h4>
                    <p> {this.props.message}</p>
                    <button type="button" class="btn btn-secondary Cancel" onClick={this.props.onClose}>Close</button>
                </Modal.Body>
            </Modal >
        )
    }


}