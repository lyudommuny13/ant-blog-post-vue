import { defineStore } from "pinia";
import api from '@/api/api';
import { ref } from "vue";

export const useCategoryStore = defineStore('category', () => {
    const categories = ref([]);
    const isLoading = ref(false);
    const page = ref(1);
    const hasMore = ref(true);
    const searchQuery = ref('');

    const fetchCategory = async (isLoadMore = false, search = '') => {
        try {
            isLoading.value = true;
            searchQuery.value = search;

            if (!isLoadMore) {
                page.value = 1;
            }

            const res = await api.get("/categories", {
                params: {
                    search: searchQuery.value,
                    _page: page.value,
                    _per_page: 15,
                    sortBy: "createdAt",
                    sortDir: "desc"
                }
            });

            const items = res.data.data.items || [];

            if (isLoadMore) {
                categories.value.push(...items);
            } else {
                categories.value = items;
            }

            hasMore.value = res.data.data.meta.hasNextPage === true;
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    const fetchMoreCategories = async () => {
        if (!hasMore.value || isLoading.value) return;

        page.value++;
        await fetchCategory(true, searchQuery.value);
    };

    const createCategory = async (payLoad) => {
        try {
            const res = await api.post("categories", payLoad);
            return res.data;
        } catch (error) {
            console.warn("Create failed");
            return null;
        }
    };

    const deleteCategory = async (id) => {
        try {
            const res = await api.delete(`/categories/${id}`);
            return res.data;
        } catch (error) {
            console.warn("Delete failed");
            return null;
        }
    };

    const fetchCategoryById = async (id) => {
        try {
            const res = await api.get(`/categories/${id}`);
            return res.data.data;
        } catch (error) {
            console.warn("Fetch by ID failed");
            return null;
        }
    };

    const updateCategory = async (id, payLoad) => {
        try {
            const res = await api.put(`/categories/${id}`, payLoad);
            return res.data;
        } catch (error) {
            console.warn("Update failed");
            return null;
        }
    };

    return {
        hasMore, isLoading, categories, searchQuery,
        fetchMoreCategories,
        fetchCategory,
        createCategory,
        deleteCategory,
        fetchCategoryById,
        updateCategory
    };
});