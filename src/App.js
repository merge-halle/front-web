import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Mainpage from './pages/Main/Mainpage';
import LoginPage from './pages/Login/Loginpage';
import TestProductDetail from './pages/TestProductDetail/TestProductDetail';
import TestProductReview from './pages/TestProductReview/TestProductReview';

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
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/review" element={<TestProductReview/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
