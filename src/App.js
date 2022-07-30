import {BrowserRouter} from 'react-router-dom';
import AppRouter from './router/AppRouter';
import Header from './components/UI/header/Header';
import './styles/css/App.css';
import { Suspense } from 'react';

function App() {

  return (
    <div>
      <Suspense fallback={'...is Loading'}>
        <BrowserRouter>
            <Header />
            <AppRouter/>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
