import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeWrapper } from './features/theme';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeWrapper>
        <App />
    </ThemeWrapper>
  </Provider>
);
