<script lang="ts">
import { defineComponent, ref, onMounted, watch, onBeforeUnmount } from "vue";
import { useProductStore } from "../store/product";
import Card from "../components/Card.vue";
import debounce from "lodash.debounce";
import Pagination from "../components/Pagination.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { Card, Pagination },
  setup() {
    const productStore = useProductStore();
    const searchQuery = ref(productStore.searchQuery);
    const router = useRouter();

    // Debounced function to update search query in store
    const debouncedSetSearch = debounce((val: string) => {
      productStore.setSearchQuery(val);
    }, 400);

    // Watch local searchQuery, call debounced setter
    watch(searchQuery, (val) => {
      debouncedSetSearch(val);
    });

    // Initial fetch
    onMounted(() => {
      productStore.fetchProducts();
    });

    // Cancel debounce on unmount
    onBeforeUnmount(() => {
      debouncedSetSearch.cancel();
    });

    const handleDetail = (id: number) => {
      alert(`Detail produk dengan id: ${id}`);
    };

    // Pagination page change handler
    const onChangePage = (page: number) => {
      productStore.setPage(page);
    };

    const handleDelete = (id: number) => {
      productStore.deleteProduct(id);
    };

    const handleCreate = () => {
      router.push("/create-product");
    };

    const handleUpdate = (id: number) => {
      router.push(`product/${id}/detail`);
    };

    return {
      productStore,
      searchQuery,
      handleDetail,
      onChangePage,
      handleDelete,
      handleCreate,
      handleUpdate,
    };
  },
});
</script>

<template>
  <div class="h-screen">
    <h1 class="text-2xl font-bold mb-4">Product Page</h1>

    <div class="flex items-center justify-between mb-8">
      <input
        type="text"
        placeholder="Cari produk..."
        class="border rounded px-3 py-2 mb-6"
        v-model="searchQuery"
      />
      <button @click="handleCreate" class="btn btn-solid-primary">
        Tambah Product
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <Card v-for="product in productStore.products" :key="product.id">
        <div class="p-3">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-40 object-cover rounded mb-3"
          />
          <h2 class="font-semibold text-lg mb-1">{{ product.name }}</h2>
          <p class="text-sm text-gray-500 mb-1">{{ product.categoryName }}</p>
          <p class="text-gray-700 mb-2 line-clamp-2">
            {{ product.description }}
          </p>

          <div class="mt-auto flex justify-between items-center">
            <span class="font-bold text-blue-600">
              Rp {{ product.price.toLocaleString() }}
            </span>

            <div class="flex items-center gap-2">
              <button
                class="btn btn-outline-primary"
                @click="handleUpdate(product.id)"
              >
                update
              </button>
              <button
                class="btn btn-outline-error"
                @click="handleDelete(product.id)"
              >
                delete
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
    <Pagination
      :currentPage="productStore.currentPage"
      :totalPages="productStore.totalPages"
      @change-page="(page) => productStore.setPage(page)"
    />
  </div>
</template>
