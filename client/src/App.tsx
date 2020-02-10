import React from "react";
import { Switch, Route } from "react-router-dom";
import NewEntryComponents from "./components/newEntry.component";
import { Container, Row, Col } from "react-bootstrap";
import NavigationHeader from "./components/Header.component";
import "./App.css";
import LoginComponment from "./components/Login.component";
import RegisterComponent from "./components/Register.component";

const App: React.FC = () => {
    return (
        <div className="App">
            <nav>
                <Container fluid>
                    <Row>
                        <Col>
                            <NavigationHeader></NavigationHeader>
                        </Col>
                    </Row>
                </Container>
            </nav>
            <main>
                <Switch>
                    <Route
                        path="/newEntry"
                        exact
                        component={NewEntryComponents}
                    />
                    <Route path="/login" component={LoginComponment} />
                    <Route path="/register" component={RegisterComponent} />
                </Switch>
            </main>
        </div>
    );
};

export default App;
