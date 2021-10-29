import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import BlockModal from './BlockModal.js'
import './users.css';

class Users extends React.Component {

    async fetchUsers(){
        let info;
        let info_response = await fetch("https://api-usuarios-fiubademy.herokuapp.com/users"); //Despues habría que integrar lo de la pagina y la API Gateway.
        info = await info_response.json();
        return info;
    }

    async getTableHTMLForUsersFromAPI() {
        let usersList = [];
        let users = await this.fetchUsers();  
        users.map((user) => {
            usersList.push(
                {
                    user_id: user.user_id,
                    username: user.username
                }
            );
            return null;
        }); 
        this.setState({users: usersList});
    }

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            users: []
        }
        this.getTableHTMLForUsersFromAPI = this.getTableHTMLForUsersFromAPI.bind(this);
    }

    componentDidMount(){
        this.getTableHTMLForUsersFromAPI();
    }

    handleViewProfile(){
        alert(this.username);
    }

    handleBlock(){

        alert(this.user_id + this.username);
    }

    handleUnblock(){
        alert("Not yet implemented");
    }

    handleLoadBalance(){
        alert("Not yet implemented");
    }

    render() {
        return (
            <div className = "container-fluid">
                <h1 id="TituloUsuarios" style = {{ textAlign: 'center'}} className = "pt-5 mt-4 mb-5">
                    Administración de Usuarios 
                </h1>
                <div id="tableDiv" className="col-12 col-lg-10 container-fluid">
                    <Table id="usersTable" responsive striped>
                        <thead>
                            <tr className = "centered_content">
                            <th> User ID </th> 
                            <th> Username </th> 
                            <th> View Profile </th> 
                            <th> Block </th> 
                            <th> Load Balance </th> 
                            </tr> 
                        </thead> 
                        <tbody>
                            {this.state.users.map((user, index) => {
                                //ACORDARSE DE SETTEAR EL COMPORTAMIENTO DE LOS BOTONES EN EL ONCLICK
                                let href = "./users/profile/?uid="+ user.user_id
;                                return (
                                <tr key={index} className = "centered_content">
                                    <td key={index+ user.user_id}>{user.user_id}</td>
                                    <td key={index+ user.username}>{user.username}</td>
                                    <td key={index+ "Profile"}><a className="btn btn-primary" href={href}>View Profile</a></td>
                                    <td key={index+ "Block"}><BlockModal user={user}/></td>
                                    <td key={index+ "Balance"}><Button onClick={this.handleLoadBalance}>Load Balance</Button></td>
                                </tr>);
                            })}
                        </tbody> 
                    </Table> 
                </div>
            </div>
        );
    }
}

export default Users;