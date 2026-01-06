<template>
    <div class="d-flex align-items-center mb-4">
        <h1 class="h3 mb-0 fw-bold text-dark me-auto">Categories List</h1>

        <div class="me-3">
            <BaseInput placeholder="Search category..." v-model="searchQuery" @update:modelValue="handleSearch" />
        </div>

        <div>
            <BaseButton @click="openModal('create')"
                class="btn btn-dark border shadow-sm d-flex align-items-center gap-2">
                <i class="bi bi-plus-lg"></i> Create Category
            </BaseButton>
        </div>
    </div>

    <BaseTable :isLoading="categoryStore.isLoading" :columns="tableHeaders" :items="categoryStore.categories"
        @edit="(id) => openModal('update', id)" @delete="(id) => openModal('delete', id)" />

    <div class="text-center mb-5">
        <BaseButton v-if="categoryStore.hasMore" variant="light" class="border shadow-sm px-4"
            @click="categoryStore.fetchMoreCategories()">
            {{ categoryStore.isLoading ? 'Loading...' : 'Load More' }}
        </BaseButton>
    </div>

    <BaseModal v-if="toggleModal" :title="modalTitle" @close="closeModal">
        <div v-if="modalMode !== 'delete'">
            <div class="mb-3">
                <label class="form-label fw-semibold text-secondary">Category Name</label>
                <BaseInput @blur="validateField('categoryName', categoryName, 'Category name is required')"
                    :error="errors.categoryName" v-model="categoryName" type="text" class="form-control"
                    placeholder="Enter category name" />
            </div>
        </div>

        <p v-else>Are you sure you want to delete this category?</p>

        <template #footer>
            <BaseButton variant="white" class="border" @click="closeModal">Cancel</BaseButton>
            <BaseButton :variant="modalBtnVariant" @click="handleSubmit" class="shadow-sm">
                {{ modalConfirmText }}
            </BaseButton>
        </template>
    </BaseModal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCategoryStore } from '@/stores/category';
import BaseTable from '@/components/ui/base/BaseTable.vue';
import { useRequireValidator } from '@/composables/useRequireValidator';

const { errors, validateField } = useRequireValidator()

const categoryStore = useCategoryStore();
const isLoading = ref(false);
const toggleModal = ref(false);
const categoryName = ref('');
const searchQuery = ref('');

const modalMode = ref('create');
const modalTitle = ref('');
const modalConfirmText = ref('');
const modalBtnVariant = ref('dark');
const selectedId = ref(null);

const tableHeaders = [{ key: 'name', label: 'Category Name' }];

onMounted(async () => {
    await loadData();
});

const loadData = async () => {
    await categoryStore.fetchCategory(false, searchQuery.value);
};

const handleSearch = async () => {
    await loadData();
};

const openModal = async (mode, id = null) => {
    modalMode.value = mode;
    selectedId.value = id;

    if (mode === 'create') {
        modalTitle.value = 'Create Category';
        modalConfirmText.value = 'Create';
        modalBtnVariant.value = 'dark';
        categoryName.value = '';
    } else if (mode === 'update') {
        modalTitle.value = 'Update Category';
        modalConfirmText.value = 'Save Changes';
        modalBtnVariant.value = 'dark';
        const item = await categoryStore.fetchCategoryById(id);
        categoryName.value = item?.name || '';
    } else if (mode === 'delete') {
        modalTitle.value = 'Delete Category';
        modalConfirmText.value = 'Delete';
        modalBtnVariant.value = 'danger';
    }

    toggleModal.value = true;
};

const closeModal = () => {
    toggleModal.value = false;
    selectedId.value = null;
    categoryName.value = '';
    errors.categoryName = ''
};

const handleSubmit = async () => {
    try {

        if (modalMode.value !== 'delete') {
            if (!validateForm()) return;
        }

        isLoading.value = true;
        if (modalMode.value === 'create') {
            await categoryStore.createCategory({ name: categoryName.value });
        } else if (modalMode.value === 'update') {
            await categoryStore.updateCategory(selectedId.value, { name: categoryName.value });
        } else if (modalMode.value === 'delete') {
            await categoryStore.deleteCategory(selectedId.value);
        }

        await loadData();
        closeModal();
    } finally {
        isLoading.value = false;
    }
};

const validateForm = () => {
    const v1 = validateField('categoryName', categoryName.value, 'Category name is required');
    return v1
}
</script>