<template>
    <div class="d-flex align-items-center mb-4">
        <h1 class="h3 mb-0 fw-bold text-dark me-auto">All Articles</h1>
        <div class="me-3">
            <BaseInput placeholder="Search articles..." v-model="articleStore.searchQuery" />
        </div>
        <div>
            <BaseButton @click="createArticle()" class="btn btn-dark border shadow-sm d-flex align-items-center gap-2">
                <i class="bi bi-plus-lg"></i> Create Category
            </BaseButton>
        </div>
    </div>

    <div class="row g-3">
        <template v-if="articleStore.isLoading">
            <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="n in 6" :key="n">
                <ArticleCardSkeleton />
            </div>
        </template>
        <template v-else>
            <div v-if="!articleStore.articles?.length">
                <NoItemFound />
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="article in articleStore.articles" :key="article.id">
                <ArticleCard :title="article?.title" :thumbnail="article?.thumbnail" :content="article?.content"
                    :avatar="article.creator?.avatar" :creator="article.creator?.firstName" :id="article?.id" />
            </div>
        </template>
    </div>
    <BaseButton class="w-100 shadow-sm mt-3" variant="dark" :isLoading="articleStore.isLoading"
        v-if="articleStore.hasMore" @click="articleStore.fetchMoreArticles()">
        <span>{{ articleStore.isLoading ? 'Loading...' : 'Load More' }}</span>
    </BaseButton>
</template>
<script setup>
import ArticleCard from '@/components/common/ArticleCard.vue';
import ArticleCardSkeleton from '@/components/common/ArticleCardSkeleton.vue';
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router'
import { useArticleStore } from '@/stores/article';
import BaseButton from '@/components/ui/base/BaseButton.vue';
import NoItemFound from './NoItemFound.vue';

const articleStore = useArticleStore()
const router = useRouter()

const createArticle = () => {
    router.push({ name: 'article.create' })
}

onMounted(async () => {
    await loadData();
});

const loadData = async () => {
    await articleStore.fetchArticle(false, articleStore.searchQuery);
};

let timeOut = null
watch(
    () => articleStore.searchQuery,
    (newVal) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            loadData()
        }, 300)
    }
)

</script>