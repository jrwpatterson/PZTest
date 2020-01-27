import React from 'react'
import logo from './logo.svg'
import { PersistGate } from 'redux-persist/integration/react'
import './App.css'
import { Provider } from 'react-redux'
import { store, persistor } from './root-reducer'
import { Router, Switch, Route } from 'react-router-dom'
import { TopMenu } from './components'
import { createBrowserHistory } from 'history'
import { Provider as HttpProvider } from 'use-http'
import Home from './pages/home'
import Detail from './pages/detail'
import Admin from './pages/admin'

const history = createBrowserHistory()

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HttpProvider url='http://localhost:5001'>
          <Router history={history}>
            <TopMenu />
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/admin'>
                <Admin />
              </Route>
              <Route path='/detail'>
                <Detail />
              </Route>
            </Switch>
          </Router>
        </HttpProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
