import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
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
        this.getTableHTMLForUsersFromAPI();
    }

    handleViewProfile(){
        alert("Not yet implemented");
    }

    handleBlock(){
        alert("Not yet implemented");
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
                <h1 style = {{ textAlign: 'center', textDecoration: 'underline' }}className = "pt-5 mt-4 mb-5">
                    Administración de Usuarios 
                </h1>
                <Table id="usersTable" responsive striped bordered>
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
                        {this.state.users.map((user) => {
                            //ACORDARSE DE SETTEAR EL COMPORTAMIENTO DE LOS BOTONES EN EL ONCLICK
                            return (
                            <tr className = "centered_content">
                                <td key="1">{user.user_id}</td>
                                <td key="2">{user.username}</td>
                                <td key="3"><Button onClick={this.handleViewProfile}>View Profile</Button></td>
                                <td key="4"><Button onClick={this.handleBlock}>Block</Button></td>
                                <td key="5"><Button onClick={this.handleLoadBalance}>Load Balance</Button></td>
                            </tr>);
                        })}
                    </tbody> 
                </Table> 
            </div>
        );
    }
}

export default Users;