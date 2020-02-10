import React from "react";
import { Switch, Route } from "react-router-dom";
import NewEntryComponents from "./components/newEntry.component";
import { Container, Row } from "react-bootstrap";
import NavigationHeader from "./components/Header.component";
import "./App.css";
import LoginComponment from "./components/Login.component";
import RegisterComponent from "./components/Register.component";
import MapComponent from "./components/Map.component";

const App: React.FC = () => {
    return (
        <div className="App">
            <nav>
                <Container fluid>
                    <NavigationHeader></NavigationHeader>
                </Container>
            </nav>
            <main>
                <Container fluid>
                    <Row>
                        <Switch>
                            <Route
                                path="/newEntry"
                                exact
                                component={NewEntryComponents}
                            />
                            <Route path="/login" component={LoginComponment} />
                            <Route
                                path="/register"
                                component={RegisterComponent}
                            />
                        </Switch>
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        <MapComponent></MapComponent>
                    </Row>
                </Container>
            </main>
        </div>
    );
};

export default App;
