<template>
    <div class="d-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 fw-bold text-dark">All Articles</h1>
        <BaseButton @click="createArticle()" class="btn-dark border shadow-sm">
            Create Article
        </BaseButton>
    </div>

    <div class="row g-3 mb-3">
        <template v-if="articleStore.isLoading">
            <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="n in 6" :key="n">
                <ArticleCardSkeleton />
            </div>
        </template>
        <template v-else>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="article in articleStore.articles" :key="article.id">
                <ArticleCard :title="article?.title" :thumbnail="article?.thumbnail" :content="article?.content"
                    :avatar="article.creator?.avatar" :creator="article.creator?.firstName" :id="article?.id" />
            </div>
        </template>
    </div>
    <BaseButton class="w-100 shadow-sm" variant="dark" :isLoading="articleStore.isLoading" v-if="articleStore.hasMore"
        @click="articleStore.fetchMoreArticles()">
        <span>{{ articleStore.isLoading ? 'Loading...' : 'Load More' }}</span>
    </BaseButton>
</template>
<script setup>
import ArticleCard from '@/components/common/ArticleCard.vue';
import ArticleCardSkeleton from '@/components/common/ArticleCardSkeleton.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useArticleStore } from '@/stores/article';
import BaseButton from '@/components/ui/base/BaseButton.vue';

const articleStore = useArticleStore()
const router = useRouter()

const createArticle = () => {
    router.push({ name: 'article.create' })
}

onMounted(async () => {
    await articleStore.fetchArticle()
})

</script>