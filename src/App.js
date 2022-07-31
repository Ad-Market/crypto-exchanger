import {BrowserRouter} from 'react-router-dom';
import AppRouter from './router/AppRouter';
import Header from './components/UI/header/Header';
import './styles/css/App.css';
import { Suspense } from 'react';
import Footer from './components/UI/Footer/Footer';

function App() {

  return (
    <div>
      <Suspense fallback={'...is Loading'}>
        <BrowserRouter>
            <Header />
            <AppRouter/>
            <Footer/>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
