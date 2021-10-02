import React from "react";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./navbar.css";

export default function NavigationBar() {
  return (
    <div className="fixed-top">
      <Navbar bg="color_custom_nav" expand="lg">
        <Navbar.Brand className="mx-3" href="/">
          UBADEMY
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown
              className="mx-3"
              title="Usuarios"
              id="dropdown_usuarios"
            >
              <NavDropdown.Item href="/usuarios">
                Administrar Usuarios
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              className="mx-3"
              title="Cursos"
              id="dropdown_cursos"
            >
              <NavDropdown.Item href="/cursos">
                Administrar Cursos
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              className="mx-3"
              title="Servicios"
              id="dropdown_servicios"
            >
              <NavDropdown.Item href="/cursos">
                Administrar Servicios
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}