import { defineStore } from "pinia";
import api from '@/api/api'
import { ref } from "vue";

export const useArticleStore = defineStore('article', () => {

    const articles = ref([])
    const article = ref(null)
    const ownArticles = ref([])
    const isLoading = ref(false)

    const fetchArticle = async () => {
        try {
            isLoading.value = true
            const res = await api.get("/articles?sortBy=createdAt&sortDir=desc")
            articles.value = res.data.data.items
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false
        }
    }

    const fetchArticleById = async (id) => {
        try {
            const res = await api.get(`/articles/${id}`)
            article.value = res.data.data
        } catch (error) {
            console.error(error);
        }
    }

    const fetchOwnArticle = async () => {
        try {
            const res = await api.get('/articles/own')
            ownArticles.value = res.data.data.items
        } catch (error) {
            console.error(error)
        }
    }

    // create article, create thumbnail
    const createArticle = async (payload) => {
        try {
            const res = await api.post('/articles', payload)
            return res.data
        } catch (error) {
            console.error(error);
        }
    }

    const createThumbnail = async (id, payload) => {
        try {
            const res = await api.post(`/articles/${id}/thumbnail`, payload, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            return res.data
        } catch (error) {
            console.error(error);
        }
    }

    const editArticle = async (id, payload) => {
        try {
            const res = await api.put(`/articles/${id}`, payload)
            return res.data
        } catch (error) {
            console.error(error);
        }
    }

    const deleteArticle = async (id) => {
        try {
            const res = await api.delete(`/articles/${id}`)
            return res.data
        } catch (error) {
            console.error(error);
        }
    }

    return {
        ownArticles,
        article,
        isLoading,
        articles,
        fetchOwnArticle,
        fetchArticle,
        fetchArticleById,
        createArticle,
        createThumbnail,
        editArticle,
        deleteArticle
    }
});