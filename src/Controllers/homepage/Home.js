import React from "react";
import DashboardHomeCard from "../common/cards.js";
import "./Home.css";

export default function Home() {
	return (
		<div className="container-fluid">
			<div className="d-flex justify-content-center"><img src='./Ubademy.png' className=" col-6 col-sm-6 col-md-3 col-lg-2 pt-5 mt-3 mb-5" alt="Logo-ubademy"/></div>
			<div id="card_container" className="d-flex row justify-content-around">
				<DashboardHomeCard
					codigo = "usuarios-card"
					titulo="Administracion de Usuarios"
					descripcion="Módulo para creación y administración de proyectos y tareas."
					src_imagen="./usuario.jpg"
					href={[["Usuarios", "./users"],["Transacciones", "/users/transactions"]]}
					className="pepe"
				/>
				<DashboardHomeCard
					codigo = "cursos-card"
					titulo="Administración de Cursos"
					descripcion="Módulo para visualización de Recursos y Carga de Horas."
					src_imagen="./courses.jpg"
					href={[["Cursos", "./courses"]]}
				/>
				<DashboardHomeCard
					codigo = "servicios-card"
					titulo="Administración de Servicios"
					descripcion="Modulo para visualizar y crear Tickets."
					src_imagen="./services.jpg"
					href={[["Servicios", "./services"]]}
				/>
			</div>
		</div>
		);
	}