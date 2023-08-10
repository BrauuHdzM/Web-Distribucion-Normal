import React from "react";
import { Button, Container, Table, Alert } from "react-bootstrap";
import { Link,NavLink } from "react-router-dom";
import axios from "axios";
class Home extends React.Component {

    
    state = {
        datos:[]
        ,status: false
    } 
    //Carga de lista json con todos los elementos de las preguntas existentes
    cargaDatos=()=>{
        axios.get("http://localhost:8080/ProyectoWebServlet/svLista").then(response => { 
            this.setState({
                datos:response.data
                ,status:true
            });
        });

    } 
    //funciones y componentes cargados al iniciar
    componentDidMount() {
        this.cargaDatos();
        
    }
    //manejador que nos permite que pregunta desea ser eliminada de la base de datos
    handleClick(id) {
        axios.get("http://localhost:8080/ProyectoWebServlet/svDelete?ID_Pregunta="+id).then(response => {
            console.info(response.data);
            if (response.data.message) {
                alert("ELEMENTO "+id+" BORRADO CORRECTAMENTE");
                this.setState({ redirect: true });
            } else {
                alert("ELEMENTO "+id+" BORRADO CORRECTAMENTE");
                this.setState({ redirect: true })
            }
        }).catch(error => {
            console.info(error);
            alert(response.data.message);
        });
    }    
    //Creacion de la tabla con los datos de nuestras preguntas y las diferentes opciones de cada una
    render() {
        const { redirect } = this.state;
// funcion para redireccionar al menu del crud
        if (redirect) {
        return <Redirect to='/ProyectoWebServlet/home'/>;
        }
        const { data, showAlert, alertText } = this.state;
        return (
            <Container className="MarginContainer" >
                <h1 className="AlignCenter" > CREAR, ALTAS, BAJAS Y CAMBIOS </h1>
                <hr style={{ width: "80%" }} />
                {
                    showAlert ?
                        <Alert variant="danger">
                            {alertText}
                        </Alert>
                        : null
                }
                <Button variant="info" style={{ margin: "12px" }}>
                    <Link to="/ProyectoWebServlet/formulario" className="CustomLink">Añadir nueva pregunta</Link>
                </Button>
                <Table striped bordered >
                    <thead>
                        <tr>
                            <th> ID PREGUNTA </th>
                            <th>Pregunta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
            {this.state.status===true &&
            (
            this.state.datos.map((preg,i)=>{
                return(
                <tr key={i}>
                    <td>{preg.ID}</td>
                    <td>{preg.TITLE}</td>
                    <td>
                    <Button variant="danger" style={{ margin: "12px" }} onClick={this.handleClick.bind(this, preg.ID)}>
                    Eliminar
                    </Button>
                    <Button variant="warning" style={{ margin: "12px" }}>
                        <NavLink to={"/ProyectoWebServlet/modifica/"+preg.ID} className="CustomLink">Modificar</NavLink>
                    </Button>
                    <Button variant="success" style={{ margin: "12px" }}>
                        <NavLink to={"/ProyectoWebServlet/ver/"+preg.ID} className="CustomLink">Ver Ejercicio</NavLink>
                    </Button>
                    <Button variant="primary" style={{ margin: "12px" }}>
                        <NavLink to={"/ProyectoWebServlet/probar/"+preg.ID} className="CustomLink">Probar Ejerciccio</NavLink>
                    </Button>
                    </td>
                    </tr>
                );
        })
        )}
                    </tbody>
                </Table>
            </Container>
        )
    }

}

export default Home;