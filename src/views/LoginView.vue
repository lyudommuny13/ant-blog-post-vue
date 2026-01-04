<template>
    <main class="w-100 vh-100 d-flex flex-column align-items-center justify-content-center px-3">

        <div class="w-100" style="max-width: 400px;">

            <div class="text-center mb-4">
                <img src="https://floatui.com/logo.svg" width="150" alt="Logo" class="mx-auto mb-3" />
                <h3 class="fw-bold text-dark">Log in to your account</h3>
            </div>

            <form @submit.prevent="handleLogin()" class="mb-3">
                <div class="mb-3">
                    <base-input type="email" for="email" label="Email" placeholder="Enter your email" id="email"
                        v-model="state.form.email" :error="errors.email" @input="validateEmail()" />
                </div>

                <div class="mb-3 position-relative">
                    <BaseInput :type="state.ui.isPasswordVisible ? 'text' : 'password'" label="Password"
                        placeholder="Enter your password" id="password" v-model="state.form.password" class="pe-5"
                        :error="errors.password" @input="validatePassword()" />
                    <i @click="togglePassword()"
                        :class="[state.ui.isPasswordVisible ? 'bi-eye-slash' : 'bi-eye', 'bi position-absolute']"
                        style="right: 12px; top: 36px; cursor: pointer; z-index: 10; font-size: 1.2rem;">
                    </i>
                </div>

                <div class="d-flex align-items-center justify-content-between mb-3 small">
                    <div class="form-check">
                        <input class="form-check-input shadow-sm" type="checkbox" id="remember-me-checkbox">
                        <label class="form-check-label" for="remember-me-checkbox">
                            Remember me
                        </label>
                    </div>
                    <a href="javascript:void(0)" class="text-decoration-none text-primary">Forgot password?</a>
                </div>

                <BaseButton class="w-100" :isLoading="state.ui.isLoading" :disabled="state.ui.isDisabled" type="submit">
                    <span>Login</span>
                </BaseButton>
            </form>

            <p class="text-center text-secondary">
                Don't have an account?
                <a href="javascript:void(0)" class="fw-medium text-primary text-decoration-none">Sign up</a>
            </p>
        </div>
    </main>
</template>

<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { useRequireValidator } from '@/composables/useRequireValidator';

// Services
const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
const { errors, validateField } = useRequireValidator();

const state = reactive({
    form: {
        email: "",
        password: ""
    },
    ui: {
        isLoading: false,
        isDisabled: false,
        isPasswordVisible: false
    },
    errors: {
        email: "",
        password: ""
    }
});

const togglePassword = () => {
    state.ui.isPasswordVisible = !state.ui.isPasswordVisible;
};

const validateEmail = () => validateField("email", state.form.email, "Email is required.");
const validatePassword = () => validateField("password", state.form.password, "Password is required.")

const validateForm = () => {
    let isValid = true;

    state.errors.email = "";
    state.errors.password = "";

    if (!validateEmail() || !validatePassword()) {
        isValid = false;
    }

    return isValid;
};

const handleLogin = async () => {
    if (!validateForm()) return;

    try {
        state.ui.isLoading = true;
        state.ui.isDisabled = true;

        await authStore.login({
            email: state.form.email,
            password: state.form.password
        });

        toast.success("Login successfully 👏👏");

        router.push({ name: 'dashboard' });
    } catch (error) {
        const status = error.response?.status;

        if (status === 401) {
            state.errors.email = "Invalid credentials.";
            state.errors.password = "Please check your email or password.";
            toast.error("Login failed. Please check your credentials.");
        } else {
            state.errors.email = "A connection error occurred. Please try again.";
            toast.error("Server error. Please try again later.");
        }
    } finally {
        state.ui.isDisabled = false;
        state.ui.isLoading = false;
    }
};

</script>