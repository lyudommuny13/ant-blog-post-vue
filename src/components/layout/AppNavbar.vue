<template>
    <nav class="navbar navbar-dark bg-secondary px-3 fixed-top">
        <button @click="$emit('toggle')" class="btn btn-outline-light me-3">
            <i class="bi bi-list"></i>
        </button>

        <span class="navbar-brand mb-0 h5">Blog</span>

        <div class="ms-auto d-flex align-items-center">
            <img src="https://thumbs.dreamstime.com/b/d-icon-avatar-cartoon-cute-freelancer-woman-working-online-learning-laptop-transparent-png-background-works-embodying-345422695.jpg"
                class="rounded-circle me-2 img-fluid" alt="avatar" width="40" height="40" />
            <span class="text-white">Admin</span>
        </div>
    </nav>
</template>