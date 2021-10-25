import React from "react";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./navbar.css";

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
				<NavDropdown.Item href="/users">
					Administrar Usuarios
				</NavDropdown.Item>
				<NavDropdown.Item href="/users/transactions">
					Listado de transacciones
				</NavDropdown.Item>
				</NavDropdown>
				<NavDropdown
				className="mx-3"
				title="Cursos"
				id="dropdown_cursos"
				>
				<NavDropdown.Item href="/courses">
					Administrar Cursos
				</NavDropdown.Item>
				</NavDropdown>
				<NavDropdown
				className="mx-3"
				title="Servicios"
				id="dropdown_servicios"
				>
				<NavDropdown.Item href="/services">
					Administrar Servicios
				</NavDropdown.Item>
				</NavDropdown>
			</Nav>
			</Navbar.Collapse>
		</Navbar>
		</div>
	);
}