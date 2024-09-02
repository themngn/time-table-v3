<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
    <header>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/admin">Admin</RouterLink>
            <RouterLink to="/courses">Courses</RouterLink>
            <RouterLink to="/user">User</RouterLink>
            <RouterLink to="/timetable">Timetable</RouterLink>
        </nav>
    </header>

    <RouterView class="rv" />
</template>

<style scoped>
body,
html,
template {
    margin: 0;
    padding: 0;
}
#app {
    margin: 0px;
    padding: 0px;
}
header {
    line-height: 2;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}
</style>
