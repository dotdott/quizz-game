import Home from "./views/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./global/global.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
