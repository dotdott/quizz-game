import Home from "./views/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./global/global.scss";
import Questions from "views/Questions";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/questions" component={Questions} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
