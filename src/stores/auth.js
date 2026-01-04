import { defineStore } from "pinia";
import { computed, ref } from "vue";
import api from '@/api/api'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem("token"))
    const user = ref(null)
    const isAuthenticated = computed(() => !!token.value && !!user.value)

    const fetchProfile = async () => {
        try {
            const res = await api.get("/auth/profile")
            user.value = res.data.data
        } catch (error) {
            clearAuth()
            throw error
        }
    }

    const login = async (payload) => {
        const res = await api.post("/auth/login", payload);
        token.value = res.data.data.token
        localStorage.setItem("token", token.value)

        await fetchProfile()
    }

    const logout = async () => {
        try {
            await api.delete("/auth/logout")
        } finally {
            clearAuth()
        }
    }

    const clearAuth = () => {
        token.value = null
        user.value = null
        localStorage.removeItem("token")
    }

    return { token, user, login, logout, clearAuth, fetchProfile, isAuthenticated }
})