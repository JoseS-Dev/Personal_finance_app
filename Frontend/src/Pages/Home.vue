<script lang="ts" setup>
    const userID = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('User ID:', userID.data.id_user);
</script>

<template>
    <h1>Home Page</h1>
</template>