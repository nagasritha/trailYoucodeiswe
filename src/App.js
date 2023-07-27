import {Route, Redirect, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import PreventDefault from './components/PreventDefault'
import NotFound from './components/NotFound'
import Jobs from './components/Jobs'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <PreventDefault exact path="/" component={Home} />
    <PreventDefault exact path="/jobs" component={Jobs} />
    <Route component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
