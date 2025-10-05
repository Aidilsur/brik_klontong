import z from "zod";

export const productSchema = z.object({
  CategoryId: z.coerce.number().min(1, "Category ID is required"),
  categoryName: z.string().min(1, "Category name is required"),
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  weight: z.coerce.number().min(1, "Weight must be at least 1"),
  width: z.coerce.number().min(1, "Width is required"),
  length: z.coerce.number().min(1, "Length is required"),
  height: z.coerce.number().min(1, "Height is required"),
  image: z.string().url("Invalid image URL"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
});

export const updateProductSchema = z.object({
  id: z.number(),
  CategoryId: z.coerce.number().min(1, "Category ID is required"),
  categoryName: z.string().min(1, "Category name is required"),
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  weight: z.coerce.number().min(1, "Weight must be at least 1"),
  width: z.coerce.number().min(1, "Width is required"),
  length: z.coerce.number().min(1, "Length is required"),
  height: z.coerce.number().min(1, "Height is required"),
  image: z.string().url("Invalid image URL"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
});
