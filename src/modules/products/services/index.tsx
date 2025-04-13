'use server';

import { prisma } from '@/lib/prisma';
import { Product } from '@prisma/client';
import { redirect } from 'next/navigation';

export const getProducts = async () => {
  const result = await prisma.product.findMany({
    include: { images: true },
  });
  return result;
};

export const getProductsAPI = async () => {
  // Use an environment variable to set the base URL if available,
  // otherwise fallback to a default (like 'http://localhost:3000')
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const result = await fetch(`${baseUrl}/api/product`);
  const response = await result.json();
  return response;
};

export const getProductById = async (id: string) => {
  const result = await prisma.product.findFirst({
    where: { id },
    include: { images: true },
  });
  if (!result) {
    return null;
  }
  return result;
};

export const upsertProduct = async (product: Product) => {
  const { id } = product;
  let result;
  if (id) {
    result = await prisma.product.update({
      where: { id },
      data: product,
    });
  } else {
    result = await prisma.product.create({
      data: product,
    });
  }
  return result;
};

export const deleteProduct = async (id: string) => {
  await prisma.product.delete({ where: { id } });
  redirect('/dashboard/products');
};
