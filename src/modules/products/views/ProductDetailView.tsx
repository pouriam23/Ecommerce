import React from 'react';
import { getProductById } from '../services';
import ProductFormWithAction from '../components/ProductFormWithAction';

async function ProductDetailView(props: { id: string }) {
  const { id } = props;
  const product = await getProductById(id);
  return (
    <div>
      <ProductFormWithAction product={product} />
    </div>
  );
}

export default ProductDetailView;
