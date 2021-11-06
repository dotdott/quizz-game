import Home from "./views/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./global/global.scss";
import Questions from "views/Questions";
import History from "views/History";

function App() {
  return (
    <div className="App bg-color">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/questions" component={Questions} />
          <Route path="/history/:id" component={History} />

          <Route path="/*" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
