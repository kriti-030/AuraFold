import { useCallback, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthDrawer from "./components/AuthDrawer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CategoryPage from "./pages/CategoryPage";
import { ProductsSearchProvider } from "./context/ProductsSearchContext";

function AppShell({ onOpenAuth, authOpen, authMode, setAuthMode, closeAuth }) {
  return (
    <ProductsSearchProvider>
      <a className="skip" href="#home">
        Skip to content
      </a>
      <Navbar onOpenAuth={onOpenAuth} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/men" element={<ProductsPage />} />
        <Route path="/products/women" element={<ProductsPage />} />
        <Route path="/products/kids" element={<ProductsPage />} />
        <Route path="/products/footwear" element={<ProductsPage />} />
        <Route path="/products/footwear/:gender" element={<ProductsPage />} />
        <Route
          path="/products/footwear/:gender/:style"
          element={<ProductsPage />}
        />
        <Route
          path="/products/category/:categoryId"
          element={<CategoryPage />}
        />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <AuthDrawer
        open={authOpen}
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={closeAuth}
      />
    </ProductsSearchProvider>
  );
}

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuth = useCallback((mode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setAuthOpen(false);
  }, []);

  return (
    <BrowserRouter>
      <AppShell
        onOpenAuth={openAuth}
        authOpen={authOpen}
        authMode={authMode}
        setAuthMode={setAuthMode}
        closeAuth={closeAuth}
      />
    </BrowserRouter>
  );
}
