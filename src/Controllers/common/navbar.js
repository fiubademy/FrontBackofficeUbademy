import React from "react";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./navbar.css";

async function logout(){
	let info_response = await fetch("https://api-gateway-fiubademy.herokuapp.com/users/logout/"+localStorage.getItem("sessionToken"),
		{
			method:'DELETE'
		}
	);
	if(await info_response.status === 200 || await info_response.status === 498){
		localStorage.removeItem('sessionToken');
		window.location.reload(false);
	}
}

export default function NavigationBar() {
	return (
		<div className="fixed-top">
		<Navbar bg="color_custom_nav" expand="lg">
			<Navbar.Brand className="mx-3" href="/">
				<img src="/Ubademy_inverted.png" height="65px" alt="logo-ubademy-home"/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" style={{marginRight:'2rem'}}/>
			<Navbar.Collapse id="basic-navbar-nav">
			<Nav className="mr-auto">
				<NavDropdown
				className="mx-3"
				title="Usuarios"
				id="dropdown_usuarios"
				>
					<NavDropdown.Item href="/users" className="userItem">
						Administrar Usuarios
					</NavDropdown.Item>
					<NavDropdown.Item href="/users/metrics" className="userItem">
						Métricas de Usuarios
					</NavDropdown.Item>
				</NavDropdown>
				<NavDropdown
				className="mx-3"
				title="Cursos"
				id="dropdown_cursos"
				>
					<NavDropdown.Item href="/courses" className="courseItem">
						Administrar Cursos
					</NavDropdown.Item>
				</NavDropdown>
			</Nav>
			<Nav className="ms-auto">
				<Button id="button-logout" variant="danger" onClick = {logout}>Logout...</Button>
			</Nav>
			</Navbar.Collapse>
		</Navbar>
		</div>
	);
}