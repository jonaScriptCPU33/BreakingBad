import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CharacterCreated from "./components/CharacterCreate";
import Details from "./components/Details";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route exact path="/character" component={CharacterCreated} />
          <Route exact path="/details/:id" component={Details} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
