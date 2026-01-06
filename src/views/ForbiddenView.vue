<template>
    <main class="error-page-wrapper">
        <div class="container d-flex align-items-center justify-content-center vh-100">
            <div class="card error-card border-0 shadow-sm text-center p-5">
                <div class="card-body p-0">
                    <div class="mb-4">
                        <div class="icon-circle bg-danger-subtle text-danger mx-auto">
                            <i class="bi bi-shield-lock-fill fs-1"></i>
                        </div>
                    </div>

                    <h3 class="text-danger fw-semibold h5 mb-2">
                        403 Forbidden
                    </h3>
                    <h1 class="text-dark fw-bold mb-3 display-5">
                        Access Denied
                    </h1>
                    <p class="text-muted mb-4 mx-auto" style="max-width: 420px;">
                        You don't have permission to access this resource. Please contact your administrator if you
                        believe this is a mistake.
                    </p>

                    <div class="d-flex flex-wrap align-items-center justify-content-center gap-3">
                        <a href="/" class="btn btn-dark px-4 py-2 transition-smooth shadow-sm">
                            <i class="bi bi-house-door me-2"></i>Return Home
                        </a>
                        <a href="javascript:void(0)" class="btn btn-outline-secondary px-4 py-2 transition-smooth">
                            <i class="bi bi-person-badge me-2"></i>Request Access
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
/* Dashboard Aesthetic Implementation */

.error-page-wrapper {
    background-color: #f4f6f9;
    /* Off-white background */
    font-family: 'Inter', sans-serif;
}

.error-card {
    background-color: #ffffff;
    /* Pure white card */
    max-width: 550px;
    border-radius: 1.25rem;
    /* Subtle, diffused drop shadow */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04) !important;
}

.icon-circle {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

/* Polished Interactive Elements */
.transition-smooth {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-smooth:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
}

/* Typography Sharpness */
h1 {
    letter-spacing: -0.02em;
}
</style>