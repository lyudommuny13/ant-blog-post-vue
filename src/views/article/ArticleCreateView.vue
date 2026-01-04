<template>
    <h1 class="h3 mb-4 fw-bold text-dark">Article create</h1>

    <ArticleForm ref="articleFormRef" />

    <div class="d-flex align-items-center justify-content-between mb-4 mt-3">
        <BaseButton @click="router.push({ name: 'dashboard' })" class="btn-light border shadow-sm">
            <i class="bi bi-arrow-left me-2"></i>Back
        </BaseButton>
        <BaseButton class="btn-dark" :disabled="isLoading" @click="handlePublish()">
            {{ isLoading ? 'Publishing...' : 'Publish Now' }}
        </BaseButton>
    </div>
</template>

<script setup>
import ArticleForm from '@/components/form/ArticleForm.vue';
import { useRouter } from 'vue-router';
import { useArticleStore } from '@/stores/article';
import { ref } from 'vue';

const articleStore = useArticleStore()
const router = useRouter()
const isLoading = ref(false)
const articleFormRef = ref(null)

const handlePublish = async () => {
    const formRef = articleFormRef.value
    if (!formRef.validateForm()) return

    try {
        isLoading.value = true
        const form = formRef.formData

        const res = await articleStore.createArticle({
            title: form.title.trim(),
            categoryId: Number(form.categoryId),
            content: form.content.trim()
        })

        const articleId = res.data.id

        if (form.thumbnail) {
            const formData = new FormData()
            formData.append('thumbnail', form.thumbnail)
            await articleStore.createThumbnail(articleId, formData)
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