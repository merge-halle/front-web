import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import ProductInfoInput from './pages/ProductInfoInput/ProductInfoInput';
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
          <Route path="/" element={<ProductInfoInput />} />
          <Route
            path="/review"
            element={<TestProductReview />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
