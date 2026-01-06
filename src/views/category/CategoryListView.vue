<template>
    <div class="d-flex align-items-center mb-4">
        <h1 class="h3 mb-0 fw-bold text-dark me-auto">Categories List</h1>
        <div class="me-3">
            <BaseInput placeholder="Search category..." @update:modelValue="handleSearch" v-model="searchQuery" />
        </div>
        <div>
            <BaseButton @click="openModal('create')"
                class="btn btn-dark border shadow-sm d-flex align-items-center gap-2">
                <i class="bi bi-plus-lg"></i> Create Category
            </BaseButton>
        </div>
    </div>

    <BaseTable :isLoading="isLoading" :columns="tableHeaders" :items="categoryStore.categories"
        @edit="(id) => openModal('update', id)" @delete="(id) => openModal('delete', id)" />

    <div class="text-center mb-5">
        <BaseButton v-if="categoryStore.hasMore" variant="light" class="border shadow-sm px-4"
            @click="categoryStore.fetchMoreCategories()">
            {{ categoryStore.isLoading ? 'Loading...' : 'Load More' }}
        </BaseButton>
    </div>

    <BaseModal v-if="toggleModal" :title="modalConfig.title" @close="closeModal">
        <div v-if="modalMode !== 'delete'">
            <div class="mb-3">
                <label class="form-label fw-semibold text-secondary">Category Name</label>
                <BaseInput v-model="categoryName" type="text" class="form-control" placeholder="Enter category name"
                    style="transition: all 0.2s ease;" />
            </div>
        </div>

        <p v-else>Are you sure you want to delete this category?</p>

        <template #footer>
            <BaseButton variant="white" class="border" @click="closeModal">Cancel</BaseButton>
            <BaseButton :variant="modalConfig.btnVariant" @click="handleSubmit" class="shadow-sm">
                {{ modalConfig.confirmText }}
            </BaseButton>
        </template>
    </BaseModal>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCategoryStore } from '@/stores/category';
import BaseTable from '@/components/ui/base/BaseTable.vue';
import BaseButton from '@/components/ui/base/BaseButton.vue';
import BaseModal from '@/components/ui/base/BaseModal.vue';

const categoryStore = useCategoryStore();
const isLoading = ref(false);
const toggleModal = ref(false);
const modalMode = ref('create');
const selectedId = ref(null);

const categoryName = ref('')

const tableHeaders = [{ key: 'name', label: 'Category Name' }];

const modalConfig = computed(() => {
    const configs = {
        create: { title: 'Create Category', confirmText: 'Create', btnVariant: 'dark' },
        update: { title: 'Update Category', confirmText: 'Save Changes', btnVariant: 'dark' },
        delete: { title: 'Delete Category', confirmText: 'Delete', btnVariant: 'danger' }
    };
    return configs[modalMode.value];
});

onMounted(async () => {
    try {
        isLoading.value = true;
        await categoryStore.fetchCategory();
    } finally {
        isLoading.value = false;
    }
});

const openModal = async (mode, id = null) => {
    modalMode.value = mode;
    selectedId.value = id;

    if (mode === 'update') {
        const item = await categoryStore.fetchCategoryById(id)
        categoryName.value = item?.name || '';
    } else {
        categoryName.value = '';
    }

    toggleModal.value = true;
};

const closeModal = () => {
    toggleModal.value = false;
    selectedId.value = null;
    categoryName.value = '';
};

const handleSubmit = async () => {
    try {
        isLoading.value = true
        if (modalMode.value === 'create') {
            await categoryStore.createCategory({ name: categoryName.value });
        } else if (modalMode.value === 'update') {
            await categoryStore.updateCategory(selectedId.value, { name: categoryName.value });
        } else if (modalMode.value === 'delete') {
            await categoryStore.deleteCategory(selectedId.value);
        }
    } finally {
        await categoryStore.fetchCategory()
        closeModal();
        isLoading.value = false
    }
};

// const searchQuery = ref('')
// const handleSearch = async () => {
//    try {
//     isLoading.value = true
//     await categoryStore.fetchCategory( false ,searchQuery.value);
//    } finally {
//     isLoading.value = false
//    }
// };

</script>