import { prisma } from '@/lib/prisma';


export const getProductsAPI = async () => {
  const result = await fetch('/api/products');
  const response = await result.json();
  console.log(response);
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