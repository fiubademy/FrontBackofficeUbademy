import React from "react";
import './Profile.css';
import Table from 'react-bootstrap/Table';

export default class Profile extends React.Component{

    constructor(props){
        super(props);
        let query = new URLSearchParams(this.props.location.search);
        this.user_id = query.get("uid");
        this.state = {
            courses: [],
            maxPages: 1,
            page: 1,
            email: null,
            username: null,
            subscription: null,
            location: null
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
        this.fetchCourses = this.fetchCourses.bind(this);
        this.getTableHTMLForCoursesFromAPI = this.getTableHTMLForCoursesFromAPI.bind(this);
        this.subtractPage = this.subtractPage.bind(this);
        this.sumPage = this.sumPage.bind(this);
    }
    
    componentDidMount(){
        this.fetchUser();
        this.getTableHTMLForCoursesFromAPI();
    }
    // dou ahora no rompe mas. 
    async fetchUser(){
        let user_data;
        let info_response = await fetch(
            "https://api-gateway-fiubademy.herokuapp.com/users/ID/"+this.user_id,
            {headers:{'accept': 'application/json'}}
        );
        if(info_response.status === 200){
            user_data = await info_response.json()
            this.setState({"username": user_data.username});
            document.getElementById('username').innerHTML = this.state.username;
            this.setState ({email: user_data.email});
            document.getElementById('email').innerHTML = this.state.email;
            this.setState({subscription: user_data.sub_level});
            if (this.state.subscription === 0){
                this.setState({subscription: 'Free'});
            }else if (this.state.subscription === 1){
                this.setState({subscription: 'Standard'});
            }else if (this.state.subscription === 2){
                this.setState({subscription: 'Premium'});
            }else{
                this.setState({subscription: 'Desconocida'});
            }
            let latitude = user_data.latitude;
            if (!latitude){
                latitude = 'Desconocida';
            }
            let longitude = user_data.longitude;
            if (!longitude){
                longitude = 'Desconocida';
            }
            document.getElementById('sub').innerHTML = this.state.subscription;
            this.setState({location: '(Latitud: ' + latitude + ' ; Longitud: ' + longitude + ')'});
            document.getElementById('location').innerHTML = this.state.location;
            this.setState({usertype: user_data.user_type});
            document.getElementById('usertype').innerHTML = this.state.usertype;
        }
    }


    async fetchCourses(){
        let courses_data;
        let info_response_courses = await fetch(
            "https://api-gateway-fiubademy.herokuapp.com/courses/student/"+this.user_id+"/"+this.state.page+"?sessionToken="+localStorage.getItem("sessionToken"),
            {headers:{'accept': 'application/json'}}
        );
        courses_data = await info_response_courses;
        if (courses_data.status === 200){
            courses_data = await courses_data.json();
            this.setState({maxPages: courses_data['num_pages']});
            if(courses_data['num_pages'] <= 0){
                this.setState({maxPages: 1});
            }
            return courses_data['content'];
        }else{
            this.setState({maxPages: 1});
            return 'ERROR';
        }
    }

    async subtractPage(){
        alert("subbing page");
        if(this.state.page-1 < 1){
            await this.setState({page:this.state.maxPages});
        }else{
            await this.setState({page:this.state.page-1});
        }
        this.fetchCourses();

    }

    async sumPage(){
        alert("summing page");
        if(this.state.page+1 > this.state.maxPages){
            await this.setState({page:1})
        }else{
            await this.setState({page:this.state.page+1});
        }
        this.fetchCourses();
    }
    
    async getTableHTMLForCoursesFromAPI() {
        let coursesList = [];
        let courses = await this.fetchCourses();
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
        if (this.state.username === null){
            return(
                <div className="container-fluid mt-5 pt-4 row d-flex justify-content-center">
                    <div className="container-info row mt-3">
                        <h2 className="col-12 title-info">Usuario con ID: {this.user_id}, no fue encontrado</h2>
                    </div>
                </div>
            );
        }
        return(
        <div className="container-fluid mt-5 pt-4 row d-flex justify-content-center">
            <div className="container-info row mt-3">
                    <h2 className="col-12 title-info">Información Personal</h2>
                    <div className='col-lg-1 col-0'></div><div className="col-12 col-lg-5 field-info" style={{overflow:'hidden'}}><h4 style={{float:'left'}}>Nombre de usuario:</h4><h5 id='username' style={{float:'left', margin: '5px 0 0 10px'}}>{this.state.username}</h5></div>
                    <div className="col-12 col-lg-5 field-info" style={{overflow:'hidden'}}><h4 style={{float:'left'}}>Nivel de suscripción:</h4><h5 id='sub' style={{float:'left', margin: '5px 0 0 10px'}}>{this.state.subscription}</h5></div>
                    <div className='col-lg-1 col-0'></div><div className="col-12 col-lg-5 field-info" style={{overflow:'hidden'}}><h4 style={{float:'left'}}>ID:</h4><h5 style={{float:'left', margin: '5px 0 0 10px'}}>{this.user_id}</h5></div>
                    <div className="col-12 col-lg-5 field-info"><h4 style={{float:'left'}}>Ubicación:</h4><h5 id='location' style={{float:'left', margin: '2px 0 0 10px'}}>{this.state.location}</h5></div>
                    <div className='col-lg-1 col-0'></div><div className="col-12 col-lg-5 field-info" style={{overflow:'hidden'}}><h4 style={{float:'left'}}>Email:</h4><h5 id='email' style={{float:'left', margin: '5px 0 0 10px'}}>{this.state.email}</h5></div>
                    <div className="col-12 col-lg-5 field-info"><h4 style={{float:'left'}}>Tipo de Usuario:</h4><h5 id='usertype' style={{float:'left', margin: '2px 0 0 10px'}}>{this.state.usertype}</h5></div>
            </div>
            
            {this.state.courses.length > 0 ?
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
                <div id="tablePaginator">
                        <button style={{float:'left'} } id='buttonPageLeft' onClick={this.subtractPage}>&laquo; Anterior</button>
                        <div style={{float:'left'}} id='currentPage'>{this.state.page}/{this.state.maxPages}</div>
                        <button style={{float:'left'}} id='buttonPageRight' onClick={this.sumPage}>Siguiente &raquo;</button>
                </div>
            </div>: null}
        </div>
        );
    }
}