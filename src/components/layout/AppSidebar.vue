<template>
    <aside class="sidebar">
        <div class="p-3 pt-5">
            <h6 class="text-uppercase text-secondary mb-3">Admin</h6>

            <ul class="nav nav-pills flex-column gap-1">
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/"> <i class="bi bi-speedometer me-2"></i>Dashboard
                    </RouterLink>
                </li>

                <li class="nav-item">
                    <a class="nav-link d-flex justify-content-between align-items-center" href="#articleCollapse"
                        data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="articleCollapse">
                        My Article
                        <i class="bi bi-chevron-down"></i>
                    </a>

                    <div class="collapse" id="articleCollapse">
                        <ul class="nav flex-column ms-3 mt-1">
                            <li class="nav-item">
                                <RouterLink class="nav-link" to="/article">All Article</RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink class="nav-link" to="/article/create">Create Article</RouterLink>
                            </li>
                        </ul>
                    </div>
                </li>

                <li class="nav-item mt-3">
                    <BaseButton class="w-100" variant="danger" @click="toggleModal = true">
                        <span>Logout</span>
                    </BaseButton>
                </li>
            </ul>
        </div>
        <BaseModal title="Confirm Logout" @close="toggleModal = false" v-if="toggleModal">
            <p>Are you sure you want to logout?</p>
            <template #footer>
                <BaseButton variant="secondary" @click="toggleModal = false">Cancel</BaseButton>
                <BaseButton variant="danger" @click="handleLogout()">Logout</BaseButton>
            </template>
        </BaseModal>
    </aside>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import BaseModal from '../ui/base/BaseModal.vue';
import { ref } from 'vue';

const authStore = useAuthStore()
const router = useRouter();
const toast = useToast();
const toggleModal = ref(false)

const handleLogout = async () => {
    try {
        await authStore.logout()
        toast.info("You have been logged out");
        router.push({ name: 'login' })
    } catch (error) {
        console.log(error);
    }
}

</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 56px;
    left: 0;
    width: 250px;
    height: calc(100vh - 56px);
    background-color: #212529;
    transition: transform 0.3s ease;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.sidebar.closed {
    transform: translateX(-250px);
}

.nav-link {
    color: #adb5bd;
}

.nav-link.active,
.nav-link:hover {
    color: #fff;
    background-color: #343a40;
}
</style>
