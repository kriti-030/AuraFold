import { Navigate, useParams } from "react-router-dom";

const CATEGORY_REDIRECTS = {
  women: "/products/women",
  men: "/products/men",
  kids: "/products/kids",
  footwear: "/products/footwear",
};

/** Legacy /products/category/:id → new Products page category routes. */
export default function CategoryPage() {
  const { categoryId } = useParams();
  const target = CATEGORY_REDIRECTS[categoryId] || "/products";
  return <Navigate to={target} replace />;
}
