import { getProductById } from "@/data/products";
import Link from "next/link";
const ProductDetailsPage = ({ params: { id } }) => {
  const product = getProductById(id);
  return (
    <div>
      <p>{product.image}</p>
      <p>{product.name}</p>
      <p>{product.details}</p>
      <Link href={`/products/${id}/checkout`}>Buy It</Link>
    </div>
  );
};

export default ProductDetailsPage;
