import { defineStore } from "pinia";
import api from '@/api/api'
import { ref } from "vue";

export const useArticleStore = defineStore('article', () => {

    const articles = ref([])
    const article = ref(null)
    const ownArticles = ref([])
    const isLoading = ref(false)

    const page = ref(1)
    const hasMore = ref(true)
    const searchQuery = ref('');

    const fetchArticle = async (isLoadMore = false, search = '') => {
        try {
            isLoading.value = true
            searchQuery.value = search

            if (!isLoadMore) {
                page.value = 1;
            }

            const res = await api.get("articles", {
                params: {
                    search: searchQuery.value,
                    _page: page.value,
                    _per_page: 9,
                    sortBy: "createdAt",
                    sortDir: "desc"
                }
            })

            const items = res.data.data.items || [];
            if (isLoadMore) {
                articles.value.push(...items);
            } else {
                articles.value = items;
            }

            hasMore.value = res.data.data.meta.hasNextPage === true;
        } catch (error) {
            throw error
        } finally {
            isLoading.value = false
        }
    }

    const fetchMoreArticles = async () => {
        if (!hasMore.value) return

        page.value++
        await fetchArticle(true, searchQuery.value)
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
        hasMore,
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
        deleteArticle,
        fetchMoreArticles
    }
});