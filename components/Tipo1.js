import estilos from "../styles/Visualizar.module.css";
import { Link } from "react-router-dom";
import positiva from "../img/Positiva.jpg";
import negativa from "../img/Negativa.jpg";
import React, { useState } from "react";

export function T1( {ej} ){
    let imgMayor;
    const [hideImg, setHideImg] = useState(true);

    if(ej.menor < 0){
        imgMayor = negativa;
    } else{
        imgMayor = positiva;
    }

    return(
        <div className={estilos.contenedor}>
            <Link className={estilos.boton} to="/ProyectoWebServlet/home">Volver</Link>

            <h4>Resultado: </h4>
            <p className={estilos.resultados}>P( Z &lt; {ej.menor} ) = {ej.resultado}</p>
            <h4>Explicación: </h4>
            <ol className={estilos.lista}>
                <li>
                    Dibujar la curva. La probabilidad de Z &lt; {ej.menor} es igual al área sombreada bajo la curva
                    <p className={estilos.graf} id="Grafica"></p>
                </li>
                <li>
                    Podemos encontrar P( Z &lt; {ej.menor} ) usando una tabla de distribuciones normales estándar: &nbsp;
                    <button onClick={ (e) => {setHideImg(!hideImg)} }>Mostar Tabla</button>
                    <div hidden={hideImg}>
                        <img src={imgMayor} alt="Tabla de valores Z" className={estilos.tablasZ}/>
                    </div>
                </li>
            </ol>

            <p>Al final tenemos que P( Z &lt; {ej.menor} ) = {ej.resultado}</p>
        </div>
    );
}