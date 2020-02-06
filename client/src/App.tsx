import React from "react";
// import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";
import HomeComponent from "./components/home";
import NewEntryComponents from "./components/newEntry";

const App: React.FC = () => {
    return (
        <div className="App">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/newEntry"> new Entry (secret)</Link>
                    </li>
                </ul>
            </nav>
            <main>
                <Switch>
                    <Route path="/" exact component={HomeComponent} />
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
