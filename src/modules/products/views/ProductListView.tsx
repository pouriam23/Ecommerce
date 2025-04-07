'use client';

import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { getProductsAPI } from '../services';
import { ProductsWithImages } from '@/types';

interface ProductsResponse {
  data: ProductsWithImages[];
}

function ProductListView() {
  const [products, setProducts] = useState<ProductsWithImages[]>([]);

  // Renamed function to avoid naming conflict
  const fetchProducts = async () => {
    // Annotate the response type so TS knows that 'data' exists
    const result: ProductsResponse = await getProductsAPI();
    setProducts(result.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

export default ProductListView;
