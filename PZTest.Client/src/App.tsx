import React from 'react'
import logo from './logo.svg'
import { PersistGate } from 'redux-persist/integration/react'
import './App.css'
import { Provider } from 'react-redux'
import { store, persistor } from './root-reducer'
import { Router, Switch, Route } from 'react-router-dom'
import { TopMenu } from './components'
import { createBrowserHistory } from 'history'
import { Home, Admin, Detail } from './pages'

const history = createBrowserHistory()

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  )
}

export default App
