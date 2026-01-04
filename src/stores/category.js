import { defineStore } from "pinia";
import api from '@/api/api'
import { ref } from "vue";

export const useCategoryStore = defineStore('category', () => {

    const categories = ref([])
    const isLoading = ref(false)

    const fetchCategory = async () => {
        try {
            isLoading.value = true
            const res = await api.get("/categories?&_per_page=20")
            categories.value = res.data.data.items
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false
        }
    }
    return { isLoading, categories, fetchCategory }
});