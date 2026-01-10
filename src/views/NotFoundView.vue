<template>
    <main class="error-page-wrapper">
        <div class="container d-flex align-items-center justify-content-center vh-100">
            <div class="card error-card border-0 shadow-sm text-center p-5">
                <div class="card-body p-0">
                    <div class="mb-3">
                        <i class="bi bi-exclamation-circle text-primary fs-1"></i>
                    </div>
                    <h3 class="text-primary fw-semibold h5 mb-2">
                        404 Error
                    </h3>
                    <h1 class="text-dark fw-bold mb-3 display-5">
                        Page not found
                    </h1>
                    <p class="text-muted mb-4 mx-auto" style="max-width: 400px;">
                        Sorry, the page you are looking for could not be found or has been removed.
                    </p>
                    <div class="d-flex flex-wrap align-items-center justify-content-center gap-3">
                        <routerLink to="/" class="btn btn-primary px-4 py-2 transition-smooth">
                            <i class="bi bi-arrow-left me-2"></i>Go back
                        </routerLink>
                        <a href="javascript:void(0)" class="btn btn-outline-secondary px-4 py-2 transition-smooth">
                            Contact support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
/* Implementing your specific dashboard aesthetic preferences */

.error-page-wrapper {
    background-color: #f4f6f9;
    /* Crisp off-white background */
    font-family: 'Inter', sans-serif;
    /* Sharper, readable typeface */
}

.error-card {
    background-color: #ffffff;
    /* Pure white card */
    max-width: 550px;
    border-radius: 1rem;
    /* Subtle, diffused drop shadow for hierarchy */
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.05) !important;
}

/* Polished interactive elements */
.transition-smooth {
    transition: all 0.2s ease-in-out;
}

.transition-smooth:hover {
    transform: translateY(-1px);
}

.btn-primary {
    background-color: #4f46e5;
    /* Indigo-style primary */
    border-color: #4f46e5;
}
</style>