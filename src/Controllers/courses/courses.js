import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import "./Courses.css";




export default class Courses extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            maxPages: 1,
            page: 1,
            courses: [],
            nameFilter: '',
            ownerFilter: '',
            descriptionFilter: '',
            sub_levelFilter: '',
            latitudeFilter: '',
            longitudeFilter: ''
        }
        this.getTableHTMLForCoursesFromAPI = this.getTableHTMLForCoursesFromAPI.bind(this);
        this.subtractPage = this.subtractPage.bind(this);
        this.sumPage = this.sumPage.bind(this);
        this.filterCourses = this.filterCourses.bind(this);
        this.completeURL = this.completeURL.bind(this);
    }

    completeURL(url){
        if (this.state.nameFilter !== ''){
            url = url + "&name="+this.state.nameFilter
        }
        if (this.state.descriptionFilter !== ''){
            url = url + "&description="+this.state.descriptionFilter
        }
        if (this.state.sub_levelFilter !== ''){
            url = url + "&sub_level="+this.state.sub_levelFilter
        }
        if (this.state.latitudeFilter !== ''){
            url = url + "&latitude="+this.state.latitudeFilter
        }
        if (this.state.longitudeFilter !== ''){
            url = url + "&longitude="+this.state.longitudeFilter
        }
        return url;
    }

    async fetchCourses(){
        let info;
        let url = "https://api-gateway-fiubademy.herokuapp.com/courses/all/"+ this.state.page + "?sessionToken="+localStorage.getItem("sessionToken");
        url = this.completeURL(url);
        let info_response = await fetch(url);
        if(await info_response.status === 200){
            info = await info_response.json();
            return info;
        }else{
            if(info_response.status === 498){
                localStorage.removeItem("sessionToken");
                window.location.reload(false);
            }
            return 'ERROR';
        }
    }

    async getTableHTMLForCoursesFromAPI() {
        let coursesList = [];
        let response = await this.fetchCourses();
        if (response !== 'ERROR'){
            for(let i=0; i<response['content'].length; i++){
                let ownerEmail = await fetch("https://api-gateway-fiubademy.herokuapp.com/users/ID/"+response['content'][i]["ownerId"]);
                ownerEmail = await ownerEmail.json();
                ownerEmail = ownerEmail['email'];
                response['content'][i]["ownerEmail"] = ownerEmail;
                coursesList.push(response['content'][i])
            }
            this.setState({maxPages: response['num_pages'], courses: coursesList});
            if (response['num_pages'] <= 0){
                this.setState({maxPages: 1});
            }
        }else{
            this.setState({courses: coursesList, maxPages: 1});
        }
    }

    

    componentDidMount(){
        this.getTableHTMLForCoursesFromAPI();
    }

    async filterCourses(){
        await this.setState(
            {
                page: 1, 
                nameFilter: document.getElementById('courseNameFilter').value,
                descriptionFilter: document.getElementById('courseDescriptionFilter').value,
                sub_levelFilter: document.getElementById('courseSubLevelFilter').value,
                latitudeFilter: document.getElementById('courseLatitudeFilter').value,
                longitudeFilter: document.getElementById('courseLongitudeFilter').value,
            }
        );
        this.getTableHTMLForCoursesFromAPI();
    }

    async subtractPage(){
        if(this.state.page-1 < 1){
            await this.setState({page:this.state.maxPages});
        }else{
            await this.setState({page:this.state.page-1});
        }
        this.getTableHTMLForCoursesFromAPI();

    }

    async sumPage(){
        if(this.state.page+1 > this.state.maxPages){
            await this.setState({page:1})
        }else{
            await this.setState({page:this.state.page+1});
        }
        this.getTableHTMLForCoursesFromAPI();
    }

    render(){
        return(
            <div className = "container-fluid">
                <h1 id="TituloCursos" style = {{ textAlign: 'center'}} className = "pt-5 mt-4 mb-5 col-12">
                    Administraci??n de Cursos
                </h1>
                
                <div id="tableDivCoursesModule" className="col-12 col-lg-10 container-fluid">
                    <div id="filtersDiv" className={'row d-flex justify-content-around'}>
                        <div class="row d-flex justify-content-around pt-4">
                            <input className={'col-4 col-lg-2 courseFilterInput mb-4'} placeholder='Filtrar por Nombre...' id='courseNameFilter'></input>
                            <input className={'col-4 col-lg-2 courseFilterInput mb-4'} placeholder='Filtrar por Descripcion...' id='courseDescriptionFilter'></input>
                            <input className={'col-4 col-lg-2 courseFilterInput mb-4'} placeholder='Filtrar por Sub Level...' id='courseSubLevelFilter'></input>
                        </div>
                        <div class="row d-flex justify-content-around">
                            <input className={'col-4 col-lg-2 courseFilterInput mb-4'} placeholder='Filtrar por Latitud...' id='courseLatitudeFilter'></input>
                            <input className={'col-4 col-lg-2 courseFilterInput mb-4'} placeholder='Filrar por Longitud...' id='courseLongitudeFilter'></input>
                            <div className={'col-4 col-lg-2'}></div>
                        </div>
                        <Button id='btn_filtrar' className={'col-4 col-md-2 col-lg-1 mb-4'} onClick={this.filterCourses}>Filtrar Cursos</Button>
                    </div>
                    <Table id="coursesModuleTable" responsive striped>
                        <thead>
                            <tr className = "centered_content">
                                <th> Email del due&ntilde;o </th> 
                                <th> Nombre </th>
                                <th> Descripci&oacute;n </th>
                                <th> Latitud </th>
                                <th> Longitud </th>
                                <th> Nivel de Sub </th>
                                <th> Ver Curso </th>
                            </tr> 
                        </thead> 
                        <tbody>
                            {
                                this.state.courses.map((course, index) => {
                                    let href = "./courses/view/?course_id="+ course.id;
                                    let index_key = String(index);
                                    return (<tr key={index} className = "centered_content">
                                    <td key={index_key+ course.ownerId+'1'}>{course.ownerEmail}</td>
                                    <td key={index_key+ course.name+'2'}>{course.name}</td>
                                    <td key={index_key+ course.description+'3'}>{course.description}</td>
                                    <td key={index_key+ course.latitude+'4'}>{course.latitude}</td>
                                    <td key={index_key+ course.longitude+'5'}>{course.longitude}</td>
                                    <td key={index_key+ course.sub_level+'6'}>{course.sub_level}</td>
                                    <td key={index_key+ "Profile7"}><a className="btn btn-primary" href={href}>Ver Curso</a></td>
                                </tr>);
                                })
                            }
                        </tbody> 
                    </Table> 
                </div>
                <div id="tablePaginator">
                    <button style={{float:'left'} } id='buttonPageLeft' onClick={this.subtractPage}>&laquo; Anterior</button>
                    <div style={{float:'left'}} id='currentPage'>{this.state.page}/{this.state.maxPages}</div>
                    <button style={{float:'left'}} id='buttonPageRight' onClick={this.sumPage}>Siguiente &raquo;</button>
                </div>
            </div>
        );
    }
}