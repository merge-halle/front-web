import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';

const Layout = () => (
  <>
    <Header />
    <div className="wrap">
      <Outlet />
    </div>
  </>
);

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" />
          <Route path="/login" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
