<template>
    <div class="d-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 fw-bold text-dark">Detail Article</h1>
        <BaseButton @click="router.push({ name: 'dashboard' })" class="btn-light border shadow-sm">
            <i class="bi bi-arrow-left me-2"></i>Back
        </BaseButton>
    </div>

    <div class="detail-container">
        <div v-if="isLoading" class="article-detail placeholder-glow" aria-hidden="true">
            <h2 class="mb-3"><span class="placeholder col-8 rounded"></span></h2>

            <div class="card border-0 shadow-subtle mb-4">
                <div class="placeholder w-100 rounded" style="height: 400px;"></div>
            </div>

            <div class="d-flex gap-2 align-items-center mb-4">
                <div class="placeholder rounded-circle" style="width: 32px; height: 32px;"></div>
                <span class="placeholder col-2 rounded"></span>
                <span class="placeholder col-1 ms-auto rounded"></span>
            </div>

            <div class="article-content">
                <span class="placeholder col-12 mb-2"></span>
                <span class="placeholder col-12 mb-2"></span>
                <span class="placeholder col-10 mb-2"></span>
                <span class="placeholder col-12 mb-2"></span>
                <span class="placeholder col-6"></span>
            </div>
        </div>

        <div v-else class="article-detail">
            <h2 class="fw-bold mb-3 text-dark">{{ articleStore.article?.title }}</h2>

            <div class="card border-0 shadow-subtle overflow-hidden mb-4">
                <img :src="articleStore.article?.thumbnail" alt="Thumbnail" class="img-fluid object-fit-cover"
                    style="height: 450px; width: 100%;" />
            </div>

            <div class="article-meta d-flex align-items-center gap-3 mb-4 pb-4 border-bottom">
                <img :src="articleStore.article?.creator.avatar" alt="Creator Avatar"
                    class="rounded-circle border border-2 border-white shadow-sm" width="40" height="40" />

                <div>
                    <p class="mb-0 fw-semibold text-dark">
                        {{ articleStore.article?.creator.firstName }}
                        {{ articleStore.article?.creator.lastName }}
                    </p>
                    <small class="text-muted">
                        <i class="bi bi-calendar3 me-1"></i>
                        {{ new Date(articleStore.article?.createdAt).toLocaleDateString() }}
                    </small>
                </div>

                <div class="ms-auto">
                    <span class="badge rounded-pill bg-light text-primary px-3 py-2 border">
                        <i class="bi bi-tag-fill me-1"></i>
                        {{
                            articleStore.article?.category?.name || "uncategorized"
                        }}
                    </span>
                </div>
            </div>

            <div class="article-body lh-lg text-secondary" style="font-size: 1.1rem;">
                <p>
                    {{ articleStore.article?.content }}
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router'
import { useArticleStore } from '@/stores/article';
import { onMounted, ref } from 'vue';

const route = useRoute()
const router = useRouter()
const articleId = route.params.articleId
const articleStore = useArticleStore()
const isLoading = ref(false)

onMounted(async () => {
    isLoading.value = true
    try {
        await articleStore.fetchArticleById(articleId);
    } finally {
        isLoading.value = false
    }
})
</script>