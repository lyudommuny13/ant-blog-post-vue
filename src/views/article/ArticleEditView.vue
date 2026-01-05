<template>
    <h1 class="h3 mb-4 fw-bold text-dark">Article edit</h1>

    <ArticleForm ref="articleFormRef" />

    <div class="d-flex align-items-center justify-content-between mb-4 mt-3">
        <BaseButton @click="router.push({ name: 'article.list' })" class="btn-light border shadow-sm">
            <i class="bi bi-arrow-left me-2"></i>Back
        </BaseButton>
        <BaseButton variant="dark" :disabled="isLoading" @click="handleUpdate()">
            {{ isLoading ? 'Updating...' : 'Update Article' }}
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

const articleFormRef = ref(null)
const isLoading = ref(false)
const articleId = route.params.id

// get data to show
onMounted(async () => {
    await articleStore.fetchArticleById(articleId)
    const data = articleStore.article
    const editForm = articleFormRef.value.formData

    editForm.title = data.title
    editForm.categoryId = data.category?.id || ''
    editForm.content = data.content
    articleFormRef.value.existingThumbnail = data.thumbnail || ''
})

// handle update
const handleUpdate = async () => {
    const formRef = articleFormRef.value

    if (!formRef.validateForm()) return

    try {
        isLoading.value = true
        const form = formRef.formData

        await articleStore.editArticle(articleId, {
            title: form.title.trim(),
            categoryId: Number(form.categoryId),
            content: form.content.trim()
        })

        if (form.thumbnail instanceof File) {
            const uploadData = new FormData()
            uploadData.append('thumbnail', form.thumbnail)
            await articleStore.createThumbnail(articleId, uploadData)
        }

        formRef.resetForm()
        router.push({ name: 'article.list' })
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false
    }
}
</script>