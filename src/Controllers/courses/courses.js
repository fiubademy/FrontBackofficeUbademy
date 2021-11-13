import React from 'react';
import Button from 'react-bootstrap/Button';
import "./Courses.css";

export default class Courses extends React.Component{

    async fetchIndividualCourse(id){
        let course;
        let course_response = await fetch("https://api-cursos-fiubademy.herokuapp.com/courses/"+id);
        if(await course_response.status === 200){
            course = await course_response.json();
            return course;
        }else{
            return 'ERROR';
        }
    }

    async fetchCourses(){
        let info;
        let info_response = await fetch("https://api-cursos-fiubademy.herokuapp.com/courses/?nameFilter="+this.state.nameFilter);
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
            for(let i=0; i<response.length; i++){
                let course;
                course = await this.fetchIndividualCourse(response[i]['id']);
                if (course != 'ERROR'){
                    coursesList.push(course);
                }
            }
            this.setState({maxPages: 1, courses: coursesList});
        }else{
            this.setState({courses: coursesList, maxPages: 1});
        }
        console.log(coursesList);
    }

    constructor(props) {
        super(props);
        this.state = {
            maxPages: 1,
            page: 1,
            courses: [],
            nameFilter: ''
        }
        this.getTableHTMLForCoursesFromAPI = this.getTableHTMLForCoursesFromAPI.bind(this);
        this.subtractPage = this.subtractPage.bind(this);
        this.sumPage = this.sumPage.bind(this);
        this.filterUsers = this.filterCourses.bind(this);
    }

    componentDidMount(){
        this.getTableHTMLForCoursesFromAPI();
    }

    async filterCourses(){
        await this.setState({page: 1, nameFilter: document.getElementById('courseNameFilter').value});
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
                    <input className={'col-12 col-lg-6 courseFilterInput mb-4'} placeholder='Filter by Name...' id='courseNameFilter'></input>
                    <Button className={'col-lg-3 mb-4 box-shadow'} onClick={this.filterCourses}>Filter Courses</Button>
                </div>
            </div>
        );
    }
}