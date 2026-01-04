<template>
    <h1 class="h3 mb-4 fw-bold text-dark">Article edit</h1>

    <ArticleForm ref="articleFormRef" />

    <div class="d-flex align-items-center justify-content-between mb-4 mt-3">
        <BaseButton @click="router.push({ name: 'article.list' })" class="btn-light border shadow-sm">
            <i class="bi bi-arrow-left me-2"></i>Back
        </BaseButton>
        <BaseButton class="btn-dark" :disabled="isLoading" @click="handleUpdate()">
            {{ isLoading ? 'Saving...' : 'Save' }}
        </BaseButton>
    </div>
</template>

<script setup>
import ArticleForm from '@/components/form/ArticleForm.vue'
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useArticleStore } from '@/stores/article';
const articleStore = useArticleStore()
const router = useRouter()
const route = useRoute()
const isLoading = ref(false)
const articleFormRef = ref(null)

const articleUpdate = route.params.id

onMounted(async () => {
    try {
        const formRef = articleFormRef.value
        const form = formRef.formData
        await articleStore.fetchArticleById(articleUpdate)

        form.title = articleStore.article.title
        form.categoryId = articleStore.article.category?.id || ''
        form.content = articleStore.article.content
        formRef.existingThumbnail = articleStore.article.thumbnail
    } catch (error) {
        console.error(error);
    }
})

const handleUpdate = async () => {
    const formRef = articleFormRef.value
    if (!formRef.validateForm()) return
}
</script>