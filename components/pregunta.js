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
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import { Line } from "react-chartjs-2";
import swal from 'sweetalert';
import functionPlot from 'function-plot'
import {Ver} from "./Visualizar"

//Datos usados en chart para graficar

var datag = {
        labels: [],
        datasets: [
        {
        label: "CAMPANA",
        data: [1,2,3],
        fill: false,
        borderColor: "#742774"
        }
        ]
      };

var datag2 = {
        labels: [],
        datasets: [
        {
        label: "CAMPANA",
        data: [],
        fill: false,
        borderColor: "#742774"
        }
        ]
      };


//Boton de carga de grafo
const CargaGrafo = (props) => (
  <button className="btn btn-primary" id="update-chart" onClick={props.handleOnClick}>Recargar Grafico</button>
);


class Pregunta extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      chartData: datag,
      updated: false
    }
    this.handleUpdate = this.handleUpdate.bind(this);
  }
    state={
    val: false,
    redirect: false,
    pregunta:{}
  }
//Carga de datos del ejercicio por medio de un metodo get que va directo al servlet el cual nos devuelve los datos
  cargaDatos=()=>{
        axios.get("http://localhost:8080/ProyectoWebServlet/svEjercicio?ID_Modificar="+this.props.ID).then(response => { 
            this.setState({
                datos:response.data
                ,status:true
            });
        });

    }

//Componentes y funciones que se cargan al cargar la pagina
  componentDidMount() {
        this.cargaDatos();
        
    }
 
    cambiar = () =>{
        this.setState((state)=>({
          val:true,
          comp: <Home></Home>
        }))
    }
//Funcion para generar los datos del grafico (Boton Generar datos)
    generaGrafico=(X1,Y1,X2,Y2)=>{
        
        var x1=0;
        var x2=0;
        var y1=0;
        var y2=0;
        var Resultado=0;
        var contador=0;
        var Intervalo=0;
        var aumento=0;
        datag.labels=[];
        console.log("Valores en el grafo Y"+datag.datasets[0].data)
        datag.datasets[0].data=[];
        
        var misDatos={
            X1:X1,
            Y1:Y1,
            X2:X2,
            Y2:Y2
        }

           x1=parseFloat(misDatos.X1);
           y1=parseFloat(misDatos.Y1);
           y2=parseFloat(misDatos.Y2);
           x2=parseFloat(misDatos.X2);
        
        console.log("Valores x1"+x1)
        console.log("Valores x2"+x2)
        console.log("Valores y1"+y1)
        console.log("Valores y2"+y2)

    }

    //Funcion para validar si la respuesta es correcta o no
      validar=(Resultado,LaRespuesta) =>{
        var datos={
            Resultado:Resultado,
            RealAnswer:LaRespuesta
        }
        
        if(datos.Resultado==datos.RealAnswer){
          //uso de sweetalert para avisar al usuario si es correcta su respuesta o no
           return swal({
             title:"ENHORABUENA!",
             text:"LA RESPUESTA ES CORRECTA",
             icon:"success",
             button:"Continuar"
           });
        }
          else{
              return swal({
             title:"ERROR!",
             text:"LA RESPUESTA ES INCORRECTA, LA RESPUESTA CORRECTA ES: "+datos.RealAnswer,
             icon:"error",
             button:"Continuar"
           });
          }
     
    }
//Funcion que nos permite recargar el grafico en caso de que se haya cambiado de ejercicio y los datos anteriores se hayan quedado en cache
handleUpdate() {
    const chartData = this.state.updated ? datag : datag2;
    this.setState({chartData, updated: !this.state.updated});
    console.log("Data"+datag.datasets[0].data);
  }
      handleChange(event) {    
          this.setState({value: event.target.value});  
      }
    render() {
      const styles = {
          padding : '5px'
      }
      const { redirect } = this.state;

      
//Funcion para redireccionar al menu del crud
     if (redirect) {
        return <Redirect to='/ProyectoWebServlet/home'/>;
        }
        
      const qId = (new URLSearchParams(window.location.search).get("val") == "true")? true:false;
      const undiv=  <div className = "registro-container" style={styles} id="equis">
                
               <h1 className="AlignCenter" > Resuelve con base a la recta mostrada en la grafica </h1>
               <div className="Grafo"><Line data={this.state.chartData} /></div>
            
            
            {this.state.status===true &&
            (
            this.state.datos.map((preg,i)=>{
                return( 
                    
        <div class="modify-form">
        <h2 className="AlignCenter" > {preg.TYPE} </h2>
                    <div class="form-group">
                    <label class="form-label" for="Answer">Respuesta</label>
                    <input placeholder="Ingrese la respuesta (Maximo 2 decimales)" type="number" id="Answer" class="form-control" />
                    </div>
                    <input value={preg.Resultado} type="hidden" id="LaRespuesta" class="form-control" />
                    <input value={preg.COORDX1} type="hidden" id="X1" class="form-control" />
                    <input value={preg.COORDY1} type="hidden" id="Y1" class="form-control" />
                    <input value={preg.COORDX2} type="hidden" id="X2" class="form-control" />
                    <input value={preg.COORDY2} type="hidden" id="Y2" class="form-control" />
                    <div key={ i }>
                    
                    </div>
            </div>
                 );
        })
        )}
            <button className="btn btn-primary" onClick={() => this.generaGrafico(document.getElementById("X1").value,document.getElementById("Y1").value,document.getElementById("X2").value,document.getElementById("Y2").value)}>
                Cargar Datos de grafico
              </button>
              <CargaGrafo handleOnClick={this.handleUpdate} />
            <button className="btn btn-primary" onClick={() => this.validar(document.getElementById("Answer").value,document.getElementById("LaRespuesta").value)}>
                Submit
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

export default Pregunta; 