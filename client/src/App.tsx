import React from "react";
// import axios from "axios";
import { Switch, Route } from "react-router-dom";
import HomeComponent from "./components/home";
import NewEntryComponents from "./components/newEntry";
import LoginComponent from "./components/login";
import { Container, Row, Col } from "react-bootstrap";
import NavigationHeader from "./components/Header.component";
import "./App.css";

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
                    <Route path="/" exact component={HomeComponent} />
                    <Route
                        path="/newEntry"
                        exact
                        component={NewEntryComponents}
                    />
                    <Route path="/login" component={LoginComponent} />
                </Switch>
            </main>
        </div>
    );
};

export default App;
