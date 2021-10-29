import React from "react";
import './Profile.css';


export default class Profile extends React.Component{

    constructor(props){
        super(props);
        let query = new URLSearchParams(this.props.location.search);
        this.user_id = query.get("uid");
        this.email = null;
        this.username = null;
        this.subscription = null;
        this.location = null;
        this.componentDidMount = this.componentDidMount.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
    }

    async fetchUser(){
        let datos_usuario;
        let info_response = await fetch("https://api-usuarios-fiubademy.herokuapp.com/users/"+this.user_id); //Despues habría que integrar lo de la pagina y la API Gateway.
        datos_usuario = await info_response.json();
        this.username = datos_usuario.username;
        document.getElementById('username').innerHTML = this.username;
        this.email = datos_usuario.email;
        document.getElementById('email').innerHTML = this.email;
        this.subscription = 'Empty';
        document.getElementById('sub').innerHTML = this.subscription;
        this.location = 'Empty';
        document.getElementById('location').innerHTML = this.location;
    }

    componentDidMount(){
        this.fetchUser();
    }


    



    render(){
        return(
        <div className="container-fluid mt-5 pt-4 row d-flex justify-content-center">
            <div className="container-info row mt-3">
                    <h2 className="col-12 title-info">Información Personal</h2>
                    <div className='col-lg-1 col-0'></div><div className="col-12 col-lg-5 field-info" style={{overflow:'hidden'}}><h4 style={{float:'left'}}>Nombre de usuario:</h4><h5 id='username' style={{float:'left', margin: '5px 0 0 10px'}}>{this.username}</h5></div>
                    <div className="col-12 col-lg-5 field-info" style={{overflow:'hidden'}}><h4 style={{float:'left'}}>Nivel de suscripción:</h4><h5 id='sub' style={{float:'left', margin: '5px 0 0 10px'}}>{this.subscription}</h5></div>
                    <div className='col-lg-1 col-0'></div><div className="col-12 col-lg-5 field-info" style={{overflow:'hidden'}}><h4 style={{float:'left'}}>ID:</h4><h5 style={{float:'left', margin: '5px 0 0 10px'}}>{this.user_id}</h5></div>
                    <div className="col-12 col-lg-5 field-info"><h4 style={{float:'left'}}>Ubicación:</h4><h5 id='location' style={{float:'left', margin: '2px 0 0 10px'}}>{this.location}</h5></div>
                    <div className='col-lg-1 col-0'></div><div id="email_div" className="col-12 col-lg-10 field-info"><h4 style={{float:'left'}}>Email:</h4><h5 id='email' style={{float:'left', margin: '5px 0 0 10px'}}>{this.email}</h5></div>
            </div>
            <div className="row container-info">
                    <h2 className = "col-12 title-info">Cursos en los que está inscripto</h2>
                    <div>ACA LOS CURSOS</div>
            </div>
        </div>
        );
    }
}