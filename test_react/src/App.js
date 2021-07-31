import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./Component/Pages/Dashboard";
import Tutorial from "./Component/Pages/Tutorial";
import Home from "./Component/Pages/Home";
import Landing from "./Component/Pages/Landing";
import Report from "./Component/Pages/Report";
import ProtectedRoute from "./Component/routing/ProtectedRoute";
import AuthContextProvider from "./context/AuthContext";
import PlanConTextProvider from "./context/PlanContext";
import Auth from "./features/Auth/Auth";

function App() {
  return (
    <AuthContextProvider>
      <PlanConTextProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route
                exact
                path="/login"
                render={(props) => <Auth {...props} authRoute="login" />}
              />
              <Route
                exact
                path="/register"
                render={(props) => <Auth {...props} authRoute="register" />}
              />
              <ProtectedRoute exact path="/home" exact component={Home} />
              <ProtectedRoute exact path="/dashboard" component={Dashboard} />
              <ProtectedRoute exact path="/report" exact component={Report} />
              <ProtectedRoute exact path="/tutorial"exact component={Tutorial}/>
            </Switch>
          </Router>
      </PlanConTextProvider>
    </AuthContextProvider>
  );
}

export default App;
