import React from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import $ from "jquery"
import { browserHistory } from "react-router";
import ReactDOM from "react-dom"
import Home from "./home"


class Login extends React.Component {
    
  state={
    val: false,
  }

    cambiar = () =>{
        this.setState((state)=>({
          val:true,
          comp: <Home></Home>
        }))
    }
    //funcion de validacion de datos 
      validar=(usuario,password) =>{
        var datos={
            User: usuario,
            password: password
        }
//Consulta de informacion con los datos ingresados en login
        $.get("http://localhost:8080/ProyectoWebServlet/Login",datos, (resultado)=>{
          if(resultado[0].usuario !="error"){
            this.state.val = true;
            this.forceUpdate();
          }else{
            alert("USUARIO NO REGISTRADO")
          }
          
        })
     
    }
    //Carga de pagina y formulario de login
    render() {
      const styles = {
          padding : '5px'
      }
      const qId = (new URLSearchParams(window.location.search).get("val") == "true")? true:false;
      const undiv=  <div className = "login-container" style={styles} id="equis">

      
               <h2 className="AlignCenter subtitulo">APLICACION WEB CALCULADORA GRAFICADORA DE DISTRIBUCION NORMAL</h2>
               
               <h1 className="AlignCenter titulo" > LOGIN </h1>
               
            

            <div class="form-group">
                    
                    <input placeholder="USUARIO" type="text" id="User" class="form-control" />
            
            </div>

            <div class="form-group">

                    <input placeholder="CONTRASEÑA" type="password" id="password" class="form-control" />

            </div>


            <button className="btn btn-primary" onClick={() => this.validar(document.getElementById("User").value,document.getElementById("password").value)}>
                INGRESAR
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
export default Login; 