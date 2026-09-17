import { Link, Navigate, useParams } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../data/productsCatalog";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const product = getProductById(productId);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const related = getRelatedProducts(product);

  return (
    <main className="product-detail">
      <div className="product-detail__inner">
        <p className="product-detail__crumb">
          <Link to="/products">Products</Link>
          <span aria-hidden="true"> / </span>
          <span>{product.subcategory}</span>
        </p>

        <div className="product-detail__layout">
          <div className="product-detail__media">
            <img
              src={product.image}
              alt=""
              width="1400"
              height="1100"
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="product-detail__copy">
            <p className="product-detail__cat">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="product-detail__sub">{product.subcategory}</p>
            <p className="product-detail__overview">{product.description}</p>

            <div className="product-detail__block">
              <h2>Applications</h2>
              <ul>
                {(product.applications || []).map((app) => (
                  <li key={app}>{app}</li>
                ))}
              </ul>
            </div>

            <a className="btn btn--gold" href="/#inquiry">
              Send an Inquiry
            </a>
          </div>
        </div>

        {related.length ? (
          <section className="product-detail__related">
            <h2>Related Materials</h2>
            <div className="products-results__grid">
              {related.map((item) => (
                <article key={item.id} className="material-result">
                  <Link className="material-result__media" to={`/products/${item.id}`}>
                    <img
                      src={item.image}
                      alt=""
                      width="1200"
                      height="900"
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                  <div className="material-result__body">
                    <p className="material-result__cat">{item.subcategory}</p>
                    <h3>
                      <Link to={`/products/${item.id}`}>{item.name}</Link>
                    </h3>
                    <p className="material-result__desc">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
