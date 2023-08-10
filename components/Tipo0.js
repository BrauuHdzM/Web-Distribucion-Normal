import estilos from "../styles/Visualizar.module.css";
import { Link } from "react-router-dom";
import positiva from "../img/Positiva.jpg";
import negativa from "../img/Negativa.jpg";
import React, { useState } from "react";

export function T0( {ej} ){
    let imgMenor, imgMayor;
    const [hideMenor, setHideMenor] = useState(true);
    const [hideMayor, setHideMayor] = useState(true);

    if(ej.menor < 0){
        imgMenor = negativa;
    } else {
        imgMenor = positiva;
    }

    if(ej.mayor < 0){
        imgMayor = negativa;
    } else {
        imgMayor = positiva;
    }

    const handleOnClick = (e) =>{
        if(e.target.id === "Mayor"){
            setHideMayor(!hideMayor);
        } else{
            setHideMenor(!hideMenor);
        }
    };

    return(
        <div className={estilos.contenedor}>
            <Link className={estilos.boton} to="/ProyectoWebServlet/home">Volver</Link>

            <h4>Resultado: </h4>
            <p className={estilos.resultados}>P( {ej.menor} &lt; Z &lt; {ej.mayor} ) = {ej.resultado}</p>
            <h4>Explicación: </h4>
            <ol className={estilos.lista}>
                <li>
                    Dibujar la curva. La probabilidad de {ej.menor} &lt; Z &lt; {ej.mayor} es igual al área sombreada bajo la curva
                    <p className={estilos.graf} id="Grafica"></p>
                </li>
                <li>
                    Para hallar la probabilidad de P( {ej.menor} &lt; Z &lt; {ej.mayor} ) usámos la siguiente fórmula: 
                    <p>P( {ej.menor} &lt; Z &lt; {ej.mayor} ) = P( Z &lt; {ej.mayor} ) - P( Z &lt; {ej.menor} )</p>
                </li>
                <li>
                    Podemos encontrar P( Z &lt; {ej.mayor} ) usando una tabla de distribuciones normales estándar: &nbsp;
                    <button id="Mayor" onClick={handleOnClick}>Mostrar Tabla</button>
                    <div hidden={hideMayor}>
                        <img src={imgMayor} alt="Tabla de valores Z" className={estilos.tablasZ}/>
                    </div>
                </li>
                <li>
                    Podemos encontrar P( Z &lt; {ej.menor} ) usando una tabla de distribuciones normales estándar: &nbsp;
                    <button id="Menor" onClick={handleOnClick}>Mostrar Tabla</button>
                    <div hidden={hideMenor}>
                        <img src={imgMenor} alt="Tabla de valores Z" className={estilos.tablasZ}/>
                    </div>
                </li>
            </ol>

            <p>Al final tenemos que P( {ej.menor} &lt; Z &lt; {ej.mayor} ) = {ej.resultado}</p>
        </div>
    );
}