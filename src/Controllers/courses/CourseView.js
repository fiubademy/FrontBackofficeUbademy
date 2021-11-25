import React from "react"
import "./CourseView.css"

export default class CourseView extends React.Component{

    constructor(props){
        super(props);
        let query = new URLSearchParams(this.props.location.search);
        this.course_id = query.get("course_id");
        this.state = {courseInfo: {name: null, id: null, ownerId:null, description: null, sub_level:null, latitude:null, longitude:null}};
        this.fetchCourse = this.fetchCourse.bind(this);
    }

    async fetchCourse(){
        let url = "https://api-cursos-fiubademy.herokuapp.com/courses/"+ this.course_id;
        let info_response = await fetch(url);
        if(await info_response.status === 200){
            let info = await info_response.json()
            this.setState({courseInfo: info});     
        }else{
            this.setState({courseInfo: null});
        }
    }

    componentDidMount(){
        this.fetchCourse();
    }

    render(){
        return(
            <div className="container-fluid mt-5 pt-4 row d-flex justify-content-center">
                <div className="container-info-courses row mt-3">
                        <h2 className="col-12 title-info-course">Información Del Curso</h2>
                        <div className='col-lg-1 col-0'></div><div className="col-12 col-lg-5 field-info" style={{overflow:'hidden'}}><h4 style={{float:'left'}}>Nombre:</h4><h5 id='username' style={{float:'left', margin: '5px 0 0 10px'}}>{this.state.courseInfo.name}</h5></div>
                        <div className="col-12 col-lg-5 field-info" style={{overflow:'hidden'}}><h4 style={{float:'left'}}>Nivel de suscripción:</h4><h5 id='sub' style={{float:'left', margin: '5px 0 0 10px'}}>{this.subscription}</h5></div>
                        <div className='col-lg-1 col-0'></div><div className="col-12 col-lg-5 field-info" style={{overflow:'hidden'}}><h4 style={{float:'left'}}>ID Curso:</h4><h5 style={{float:'left', margin: '5px 0 0 10px'}}>{this.user_id}</h5></div>
                        <div className="col-12 col-lg-5 field-info"><h4 style={{float:'left'}}>Ubicación:</h4><h5 id='location' style={{float:'left', margin: '2px 0 0 10px'}}>{this.location}</h5></div>
                        <div className='col-lg-1 col-0'></div><div className="col-12 col-lg-5 field-info" style={{overflow:'hidden'}}><h4 style={{float:'left'}}>ID Dueño:</h4><h5 id='email' style={{float:'left', margin: '5px 0 0 10px'}}>{this.email}</h5></div>
                        <div className="col-12 col-lg-5 field-info"><h4 style={{float:'left'}}>Tipo de Usuario:</h4><h5 id='usertype' style={{float:'left', margin: '2px 0 0 10px'}}>{this.usertype}</h5></div>
                </div>
            </div>
        );
    }
}