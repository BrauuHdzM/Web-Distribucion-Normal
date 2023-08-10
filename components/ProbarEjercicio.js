import functionPlot from "function-plot";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import estilos from "../styles/ProbarEjercicio.module.css";
import axios from "axios";

export default function Probar(props){

    const [e, setE] = useState({type:"", menor: "",mayor:"",resultado:""});
    const [carga, setCarga] = useState(true);
    const [isCorrecto, setIsCorrecto] = useState(false);
    const [respuesta, setRespuesta] = useState("");

    let P="";


    const handleOnClick = (ev) =>{
        (respuesta === e.resultado) ? setIsCorrecto(true) : setIsCorrecto(false)
    };
    
    useEffect ( () => {

        console.log(props)

        if(carga){
            axios.get("http://localhost:8080/ProyectoWebServlet/svEjercicio?ID_Modificar="+props.ID).then(response => { 
                //console.log(`HOLA1 ${response.data[0].TYPE}`);
                
                console.log(response);
                setE({type: response.data[0].TYPE, menor:response.data[0].MENOR, mayor:response.data[0].MAYOR, resultado:response.data[0].RESUL});
                this.setState({
                    datos:response.data
                    ,status:true
                });
            }); 
            
            setCarga(false);    
        }
       


     
        
            let r;
            let d;
        
            if(e.type === "1"){
                r = [e.menor, e.mayor];
                d = [e.menor-4, e.mayor+4];
                P = "P( "+e.menor+" < Z < "+e.mayor+" )";
            }else if(e.type === "2"){
                r = [-3.14, e.menor];
                d = [-10, e.menor+4]
                P = "P( Z < "+e.menor+" )";
            }else{
                r = [e.menor, 3.14];
                d = [e.menor-4, 10]
                P = "P( Z > "+e.menor+" )";
            }



        functionPlot({
            target: "#Grafica",
            xAxis: { domain: d },
            yAxis: { domain: [-.05, .5] },
            grid: true,
            disableZoom: true,
            data: [
              {
                fn: "(1/sqrt(2 * 3.1416))*exp(-(x^2)/4)",
                range: r,
                closed: true,
                skipTip: true
              }, {
                  fn: "(1/sqrt(2 * 3.1416))*exp(-(x^2)/4)",
                  color: 'black',
                  skipTip: true
              }
            ]
        })
    } );


    return(
        <div className={estilos.contenedor}>
            <Link className={estilos.botonV} to="/ProyectoWebServlet/home">Volver</Link>

            <div className={estilos.titulo}>
                <h1>EJERCICIO {e.id}</h1>
            </div>
            
            <div className={estilos.ejercicio}>
                <h1>{P}</h1>

                <p>TU RESPUESTA: </p>
                <input
                    type="number" 
                    className={estilos.input}
                    value = {respuesta}
                    onChange = {(e) => setRespuesta(e.target.value)}
                    onWheel = {(e) => e.target.blur()}
                /> <br /><br />
                <button className={estilos.boton} onClick={handleOnClick}>EVALUAR</button>
                <p className={estilos.graf} id="Grafica"></p>
            </div>

            <div>
                <p className={estilos.prueba}>RESULTADO: {isCorrecto ? 'Correcto' : 'Incorrecto'}</p>
            </div>
        </div>
    );
}