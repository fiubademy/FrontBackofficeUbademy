import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import React from 'react'
import "./Metrics.css"

export default class Metrics extends React.Component {
    constructor(props){
        super(props);
        this.state={
            quantityDays: 30
        };
        this.generarMetricas = this.generarMetricas.bind(this);
    }

    generarMetricas(){
        let numDays = document.getElementById("quantityDays").value;
        if (numDays <= 0){
            document.getElementById("quantityDays").style.border = "2px solid red";
        }
        else{
            document.getElementById("quantityDays").style.border = "2px solid gray";
            this.setState({quantityDays: numDays});
        }
        console.log (this.state);
    }

    render(){
        return(
            <div className="container-fluid">
                <h1 id="metricsTitle" className="mt-4 pt-5">Métricas de Usuarios</h1>
                <div className={"mt-5 mb-4 d-flex justify-content-center"} style= {{overflow:"hidden"}}>
                    <label style={{float:"left", marginRight:"20px"}}>Cantidad de días hacia atrás: </label>
                    <p style={{float:"left", width:"80px"}}>
                        <input id="quantityDays" type="number" style={{boxSizing:"border-box", width:"100%"}}></input>
                    </p>
                    <Button style={{float:"left", height:"30px", width:"125px", fontSize:"12px", marginLeft:"1.5rem"}}
                        onClick={this.generarMetricas}>Generar Métricas</Button>
                </div>
                <div>
                    <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Métricas de Login</Accordion.Header>
                            <Accordion.Body className="d-flex justify-content-around row">
                                <div className="col-12 col-lg-5">
                                    <img src={"https://api-gateway-fiubademy.herokuapp.com/users/metrics/logins/"+this.state.quantityDays+"/pie"} 
                                        width="500" alt="Pie Login Metrics"/>
                                </div>
                                
                                <div className="col-12 col-lg-5">
                                    <img src={"https://api-gateway-fiubademy.herokuapp.com/users/metrics/logins/"+this.state.quantityDays+"/linear"} 
                                        width="700" alt="Time Login Metrics"/>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Métricas de Registros</Accordion.Header>
                            <Accordion.Body className="d-flex justify-content-around row">
                                <div className="col-12 col-lg-5">
                                    <img src={"https://api-gateway-fiubademy.herokuapp.com/users/metrics/registers/"+this.state.quantityDays+"/pie"} 
                                        width="500" alt="Pie Register Metrics"/>
                                </div>
                                <div className="col-12 col-lg-5">
                                    <img src={"https://api-gateway-fiubademy.herokuapp.com/users/metrics/registers/"+this.state.quantityDays+"/linear"}
                                        width="700" alt="Time Register Metrics"/>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Métricas de Bloqueos</Accordion.Header>
                            <Accordion.Body className = "d-flex justify-content-center row">
                                <div className="col-12 d-flex justify-content-center">
                                    <img src={"https://api-gateway-fiubademy.herokuapp.com/users/metrics/blocks/"+this.state.quantityDays}
                                        width="700" alt="Block Metrics"/>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Métricas de Recuperos de contraseña</Accordion.Header>
                            <Accordion.Body classname = "d-flex justify-content-center row">
                                <div className="col-12 d-flex justify-content-center">
                                    <img src={"https://api-gateway-fiubademy.herokuapp.com/users/metrics/password_recoveries/"+this.state.quantityDays}
                                        width="700" alt="Password Recovery Metrics"/>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        )
    }
}