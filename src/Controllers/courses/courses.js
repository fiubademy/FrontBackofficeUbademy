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
        let query_params_quantity = 0
        if (this.state.nameFilter !== ''){
            if (query_params_quantity === 0){
                url = url + '/?'
            }else{
                url = url + '&'
            }
            url = url + "name="+this.state.nameFilter
            query_params_quantity += 1
        }
        if (this.state.ownerFilter !== ''){
            if (query_params_quantity === 0){
                url = url + '/?'
            }else{
                url = url + '&'
            }
            url = url + "owner="+this.state.ownerFilter
            query_params_quantity += 1
        }
        if (this.state.descriptionFilter !== ''){
            if (query_params_quantity === 0){
                url = url + '/?'
            }else{
                url = url + '&'
            }
            url = url + "description="+this.state.descriptionFilter
            query_params_quantity += 1
        }
        if (this.state.sub_levelFilter !== ''){
            if (query_params_quantity === 0){
                url = url + '/?'
            }else{
                url = url + '&'
            }
            url = url + "sub_level="+this.state.sub_levelFilter
            query_params_quantity += 1
        }
        if (this.state.latitudeFilter !== ''){
            if (query_params_quantity === 0){
                url = url + '/?'
            }else{
                url = url + '&'
            }
            url = url + "latitude="+this.state.latitudeFilter
            query_params_quantity += 1
        }
        if (this.state.longitudeFilter !== ''){
            if (query_params_quantity === 0){
                url = url + '/?'
            }else{
                url = url + '&'
            }
            url = url + "longitude="+this.state.longitudeFilter
            query_params_quantity += 1
        }
    }

    async fetchCourses(){
        let info;
        let url = "https://api-cursos-fiubademy.herokuapp.com/courses/all/"+ this.state.page
        this.completeURL(url);
        let info_response = await fetch(url);
        if(await info_response.status === 200){
            info = await info_response.json();
            return info;
        }else{
            return 'ERROR';
        }
    }

    async getTableHTMLForCoursesFromAPI() {
        let coursesList = [];
        let response = await this.fetchCourses();
        if (response !== 'ERROR'){
            for(let i=0; i<response['content'].length; i++){
                coursesList.push(response['content'][i]);
            }
            this.setState({maxPages: response['num_pages'], courses: coursesList});
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
                ownerFilter: document.getElementById('courseOwnerFilter').value,
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
                    Administración de Cursos
                </h1>
                <div id="filtersDiv" className={'row d-flex justify-content-around'}>
                    <h2 id="tituloFiltros">Filtros</h2>
                    <input className={'col-12 col-lg-5 courseFilterInput mb-4'} placeholder='Filtrar por Nombre...' id='courseNameFilter'></input>
                    <input className={'col-12 col-lg-5 courseFilterInput mb-4'} placeholder='Filtrar por Dueño...' id='courseOwnerFilter'></input>
                    <input className={'col-12 col-lg-5 courseFilterInput mb-4'} placeholder='Filtrar por Descripcion...' id='courseDescriptionFilter'></input>
                    <input className={'col-12 col-lg-5 courseFilterInput mb-4'} placeholder='Filtrar por Sub Level...' id='courseSubLevelFilter'></input>
                    <input className={'col-12 col-lg-5 courseFilterInput mb-4'} placeholder='Filtrar por Latitud...' id='courseLatitudeFilter'></input>
                    <input className={'col-12 col-lg-5 courseFilterInput mb-4'} placeholder='Filrar por Longitud...' id='courseLongitudeFilter'></input>
                    <Button id='btn_filtrar' className={'col-lg-6 mb-4 box-shadow pt-4 pb-4'} onClick={this.filterCourses}>Filtrar Cursos</Button>
                </div>
                <div id="tableDivCoursesModule" className="col-12 col-lg-10 container-fluid">
                    <Table id="coursesModuleTable" responsive striped>
                        <thead>
                            <tr className = "centered_content">
                            <th> Course ID </th> 
                            <th> Owner ID </th> 
                            <th> Name </th>
                            <th> Description </th>
                            <th> Latitude </th>
                            <th> Longitude </th>
                            <th> Sub Level </th>
                            <th> View Course </th>
                            </tr> 
                        </thead> 
                        <tbody>
                            {
                                this.state.courses.map((course, index) => {
                                    let href = "./courses/view/?course_id="+ course.id;
                                    return (<tr key={index} className = "centered_content">
                                    <td key={index+ course.id}>{course.id}</td>
                                    <td key={index+ course.owner}>{course.ownerId}</td>
                                    <td key={index+ course.name}>{course.name}</td>
                                    <td key={index+ course.description}>{course.description}</td>
                                    <td key={index+ course.latitude}>{course.latitude}</td>
                                    <td key={index+ course.longitude}>{course.longitude}</td>
                                    <td key={index+ course.sub_level}>{course.sub_level}</td>
                                    <td key={index+ "Profile"}><a className="btn btn-primary" href={href}>View Course</a></td>
                                </tr>);
                                })
                            }
                        </tbody> 
                    </Table> 
                </div>
                <div id="tablePaginator">
                    <button style={{float:'left'} } id='buttonPageLeft' onClick={this.subtractPage}>&laquo;Previous Page</button>
                    <div style={{float:'left'}} id='currentPage'>{this.state.page}/{this.state.maxPages}</div>
                    <button style={{float:'left'}} id='buttonPageRight' onClick={this.sumPage}>Next Page&raquo;</button>
                </div>
            </div>
        );
    }
}