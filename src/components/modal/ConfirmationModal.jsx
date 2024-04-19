// import { Modal } from "bootstrap";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/fontawesome-free-solid';


export default class ConfirmationModal extends React.Component {
  closeModal = (value) => {
    this.props.onCloseYesOrNoModal(value);
  };

  render() {
    return (
      <Modal
        dialogClassName="ErrorAlert text-center"
        show={this.props.visible}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="justify-content-center">
          <Modal.Title id="contained-modal-title-vcenter">
          <FontAwesomeIcon icon={faInfo} />


          </Modal.Title>
        </Modal.Header>
        <Modal.Body
         style={{
          wordWrap: 'break-word',
          paddingLeft: '2px',
          paddingRight: '2px',
          backgroundImage: 'none',
          backgroundColor: "#fff"
      }}
        >
          <h4 style={{ marginBottom: 8 }}>
          {this.props.title}
          </h4>
          <div dangerouslySetInnerHTML={{ __html: this.props.message }} />
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
            onClick={() => {
              this.props.onClose(true);
            }}
            style={{ marginRight: "10px" }}
          >
            <i className="bx bx-check-double font-size-16 align-middle me-2"></i>{" "}
            Continue
          </button>
          <button
            type="button"
            className="btn btn-danger waves-effect waves-light"
            onClick={() => {
              this.props.onClose(false);
            }}
          >
            <i className="bx bx-smile font-size-16 align-middle me-2"></i> Cancel
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
