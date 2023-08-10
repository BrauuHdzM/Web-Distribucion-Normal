import functionPlot from "function-plot";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { T0 } from "./Tipo0";
import { T1 } from "./Tipo1";
import { T2 } from "./Tipo2";
import axios from "axios";


export default function Ver(props){

    const [e, setE] = useState({type:"", menor: "",mayor:"",resultado:""});
    const [carga, setCarga] = useState(true);


    
    

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
        }else if(e.type === "2"){
            r = [-3.14, e.menor];
            d = [-10, e.menor+4];
        }else{
            r = [e.menor, 3.14];
            d = [e.menor-4, 10];
        }

        functionPlot({
            target: "#Grafica",
            width: 701,
            height: 400,
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

    if(e.type === "1"){
        return <T0 ej={e}/>;
    } else if(e.type === "2"){
        return <T1 ej={e}/>;
    } else{
        return <T2 ej={e}/>;
    }
}