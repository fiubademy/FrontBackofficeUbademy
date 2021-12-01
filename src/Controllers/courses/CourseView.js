import React from "react"
import "./CourseView.css"

export default class CourseView extends React.Component{

    constructor(props){
        super(props);
        let query = new URLSearchParams(this.props.location.search);
        this.course_id = query.get("course_id");
        this.state = {courseInfo: null};
        this.fetchCourse = this.fetchCourse.bind(this);
        this.traduceSubscription = this.traduceSubscription.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    async fetchCourse(){
        let url = "https://api-gateway-fiubademy.herokuapp.com/courses/all/1?sessionToken="+localStorage.getItem("sessionToken")+'&id='+ this.course_id;
        let info_response = await fetch(url);
        if(await info_response.status === 200){
            let info = await info_response.json()
            info = info['content'][0]
            this.setState({courseInfo: info});     
        }else{
            if(info_response.status === 498){
                localStorage.removeItem("sessionToken");
                window.location.reload(false);
            }
            this.setState({courseInfo: null});
        }
    }

    componentDidMount(){
        this.fetchCourse();
    }

    traduceSubscription(){
        if (this.state.courseInfo.sub_level === 0){
            return 'Free';
        }else if (this.state.courseInfo.sub_level === 1){
            return 'Standard';
        }else if (this.state.courseInfo.sub_level === 2){
            return 'Premium';
        }else{
            return 'Desconocida';
        }
    }

    getLocation(){
        let latitude, longitude;
        if (this.state.courseInfo.latitude !== null){
            latitude = this.state.courseInfo.latitude;
        }else{
            latitude = 'Desconocida';
        }
        if (this.state.courseInfo.longitude !== null){
            longitude = this.state.courseInfo.longitude;
        }else{
            longitude = 'Desconocida';
        }
        return '( Latitud: ' + latitude + ' ; Longitud: ' + longitude + ' )';
    }

    render(){
        if (this.state.courseInfo === null){
            return(
                <div className="container-fluid mt-5 pt-4 row d-flex justify-content-center">
                    <div className="container-info-courses row mt-3">
                        <h2 className="col-12 title-info-course">Curso con ID: {this.course_id}, no ha sido encontrado.</h2>
                    </div>
                </div>
            )
        }
        return(
            <div className="container-fluid mt-5 pt-4 row d-flex justify-content-center">
                <div className="container-info-courses row mt-3 d-flex justify-content-center">
                        <h2 className="col-12 title-info-course">Información Del Curso</h2>
                        <div className="col-11 field-info" style={{overflow:'hidden'}}><h4 style={{float:'left'}}>Nombre:</h4><h5 id='username' style={{float:'left', margin: '5px 0 0 10px'}}>{this.state.courseInfo.name}</h5></div>
                        <div className="col-11 field-info" style={{overflow:'hidden'}}><h4 style={{float:'left'}}>Nivel de suscripción:</h4><h5 id='sub' style={{float:'left', margin: '5px 0 0 10px'}}>{this.traduceSubscription()}</h5></div>
                        <div className="col-11 field-info" style={{overflow:'hidden'}}><h4 style={{float:'left'}}>ID Curso:</h4><h5 style={{float:'left', margin: '5px 0 0 10px'}}>{this.state.courseInfo.id}</h5></div>
                        <div className="col-11 field-info"><h4 style={{float:'left'}}>Ubicación:</h4><h5 id='location' style={{float:'left', margin: '5px 0 0 10px'}}>{this.getLocation()}</h5></div>
                        <div className="col-11 field-info" style={{overflow:'hidden'}}><h4 style={{float:'left'}}>ID Dueño:</h4><h5 id='email' style={{float:'left', margin: '5px 0 0 10px'}}>{this.state.courseInfo.ownerId ? this.state.courseInfo.ownerId: 'Desconocido'}</h5></div>
                        <div className="col-11 field-info"><h4 style={{float:'left'}}>Descripción:</h4><h5 id='usertype' style={{float:'left', margin: '5px 0 0 10px'}}>{this.state.courseInfo.description}</h5></div>
                        <div className="col-11 field-info"><h4 style={{float:'left'}}>Hashtags:</h4><h5 id='usertype' style={{float:'left', margin: '5px 0 0 10px'}}>
                            {
                                this.state.courseInfo.hashtags.map((hashtag, index) => {
                                    if (index === 0){
                                        return('( '+hashtag+' ; ');
                                    }
                                    if (index < this.state.courseInfo.hashtags.length-1){
                                        return(hashtag+' ; ');
                                    }else{
                                        return(hashtag + ' )');
                                    }
                                })
                            }</h5></div>
                </div>
            </div>
        );
    }
}