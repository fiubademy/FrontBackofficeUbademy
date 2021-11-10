import React from "react";
import './Profile.css';
import Table from 'react-bootstrap/Table';

export default class Profile extends React.Component{

    constructor(props){
        super(props);
        let query = new URLSearchParams(this.props.location.search);
        this.user_id = query.get("uid");
        this.state = {
            courses: []
        };
        this.email = null;
        this.username = null;
        this.subscription = null;
        this.location = null;
        this.componentDidMount = this.componentDidMount.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
        this.fetchCourses = this.fetchCourses.bind(this);
        this.getTableHTMLForCoursesFromAPI = this.getTableHTMLForCoursesFromAPI.bind(this);
    }
    
    componentDidMount(){
        this.fetchUser();
        this.getTableHTMLForCoursesFromAPI();
    }
    // dou ahora no rompe mas. 
    async fetchUser(){
        let user_data;
        let info_response = await fetch("https://api-gateway-fiubademy.herokuapp.com/users/ID/"+this.user_id); //Despues habría que integrar lo de la pagina y la API Gateway.
        user_data = await info_response.json();
        this.username = user_data.username;
        document.getElementById('username').innerHTML = this.username;
        this.email = user_data.email;
        document.getElementById('email').innerHTML = this.email;
        this.subscription = user_data.sub_level;
        if (this.subscription === 0){
            this.subscription = 'Free';
        }else if (this.subscription === 1){
            this.subscription = 'Standard';
        }else if (this.subscription === 2){
            this.subscription = 'Premium';
        }else{
            this.subscription = 'Desconocida';
        }
        let latitude = user_data.latitude;
        if (!latitude){
            latitude = 'Desconocida';
        }
        let longitude = user_data.longitude;
        if (!longitude){
            longitude = 'Desconocida';
        }
        document.getElementById('sub').innerHTML = this.subscription;
        this.location = '(Latitud: ' + latitude + ' ; Longitud: ' + longitude + ')';
        document.getElementById('location').innerHTML = this.location;
        this.usertype = user_data.user_type;
        document.getElementById('usertype').innerHTML = this.usertype;
    }


    async fetchCourses(){
        let courses_data;
        let info_response_courses = await fetch("https://api-cursos-fiubademy.herokuapp.com/courses/student/"+this.user_id);
        courses_data = await info_response_courses;
        console.log("status code: " + courses_data.status);
        if (courses_data.status === 200){
            return courses_data.json();
        }else{
            return 'ERROR';
        }
    }
    
    async getTableHTMLForCoursesFromAPI() {
        let coursesList = [];
        let courses = await this.fetchCourses();
        console.log(courses);
        if (courses !== 'ERROR'){
            courses.map((course) => {
                coursesList.push(
                    {
                        course_id: course.id,
                        courseName: course.name
                    }
                );
                return null;
            }); 
            this.setState({courses: coursesList});
        }else{
            this.setState({courses: coursesList});
        }
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
                    <div className='col-lg-1 col-0'></div><div className="col-12 col-lg-5 field-info" style={{overflow:'hidden'}}><h4 style={{float:'left'}}>Email:</h4><h5 id='email' style={{float:'left', margin: '5px 0 0 10px'}}>{this.email}</h5></div>
                    <div className="col-12 col-lg-5 field-info"><h4 style={{float:'left'}}>Tipo de Usuario:</h4><h5 id='usertype' style={{float:'left', margin: '2px 0 0 10px'}}>{this.usertype}</h5></div>
            </div>
            <div className="row container-info">
                <h2 className = "col-12 title-info">Cursos en los que está inscripto</h2>
                <div id="tableDivCourses" className="col-12 col-lg-10 container-fluid">
                    <Table id="coursesTable" responsive striped>
                        <thead>
                            <tr className = "centered_content">
                            <th> ID del Curso</th> 
                            <th> Nombre del curso</th> 
                            </tr> 
                        </thead> 
                        <tbody>
                            {this.state.courses.map((course, index) => {
                                
                                return (
                                <tr key={index} className = "centered_content">
                                    <td key={index+ course.course_id}>{course.course_id}</td>
                                    <td key={index+ course.courseName}>{course.courseName}</td>
                                    
                                </tr>);
                            })}
                        </tbody> 
                    </Table> 
                </div>
            </div>
        </div>
        );
    }
}