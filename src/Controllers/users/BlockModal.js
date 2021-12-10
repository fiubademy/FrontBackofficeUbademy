import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function BlockModal(user) {
    const [show, setShow] = useState(false);
    const userId = user.user.user_id;
    const username = user.user.username;
    const isBlocked = user.user.is_blocked;
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const toggleBlock = async ()=>{
      let info_response = await fetch("https://api-gateway-fiubademy.herokuapp.com/users/"+userId+"/toggleBlock",
            {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
                body: JSON.stringify({"admin_ses_token": localStorage.getItem('sessionToken')})
            }
        );
        if(await info_response.status === 202){
            alert(username + " fue correctamente " + (isBlocked==='Y'? "desbloqueado.":"bloqueado."));
			window.location.reload(false);
        }else if (await info_response.status === 498){
            localStorage.removeItem("sessionToken");
            window.location.reload(false);
        }
      
      return null;
    }

    const toggleBlockUser = () => {
        toggleBlock();
        handleClose();
    }
  
    return (
      <>
        <Button onClick={handleShow}>
			    {isBlocked==='Y'? "Desbloquear" : "Bloquear"}
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">¿{isBlocked==='Y'? "Desbloquear a" : "Bloquear a"} {username}?</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Est&aacute;s seguro de {isBlocked==='Y'? "desbloquear a" : "bloquear a"} {username}?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={toggleBlockUser} style={{borderRadius: 0}}>
				      {isBlocked==='Y'? "Desbloquear" : "Bloquear"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }