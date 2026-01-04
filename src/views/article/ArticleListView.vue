<template>
    <div class="d-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 fw-bold text-dark">Article List</h1>
        <BaseButton @click="router.push({ name: 'article.create' })" class="btn-dark border shadow-sm">
            Create article
        </BaseButton>
    </div>
    <div>
        <BaseTable @edit="onEdit" @delete="onDelete" :isLoading="isLoading" :columns="tableHeaders"
            :items="articleStore.ownArticles">
            <template #column-thumbnail="{ item }">
                <img style="max-width: 80px;" :src="item?.thumbnail">
            </template>
            <template #column-category="{ item }">
                <span class="badge bg-secondary">
                    {{ item.category?.name || 'Uncategorized' }}
                </span>
            </template>
        </BaseTable>
    </div>
    <BaseModal title="Confirm delete" @close="toggleModal = false" v-if="toggleModal">
        <p>Are you sure you want to delete?</p>
        <template #footer>
            <BaseButton variant="secondary" @click="toggleModal = false">Cancel</BaseButton>
            <BaseButton variant="danger" @click="handleDelete()">Delete</BaseButton>
        </template>
    </BaseModal>
</template>
<script setup>
import BaseTable from '@/components/ui/base/BaseTable.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useArticleStore } from '@/stores/article';
const articleStore = useArticleStore()
const router = useRouter()
const isLoading = ref(false)
const toggleModal = ref(false)
const selectedId = ref(null)

onMounted(async () => {
    try {
        isLoading.value = true
        await articleStore.fetchOwnArticle()
    } finally {
        isLoading.value = false
    }
})

function onDelete(id) {
    selectedId.value = id
    toggleModal.value = true
}

function onEdit(id) {
    router.push({ name: 'article.edit', params: { id: id } })
}

const handleDelete = async () => {

    if (!selectedId.value) return

    try {
        isLoading.value = true

        await articleStore.deleteArticle(selectedId.value)
        await articleStore.fetchOwnArticle()

        toggleModal.value = false
        selectedId.value = null

    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false
    }
}

const tableHeaders = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'content', label: 'Content' },
    { key: 'thumbnail', label: 'Thumbnail' }
]

</script>
