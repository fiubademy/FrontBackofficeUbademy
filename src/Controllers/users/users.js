import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import BlockModal from './BlockModal.js';
import './users.css';

class Users extends React.Component {

    async fetchUsers(){
        let info;
        let info_response = await fetch("https://api-gateway-fiubademy.herokuapp.com/users/"+this.state.page+"?emailFilter="+this.state.emailFilter+"&usernameFilter="+this.state.usernameFilter); //Despues habría que integrar lo de la pagina y la API Gateway.
        if(await info_response.status === 200){
            info = await info_response.json();
            return info;
        }else{
            return 'ERROR';
        }
    }

    async getTableHTMLForUsersFromAPI() {
        let usersList = [];
        let response = await this.fetchUsers();
        if (response !== 'ERROR'){
            let users = response['content'];
            let maxPages = response['num_pages'];
            users.map((user) => {
                usersList.push(
                    {
                        user_id: user.user_id,
                        email: user.email,
                        username: user.username,
                        is_blocked: user.is_blocked
                    }
                );
                return null;
            }); 
            this.setState({maxPages: maxPages, users: usersList});
            if (maxPages <= 0){
                this.setState({maxPages: 1});
            }
        }else{
            this.setState({users: usersList, maxPages: 1});
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            maxPages: 1,
            page: 1,
            users: [],
            emailFilter: '',
            usernameFilter: ''
        }
        this.getTableHTMLForUsersFromAPI = this.getTableHTMLForUsersFromAPI.bind(this);
        this.subtractPage = this.subtractPage.bind(this);
        this.sumPage = this.sumPage.bind(this);
        this.filterUsers = this.filterUsers.bind(this);
    }

    componentDidMount(){
        this.getTableHTMLForUsersFromAPI();
    }

    handleLoadBalance(){
        alert("Not yet implemented");
    }

    async subtractPage(){
        if(this.state.page-1 < 1){
            await this.setState({page:this.state.maxPages});
        }else{
            await this.setState({page:this.state.page-1});
        }
        this.getTableHTMLForUsersFromAPI();

    }

    async sumPage(){
        if(this.state.page+1 > this.state.maxPages){
            await this.setState({page:1})
        }else{
            await this.setState({page:this.state.page+1});
        }
        this.getTableHTMLForUsersFromAPI();
    }

    async filterUsers(){
        await this.setState({page: 1, emailFilter: document.getElementById('emailFilter').value, usernameFilter: document.getElementById('usernameFilter').value});
        this.getTableHTMLForUsersFromAPI();
    }

    render() {
        return (
            <div className = "container-fluid">
                <h1 id="TituloUsuarios" style = {{ textAlign: 'center'}} className = "pt-5 mt-4 mb-5 col-12">
                    Administración de Usuarios 
                </h1>
                
                <div id="tableDiv" className="col-12 col-lg-10 container-fluid">
                    <div id="filtersDiv" className={'row d-flex justify-content-around'}>
                        <div class="row d-flex justify-content-around pt-4">
                            <input className={'col-5 col-md-4 col-lg-2 filterInput mb-4'} placeholder='Filter by Email...' id='emailFilter'></input>
                            <input className={'col-5 col-md-4 col-lg-2 filterInput mb-4'} placeholder='Filter by Username...' id='usernameFilter'></input>
                            <Button className={'col-5 col-lg-2 mb-4'} onClick={this.filterUsers}>Filter Users</Button>

                        </div>
                    </div>
                    <Table id="usersTable" responsive striped>
                        
                        <thead>
                            <tr className = "centered_content">
                            <th> Email </th> 
                            <th> Username </th> 
                            <th> View Profile </th> 
                            <th> Block/Unblock </th> 
                            <th> Load Balance </th> 
                            </tr> 
                        </thead> 
                        <tbody>
                            {
                                this.state.users.map((user, index) => {
                                //ACORDARSE DE SETTEAR EL COMPORTAMIENTO DE LOS BOTONES EN EL ONCLICK
                                let href = "./users/profile/?uid="+ user.user_id;
                                    return (<tr key={index} className = "centered_content">
                                    <td key={index+ user.email}>{user.email}</td>
                                    <td key={index+ user.username}>{user.username}</td>
                                    <td key={index+ "Profile"}><a className="btn btn-primary" href={href}>View Profile</a></td>
                                    <td key={index+ "Block"}><BlockModal user={user}/></td>
                                    <td key={index+ "Balance"}><Button onClick={this.handleLoadBalance}>Load Balance</Button></td>
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

export default Users;