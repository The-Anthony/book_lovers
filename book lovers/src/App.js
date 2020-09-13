import React from 'react';
import './App.css';


// Componenti
import Homepage from './Components/Homepage';
import SearchPage from './Components/searchPage';
import BookPage from './Components/BookPage';
import errorBook from './Components/errorBook'
import {IsbnProvider} from './Components/IsbnContext';
import errorSearch from './Components/errorSearch'

import {BrowserRouter, Switch, Route} from 'react-router-dom' //Componenti necessari di React Router

function App() {

  return (
    <IsbnProvider>
        <BrowserRouter>
          <div className="App">
            <Switch> 
              <Route exact path='/' component={Homepage} />
              <Route exact path='/search' component={SearchPage} />
              <Route exact path='/404' component={errorBook} />
              <Route exact path='/error' component={errorSearch} />
              <Route exact path='/:book' component={BookPage} />
            </Switch>
        </div>
      </BrowserRouter>
    </IsbnProvider>
    
  );
}

export default App;