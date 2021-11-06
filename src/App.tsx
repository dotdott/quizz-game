import Home from "./views/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./global/global.scss";
import Questions from "views/Questions";
import History from "views/History";
import { Icons } from "components";

function App() {
  return (
    <div className="App bg-color">
      <a href="/" style={{ padding: "0 16px" }}>
        <Icons name="home" Styles={{ fontSize: 36 }} />
      </a>

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
