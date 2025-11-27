import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './Store/store.jsx';
import { AuthProvider } from './context/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
 <StrictMode>
  <AuthProvider>
 <App />
  </AuthProvider>
  </StrictMode>
  </Provider>
 ,
)

