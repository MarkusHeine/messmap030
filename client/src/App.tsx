import React from "react";
import { Switch, Route } from "react-router-dom";
import NewEntryComponents from "./components/newEntry.component";
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
                    <Route
                        path="/newEntry"
                        exact
                        component={NewEntryComponents}
                    />
                </Switch>
            </main>
        </div>
    );
};

export default App;
