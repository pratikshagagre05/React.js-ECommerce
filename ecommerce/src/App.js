import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import Wishlist from "./pages/Wishlist";
import { AppProvider } from "./context/AppContext";
import ProductDetails from "./pages/ProductDetails";
import CategoryBar from "./components/CategoryBar";
import useProducts from "./hooks/useProducts";

function App() {
  const { products } = useProducts();
  const categories = [...new Set(products.map((p) => p.category))];
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <CategoryBar categories={categories} />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
