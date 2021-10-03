import React from 'react'
import { Card, Button } from 'react-bootstrap';

import "./cards.css";

export default function DashboardHomeCard({titulo, descripcion, src_imagen, href}){
    return(
        <Card style={{width: '20rem', float:'left', backgroundColor:'#336e7b', borderRadius:'20px', boxShadow:'10px 15px 15px 5px #9E9E9E'}} className=" col-12 col-lg-3 mt-45 ml-1 mb-4 mr-1">
            <Card.Img variant="top" src={src_imagen} className="mt-3 border border-light border-3 rounded" style={{height: '150px'}}/>
            <Card.Body>
                <Card.Title  style={{color: 'white', font_weight:'bold'}}>{titulo}</Card.Title>
                <Card.Text style={{color: 'white'}} className="mt-4" >
                {descripcion}
                </Card.Text >
                {href.map(function(links){
                    return (<div className = "mt-2" style={{textAlign:'center'}}><Button variant="outline-dark" href={links[1]} 
                            style={{}} className="cardButton">{links[0]}</Button></div>); 
                })}
            </Card.Body>
        </Card>
    );
}