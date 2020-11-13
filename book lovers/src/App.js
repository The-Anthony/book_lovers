import React from 'react';
import './App.css';


// Componenti
import Homepage from './Components/Homepage';
import SearchPage from './Components/searchPage';
import BookPage from './Components/BookPage';
import errorBook from './Components/errorBook'
import errorSearch from './Components/errorSearch';
import PageNotFound from './Components/pageNotFound';

//Context Provider
import {IsbnProvider} from './Components/IsbnContext';
import {BookProvider} from './Components/bookContext';

import {BrowserRouter, Switch, Route} from 'react-router-dom' //Componenti necessari di React Router

function App() {

  return (
    <BookProvider>
      <IsbnProvider>
          <BrowserRouter>
            <div className="App">
              <Switch> 
                <Route exact path='/' component={Homepage} />
                <Route exact path='/search' component={SearchPage} />
                <Route exact path='/404' component={errorBook} />
                <Route exact path='/error' component={errorSearch} />
                <Route exact path='/bookisbn=:isbn' component={BookPage} />
                <Route exact path='/:pagenotfound' component={PageNotFound}/>
              </Switch>
          </div>
        </BrowserRouter>
      </IsbnProvider>
    </BookProvider>
  );
}

export default App;