<template>
    <div class="admin-layout">
        <AppNavbar @toggle="toggleSidebar" />
        <AppSidebar :class="isToggle ? '' : 'closed'" />

        <main class="content mt-5" :class="`${isToggle ? '' : 'expanded'}`">
            <router-view></router-view>
        </main>
    </div>
</template>

<script setup>
import AppNavbar from '@/components/layout/AppNavbar.vue';
import AppSidebar from '@/components/layout/AppSidebar.vue';
import { ref } from 'vue';

const isToggle = ref(true)
function toggleSidebar() {
    isToggle.value = !isToggle.value
}
</script>

<style scoped>
.admin-layout {
    min-height: 100vh;
}

.content {
    margin-left: 250px;
    padding: 1.5rem 1rem;
    transition: margin-left 0.3s ease;
}

.content.expanded {
    margin-left: 0;
}
</style>
