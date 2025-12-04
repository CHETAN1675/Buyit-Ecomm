import Header from './Components/Layout/Navbar';
import { BrowserRouter } from 'react-router-dom';
import PageRoutes from './AppRouter/PageRoutes';


function App() {
    return(
        <BrowserRouter>
         <Header/>
        <PageRoutes/>
      </BrowserRouter>
    )

}

export default App;
