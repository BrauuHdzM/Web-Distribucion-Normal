//IMPORTACIONES DE REACT
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
//IMPORTANDO ESTILO DE ACORDEON PARA EL FORMULARIO
//import {accordion, Card} from 'react-bootstrap';
//import axios from "axios";




class Formulario extends React.Component {
  state={
    val: false,
    redirect: false
  }

    cambiar = () =>{
        this.setState((state)=>({
          val:true,
          comp: <Home></Home>
        }))
    }
      validar=(Titulo,Tipo,X1,Y1,X2,Y2) =>{
        var datos={
            Titulo: Titulo,
            Type: Tipo,
            X1:X1,
            Y1:Y1,
            X2:X2,
            Y2:Y2
        }

        axios.get("http://localhost:8080/ProyectoWebServlet/svInsert?Titulo="+Titulo+"&Type="+Tipo+"&X1="+X1+"&Y1="+Y1+"&X2="+X2+"&Y2="+Y2)
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

      //BORRAR YA QUE ES LA REDIRECCION AL SUBIDA DE ARCHIVOS
      if (redirect) {
        //return window.location.href = "http://localhost:8080/ProyectoWebServlet/subidaArchivo.html";
        return <Redirect to='/ProyectoWebServlet/home'/>;
        }
        
      const qId = (new URLSearchParams(window.location.search).get("val") == "true")? true:false;

      const undiv=  <div className = "registro-container" style={styles} id="equis">

            <h1 className="AlignCenter titulo" > NUEVA PREGUNTA  </h1>

            <div class="form-group2"><label class="form-label subtitulo2" for="Type">Tipo de pregunta</label>
                <select value={this.state.value} onChange={this.handleChange.bind(this)} id="Type" class="form-select cen">            
                <option value="1"> X1 MENOR Z MAYOR X2 </option>
                <option value="2">Z MENOR QUE X1</option>
                <option value="3">Z MAYOR QUE X1</option>
                </select>
            </div>


            <div class="form-group2">

                <label class="form-label subtitulo2" for="Title">Titulo</label>
                <input placeholder="Ingrese el titulo de la pregunta" type="text" id="Title" class="form-control" />

            </div>

                <div class="form-group2">
                <label class="form-label subtitulo2" for="X1">X1</label>
                <input placeholder="INGRESA EL VALOR DE X1" type="number" id="X1" class="form-control" />
                </div>
                <div class="form-group2">
                <label class="form-label subtitulo2" for="X2">X2</label>
                <input placeholder="INGRESA EL VALOR DE X2 (EN CASO DE SER NECESARIO) " type="number" id="Y1" class="form-control" />
                </div>

            

            <button className="btn btn-primary" onClick={() => this.validar(document.getElementById("Title").value,document.getElementById("Type").value,document.getElementById("X1").value,document.getElementById("Y1").value)}>
                ENVIAR
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
export default Formulario; 