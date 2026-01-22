import Header from './Components/Layout/Navbar';
import { BrowserRouter } from 'react-router-dom';
import PageRoutes from './AppRouter/PageRoutes';
import Footer from './Components/Layout/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="app-content">
        <PageRoutes />
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
