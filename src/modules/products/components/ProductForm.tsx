'use client';

import { useEffect } from 'react';
import { Product, ProductCategory } from '@prisma/client';
import {
  Input,
  Button,
  Textarea,
  Label,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { upsertProduct } from '../services';
import { useRouter } from 'next/navigation';

const ProductForm = (props: { product: Product | null }) => {
  const { product } = props;
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<Product>({
    defaultValues: {
      name: product?.name || '',
      category: product?.category || ProductCategory.OTHERS,
      description: product?.description || '',
      price: product?.price || 0,
      quantity: product?.quantity || 0,
    },
  });

  // Update form values when editing an existing product
  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('category', product.category);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('quantity', product.quantity);
    }
  }, [product, setValue]);

  const onSubmitForm = async (data: Product) => {
    const _product = {
      ...data,
      price: parseFloat(data.price?.toString() || '0'),
      quantity: parseInt(data.quantity?.toString() || '0'),
      category: data.category,
    };
    await upsertProduct(_product);
    // Refresh the route so that updated product list is shown
    router.push('/dashboard/products');
  };

  return (
    <Card className="w-[500px] mx-auto mt-10">
      <form className="max-w-lg" onSubmit={handleSubmit(onSubmitForm)}>
        <CardHeader>
          <CardTitle>Product</CardTitle>
          <CardDescription>Create New Product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="my-2">
            <Label htmlFor="name">Product Name</Label>
            <Input {...register('name')} id="name" required />
          </div>
          <div className="my-2">
            <Label htmlFor="category">Category</Label>
            <Select
              required
              onValueChange={(value) =>
                setValue('category', value as ProductCategory)
              }
              defaultValue={product?.category || ProductCategory.OTHERS}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ProductCategory).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="my-2">
            <Label htmlFor="description">Description</Label>
            <Textarea {...register('description')} id="description" />
          </div>
          <div className="my-2">
            <Label htmlFor="price">Price</Label>
            <Input
              {...register('price')}
              type="number"
              id="price"
              step="0.01"
            />
          </div>
          <div className="my-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input {...register('quantity')} type="number" id="quantity" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard/products">Back</Link>
          </Button>
          <Button type="submit">
            {product?.id ? 'Update Product' : 'Add Product'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProductForm;

