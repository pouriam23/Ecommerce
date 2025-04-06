import CatalogList from '@/components/catalog/list';
import CatalogSelector from '@/components/catalog/selector';
import React from 'react';

function Catalog() {
  return (
    <div className="flex flex-col items-center mx-auto my-4">
      <CatalogList />
      <CatalogSelector />
    </div>
  );
}

export default Catalog;