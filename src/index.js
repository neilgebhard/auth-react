import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './store/auth';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById('root')
);
