import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
function App() {
  return (
    <div className="App">
        <Navigation/>
        <Routes>
          <Route path="/" element={<Products/>}/>
          <Route path="/addProduct" element={<AddProduct/>}/>
        </Routes>
    </div>
  );
}

export default App;
