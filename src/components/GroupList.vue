<script setup>
defineProps({
    list: {
        type: Array,
    },
});
</script>

<template>
    <ul v-for="item in list">
        <li>{{ item }}</li>
    </ul>
</template>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 2.6rem;
    position: relative;
    top: -10px;
}

h3 {
    font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
    text-align: center;
}
</style>
