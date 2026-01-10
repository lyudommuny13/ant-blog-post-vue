<template>
    <nav class="navbar navbar-dark bg-secondary px-3 fixed-top">
        <button @click="$emit('toggle')" class="btn btn-outline-light me-3">
            <i class="bi bi-list"></i>
        </button>

        <span class="navbar-brand mb-0 h5">Blog</span>

        <div class="ms-auto d-flex align-items-center position-relative">
            <routerLink to="/category" class="stretched-link"></routerLink>
            <div class="rounded-circle me-2 overflow-hidden" style="max-height: 40px; max-width: 40px;">
                <img class="img-fluid" :src="authStore.user?.avatar" alt="avatar" />
            </div>
            <span class="text-white">{{ `${authStore.user?.firstName} ${authStore.user?.lastName}` }}</span>
        </div>
    </nav>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
</script>