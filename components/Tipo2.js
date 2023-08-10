import estilos from "../styles/Visualizar.module.css";
import { Link } from "react-router-dom";
import positiva from "../img/Positiva.jpg";
import negativa from "../img/Negativa.jpg";
import React, { useState } from "react";

export function T2( {ej} ){
    let imgMenor;
    const [hideImage, setHideImage] = useState(true);

    if(ej.menor < 0){
        imgMenor = negativa;
    } else{
        imgMenor = positiva;
    }

    return(
        <div className={estilos.contenedor}>
            <Link className={estilos.boton} to="/ProyectoWebServlet/home">Volver</Link>

            <h4>Resultado: </h4>
            <p className={estilos.resultados}>P( Z &gt; {ej.menor} ) = 1 - P( Z &lt; {ej.menor} ) = {ej.resultado}</p>
            <h4>Explicación: </h4>
            <ol className={estilos.lista}>
                <li>
                    Dibujar la curva. La probabilidad de Z &gt; {ej.menor} es igual al área sombreada bajo la curva
                    <p className={estilos.graf} id="Grafica"></p>
                </li>
                <li>
                    Para hallar la probabilidad de P( Z &gt; {ej.menor} ) debemos encontrar primero P( Z &lt; {ej.menor} )
                    que es la parte blanca debajo de la curva.
                </li>
                <li>
                    Podemos encontrar P( Z &lt; {ej.menor} ) usando una tabla de distribuciones normales estándar: &nbsp;
                    <button onClick={ (e) => {setHideImage(!hideImage)} }>Mostrar Tabla</button>
                    <div hidden={hideImage}>
                        <img src={imgMenor} alt="Tabla de valores Z" className={estilos.tablasZ} />
                    </div>
                </li>
                <li>
                    Una vez calculada el area blanca, resolvemos 1 - P( Z &lt; {ej.menor} )
                </li>
            </ol>

            <p>Al final tenemos que P( Z &gt; {ej.menor} ) = 1 - P( Z &lt; {ej.menor} ) = {ej.resultado}</p>
        </div>
    );
}