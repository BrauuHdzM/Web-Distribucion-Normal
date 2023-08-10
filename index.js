import React from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import Home from "./components/home";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/styles.css";
import Login from "./components/login";
import Formulario from "./components/formulario";
import Modifica from "./components/modifica";
import Pregunta from "./components/pregunta";
import Ver from "./components/Visualizar";
import Probar from "./components/ProbarEjercicio";

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/ProyectoWebServlet/">
                    <Login />
                </Route>
                <Route exact path="/ProyectoWebServlet/home">
                    <Home />
                </Route>
                <Route exact path="/ProyectoWebServlet/formulario">
                    <Formulario />
                </Route>
                <Route exact path="/ProyectoWebServlet/modifica/:ID" render={props=>{var ID=props.match.params.ID;
                return <Modifica ID={ID}/>
                }}/>
                <Route exact path="/ProyectoWebServlet/ver/:ID" render={props=>{var ID=props.match.params.ID;
                return <Ver ID={ID}/>
                }}/>
                <Route exact path="/ProyectoWebServlet/probar/:ID" render={props=>{var ID=props.match.params.ID;
                return <Probar ID={ID}/>
                }}/>


                <Route path="*" render={() => <Redirect to='/ProyectoWebServlet/'/>} />
            </Switch>
        </div>
    );
}
export default App;