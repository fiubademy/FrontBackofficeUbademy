import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { withRouter } from 'react-router';
import './Login.css';
import Spinner from 'react-bootstrap/Spinner';


class Login extends React.Component{

    constructor(props){
        super(props);
        this.render = this.render.bind(this);
        this.state = {
            showModal: false,
            errorLogin: null,
            loading: false
        }
        this.createSession = this.createSession.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
    }

    componentDidMount(){
        this.props.history.push('/');
    }

    handleCloseModal(){
        this.setState({showModal: false});
    }

    handleShowModal(){
        this.setState({showModal: true});
    }

    async createSession(){
        this.setState({loading: true});
        let emailValue = document.getElementById("loginEmail").value;
        let passwordValue = document.getElementById("loginPassword").value;
        let info;
        let info_response = await fetch("https://api-gateway-fiubademy.herokuapp.com/users/loginAdmin",
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
                body: JSON.stringify({email: emailValue, password: passwordValue})
            }
        );

        info = await info_response.json();
        if(await info_response.status === 202){
            localStorage.setItem("sessionToken", info);
            window.location.reload(false);
        }else{
            this.setState({errorLogin: info, loading: false});
            this.handleShowModal();
        }
    }

    render(){
        return(
            <div className={"container-fluid d-flex justify-content-center"}>
                <div id="container-login" className={" col-12 col-lg-6"}>
                    <h2 id="login-title">Login Como Administrador</h2>
                    <p className={"d-flex justify-content-center mt-4 mb-4"}><img src="/Ubademy_inverted.png" width="200px" alt="Ubademy Inverted Logo"></img></p>
                    <p><input id="loginEmail" type="text" placeholder="Admin's email..." className={"input-login mt-3"}></input></p>
                    <p><input id="loginPassword" type="password" placeholder="Password..." className={"input-login mt-3"}></input></p>
                    <p className={"d-flex justify-content-center"}>
                        {this.state.loading ? 
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        :
                            <Button id="button-login" className={"btn-primary"} onClick={this.createSession}>Log In</Button>
                        }
                        
                    </p>
                </div>
                <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error en Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.state.errorLogin}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleCloseModal}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Login);