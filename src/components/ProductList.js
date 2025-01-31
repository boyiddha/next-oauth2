import { getAllProducts } from "@/data/products";
import Link from "next/link";

const ProductList = () => {
  const products = getAllProducts();
  return (
    <div>
      {products.map((product) => (
        <Link href={`/products/${product.id}`}>
          <div className="text-2xl">
            <p>
              {product.image} - {product.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
