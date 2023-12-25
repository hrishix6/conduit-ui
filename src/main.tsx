import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeWrapper } from './features/theme'
import {Provider} from "react-redux";
import { store } from './store';
import { App } from './app';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
     <ThemeWrapper>
      <BrowserRouter>
          <App />
      </BrowserRouter>
     </ThemeWrapper>
    </Provider>
  </React.StrictMode>,
)
