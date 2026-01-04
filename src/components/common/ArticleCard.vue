<template>
    <div class="card border rounded h-100">
        <router-link :to="{ name: 'article.detail', params: { articleId: id } }" class=" text-decoration-none
            text-dark d-flex flex-column h-100">
            <img :src="thumbnail" alt="Thumbnail" class="card-img-top object-fit-cover" style="height: 180px;" />
            <div class="card-body d-flex flex-column p-3">
                <h5 class="card-title fw-bold text-truncate">
                    {{ title }}
                </h5>
                <p class="card-text text-muted text-justify mb-3 line-clamp-2">
                    {{ content }}
                </p>
                <div class="mt-auto d-flex align-items-center gap-2">
                    <img :src="avatar" alt="Creator Avatar" class="rounded-circle" width="24" height="24" />
                    <span class="small text-secondary fw-medium">
                        {{ creator }}
                    </span>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps(['id', 'title', 'thumbnail', 'content', 'avatar', 'creator'])
</script>

<style scroped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
}
</style>