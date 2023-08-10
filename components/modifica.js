import React from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import $ from "jquery"
import { BrowserRouter } from 'react-router-dom';
import { browserHistory, Redirect } from "react-router";
import ReactDOM from "react-dom"
import Select from "react-select";
import axios from "axios";
import Home from "./home"
class Modifica extends React.Component {
  state={
    val: false,
    redirect: false,
    pregunta:{}
  }

  //Funcion para cargar los datos de la pregunta a modificar
  cargaDatos=()=>{
        axios.get("http://localhost:8080/ProyectoWebServlet/svCharge?ID_Modificar="+this.props.ID).then(response => { 
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
    cambiar = () =>{
        this.setState((state)=>({
          val:true,
          comp: <Home></Home>
        }))
    }
    //Funcion de validacion y realizacion de envio de informacion a nuestro servlet
      validar=(Titulo,Tipo,X1,Y1,X2,Y2) =>{
        var datos={
            Titulo: Titulo,
            Type: Tipo,
            X1:X1,
            Y1:Y1,
            X2:X2,
            Y2:Y2
        }

        axios.get("http://localhost:8080/ProyectoWebServlet/svUpdate?ID_Pregunta="+this.props.ID+"&Titulo="+Titulo+"&Type="+Tipo+"&X1="+X1+"&Y1="+Y1+"&X2="+X2+"&Y2="+Y2)
          .then(() => this.setState({ redirect: true })).catch(error => {
            this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
        });
     
    }
      handleChange(event) {    
          this.setState({value: event.target.value});  
      }

    render() {
      const styles = {
          padding : '5px'
      }
      const { redirect } = this.state;
// funcion para redireccionar al menu del crud
     if (redirect) {
        return <Redirect to='/ProyectoWebServlet/home'/>;
        }
        
      const qId = (new URLSearchParams(window.location.search).get("val") == "true")? true:false;
      const undiv=  <div className = "registro-container" style={styles} id="equis">
               <h1 className="AlignCenter" >MODIFICADOR DE PREGUNTAS</h1>
            {this.state.status===true &&
            (
            this.state.datos.map((preg,i)=>{
                return(
        <div class="modify-form">
            <div class="form-group">
                <label class="form-label subtitulo2" for="Title">Titulo</label>
                 <label class="form-label subtitulo2">Titulo anterior: {preg.TITLE}</label>
                <input placeholder="Ingrese el titulo de la pregunta" type="text" id="Title" class="form-control"/>
            </div>
            <div class="form-group"><label class="form-label subtitulo2" for="Type">Tipo de pregunta</label>

                    <label class="form-label">Tipo de pregunta anterior: {preg.TYPE}</label>
                <select value={this.state.value} onChange={this.handleChange.bind(this)} id="Type" class="form-select cen">            
                <option value="1"> X1 MENOR Z MAYOR X2 </option>
                <option value="2">Z MENOR QUE X1</option>
                <option value="3">Z MAYOR QUE X1</option>
                </select>
            </div>
                <div class="form-group">
                  <br></br>
                <label class="form-label subtitulo2" for="X1"> X1 </label>
                <label class="form-label">Valor anterior: {preg.COORDX1}</label>
                <input placeholder="INGRESE NUEVO VALOR DE X1" type="number" id="X1" class="form-control" />
                </div>
                <div class="form-group">
                <label class="form-label subtitulo2" for="Y1">X2 </label>
                <label class="form-label">Valor anterior: {preg.COORDY1}</label>                 
                <input placeholder="INGRESE NUEVO VALOR DE X2 (EN CASO DE SER NECESARIO)" type="number" id="Y1" class="form-control" />
                </div>


            </div>
                 );
        })
        )}                 
            <button className="btn btn-primary" onClick={() => this.validar(document.getElementById("Title").value,document.getElementById("Type").value,document.getElementById("X1").value,document.getElementById("Y1").value)}>
                GUARDAR
              </button>
            </div>
        
       const esValido = (this.state.val) || qId?<Home></Home>: undiv
        return(
          <div>
            {esValido}
            {console.log(esValido)}
          </div>
        )    
  }
}

export default Modifica; 