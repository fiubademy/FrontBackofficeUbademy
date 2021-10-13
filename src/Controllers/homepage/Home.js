import React from "react";
import DashboardHomeCard from "../common/cards.js";

export default function Home() {
    return (
      <div className="container-fluid">
        <h1 style={{textAlign:'center', textDecoration:'underline'}} className="pt-5 mt-4 mb-5">UBADEMY</h1>
        <div id="card_container" className="row justify-content-around">
          <DashboardHomeCard
            titulo="Administracion de Usuarios"
            descripcion="Módulo para creación y administración de proyectos y tareas."
            src_imagen="./usuario.jpg"
            href={[["Usuarios", "./users"],["Transacciones", "/users/transactions"]]}
          />
          <DashboardHomeCard
            titulo="Administración de Cursos"
            descripcion="Módulo para visualización de Recursos y Carga de Horas."
            src_imagen="./courses.jpg"
            href={[["Cursos", "./courses"]]}
          />
          <DashboardHomeCard
            titulo="Administración de Servicios"
            descripcion="Modulo para visualizar y crear Tickets."
            src_imagen="./services.jpg"
            href={[["Servicios", "./services"]]}
          />
        </div>
      </div>
    );
  }