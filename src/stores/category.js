import { defineStore } from "pinia";
import api from '@/api/api'
import { ref } from "vue";

export const useCategoryStore = defineStore('category', () => {

    const categories = ref([])
    const isLoading = ref(false)

    const page = ref(1)
    const hasMore = ref(true)

    const fetchCategory = async (isLoadMore = false, search = '') => {
        try {
            isLoading.value = true
            const res = await api.get("/categories?", {
                params: {
                    search: search,
                    _page: page.value,
                    _per_page: 9,
                    sortBy: "createdAt",
                    sortDir: "desc"
                }
            })

            const items = res.data.data.items || []

            if (isLoadMore) {
                categories.value.push(...items);
            } else {
                page.value = 1;
                categories.value = items
            }

            hasMore.value = res.data.data.meta.hasNextPage === true
        } catch (error) {
            throw error
        } finally {
            isLoading.value = false
        }
    }

    const fetchMoreCategories = async () => {
        if (!hasMore.value) return

        page.value++
        await fetchCategory(true)
    }

    const createCategory = async (payLoad) => {
        try {
            const res = await api.post("categories", payLoad)
            return res.data
        } catch (error) {
            throw error
        }
    }

    const deleteCategory = async (id) => {
        try {
            const res = await api.delete(`/categories/${id}`)
            return res.data
        } catch (error) {
            throw error
        }
    }

    const fetchCategoryById = async (id) => {
        try {
            const res = await api.get(`/categories/${id}`)
            return res.data.data
        } catch (error) {
            throw error
        }
    }

    const updateCategory = async (id, payLoad) => {
        try {
            const res = await api.put(`/categories/${id}`, payLoad)
            return res.data
        } catch (error) {
            throw error
        }
    }

    return {
        hasMore, isLoading, categories, 
        fetchMoreCategories,
        fetchCategory,
        createCategory,
        deleteCategory,
        fetchCategoryById,
        updateCategory
    }
});