import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function BlockModal(user) {
    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState(user.user.user_id);
    const [username, setUsername] = useState(user.user.username);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const block = ()=>{
      //Should block de user with this userId from the platform.
      console.log(userId);
      alert("This function would block user with id: " + userId + " - and username: " + username + ", But it is Yet not implemented. API not currently available to block users...")
      return null;
    }

    const blockUser = () => {
        block();
        handleClose();
    }
  
    return (
      <>
        <Button onClick={handleShow}>
          Block
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">¿Block {username}?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure that you want to block {username}?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={blockUser}>
              Block
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }