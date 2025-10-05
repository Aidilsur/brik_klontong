<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { z } from "zod";
import Input from "../components/Input.vue";
import { useProductStore } from "../store/product";
import { categories } from "../constants";
import { updateProductSchema } from "../validation/product";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const loading = ref(true);

const form = reactive({
  id: 0,
  CategoryId: "" as number | "",
  categoryName: "",
  sku: "",
  name: "",
  description: "",
  weight: "",
  width: "",
  length: "",
  height: "",
  image: "",
  price: "",
});

const errors = reactive<Record<string, string>>({});

function onCategoryChange() {
  const selected = categories.find(
    (c) => c.CategoryId === Number(form.CategoryId)
  );
  if (selected) {
    form.categoryName = selected.categoryName;
  } else {
    form.categoryName = "";
  }
}

async function fetchProduct(id: number) {
  loading.value = true;
  try {
    const res = await productStore.fetchProductById(id);
    if (!res) throw new Error("Product not found");

    form.id = res.id;
    form.CategoryId = res.CategoryId;
    form.categoryName = res.categoryName;
    form.sku = res.sku;
    form.name = res.name;
    form.description = res.description;
    form.weight = res.weight;
    form.width = res.width;
    form.length = res.length;
    form.height = res.height;
    form.image = res.image;
    form.price = res.price;
  } catch (error) {
    console.error(error);
    alert("Failed to load product data.");
    router.push("/");
  } finally {
    loading.value = false;
  }
}

async function onSubmit() {
  Object.keys(errors).forEach((key) => (errors[key] = ""));

  const result = updateProductSchema.safeParse(form);
  if (!result.success) {
    for (const err of result.error.issues) {
      const field = err.path[0] as string;
      errors[field] = err.message;
    }
    return;
  }

  try {
    await productStore.updateProduct(result.data.id, result.data);
    router.push("/");
  } catch (error) {
    console.error("Failed to update product:", error);
    alert("Gagal update produk.");
  }
}

onMounted(() => {
  const productId = Number(route.params.id);
  if (isNaN(productId)) {
    alert("Invalid product id");
    router.push("/");
  } else {
    fetchProduct(productId);
  }
});
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Detail Product</h1>

    <form @submit.prevent="onSubmit" class="space-y-4" v-if="!loading">
      <!-- Category Select -->
      <div class="flex flex-col space-y-1 w-full">
        <label for="CategoryId" class="input-label">Category</label>
        <select
          id="CategoryId"
          name="CategoryId"
          v-model="form.CategoryId"
          class="input border-gray-300"
          required
          @change="onCategoryChange"
        >
          <option value="" disabled>Pilih kategori</option>
          <option
            v-for="category in categories"
            :key="category.CategoryId"
            :value="category.CategoryId"
          >
            {{ category.categoryName }}
          </option>
        </select>
        <p
          v-if="errors.CategoryId"
          id="CategoryId-error"
          class="text-error text-xs mt-1"
        >
          {{ errors.CategoryId }}
        </p>
      </div>

      <Input
        label="SKU"
        name="sku"
        v-model="form.sku"
        :errorMessage="errors.sku"
        required
      />
      <Input
        label="Name"
        name="name"
        v-model="form.name"
        :errorMessage="errors.name"
        required
      />
      <Input
        label="Description"
        name="description"
        v-model="form.description"
        :errorMessage="errors.description"
      />
      <Input
        label="Weight (gram)"
        name="weight"
        type="number"
        v-model="form.weight"
        :errorMessage="errors.weight"
        required
      />
      <Input
        label="Width (cm)"
        name="width"
        type="number"
        v-model="form.width"
        :errorMessage="errors.width"
        required
      />
      <Input
        label="Length (cm)"
        name="length"
        type="number"
        v-model="form.length"
        :errorMessage="errors.length"
        required
      />
      <Input
        label="Height (cm)"
        name="height"
        type="number"
        v-model="form.height"
        :errorMessage="errors.height"
        required
      />
      <Input
        label="Image URL"
        name="image"
        type="url"
        v-model="form.image"
        :errorMessage="errors.image"
        required
      />
      <Input
        label="Price (Rp)"
        name="price"
        type="number"
        v-model="form.price"
        :errorMessage="errors.price"
        required
      />

      <div class="flex justify-between pt-4">
        <router-link to="/" class="btn btn-secondary"> Cancel </router-link>
        <button type="submit" class="btn btn-solid-primary">Update</button>
      </div>
    </form>

    <p v-if="loading" class="text-center">Loading product data...</p>
  </div>
</template>
