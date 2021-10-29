import React from 'react'
import { Card, Button } from 'react-bootstrap';

import "./cards.css";

export default function DashboardHomeCard({titulo, descripcion, src_imagen, href, codigo}){
    return(
        <Card id={codigo} style={{width: '20rem', float:'left', borderRadius:'20px', boxShadow:'10px 15px 15px 5px #9E9E9E', margin:'0 10px'}} className=" col-12 col-lg-3 mt-45 ml-1 mb-4 mr-1">
            <Card.Img variant="top" src={src_imagen} className="mt-3 border border-light border-3 rounded" style={{height: '150px'}}/>
            <Card.Body>
                <Card.Title  style={{color: 'black', font_weight:'bold'}}>{titulo}</Card.Title>
                <Card.Text style={{color: 'black'}} className="mt-4" >
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