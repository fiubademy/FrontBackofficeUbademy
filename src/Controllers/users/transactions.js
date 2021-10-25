import React from 'react';
//import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './transactions.css';

class Transactions extends React.Component {

    async fetchTransactions(){
        /*
        let info;
        let info_response = await fetch("https://api-usuarios-fiubademy.herokuapp.com/users"); //Despues habría que integrar lo de la pagina y la API Gateway.
        info = await info_response.json();
        return info;
        */
        /*TODO: Cuando tengamos las transacciones añadirlas aca*/
        return null;
    }

    async getTableHTMLForUsersFromAPI() {
        let transactionsList = [];
        let transactions = await this.fetchUsers();  
        transactions.map((transaction) => {
            transactionsList.push(
                {
                    /*TODO: Ver campos de transacciones*/
                }
            );
            return null;
        }); 
        this.setState({transactions: transactionsList});
    }

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            transactions: []
        }
        /*this.getTableHTMLForUsersFromAPI = this.getTableHTMLForUsersFromAPI.bind(this);
        this.getTableHTMLForUsersFromAPI();*/
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
                    Administración de Transacciones
                </h1>
                <div id="tableDiv" className="col-12 col-lg-10 container-fluid">
                    <Table id="usersTable" responsive striped>
                        <thead>
                            <tr className = "centered_content">
                                <th> Nro. Transacción </th> 
                                <th> Fecha de Pago </th> 
                                <th> Monto Pagado </th> 
                                <th> Medio de Pago </th> 
                                <th> Acreditado </th> 
                                <th> Tipo de Pago </th> 
                                <th> Usuario Relacionado </th> 
                            </tr> 
                        </thead> 
                        <tbody>
                            {this.state.transactions.map((transaction) => {
                                //ACORDARSE DE SETTEAR EL COMPORTAMIENTO DE LOS BOTONES EN EL ONCLICK
                                /*
                                    <td key="1">{user.user_id}</td>
                                    <td key="2">{user.username}</td>
                                    <td key="3"><Button onClick={this.handleViewProfile}>View Profile</Button></td>
                                    <td key="4"><Button onClick={this.handleBlock}>Block</Button></td>
                                    <td key="5"><Button onClick={this.handleLoadBalance}>Load Balance</Button></td>
                                */
                                return (
                                <tr className = "centered_content">
                                    
                                </tr>);
                            })}
                        </tbody> 
                    </Table> 
                </div>
            </div>
        );
    }
}

export default Transactions;