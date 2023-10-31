<script setup lang="ts">

</script>

<template>
    <div class="container w-full mx-auto bg-base-100 p-10 rounded-lg">
        <h2 class="text-primary font-bold text-2xl mb-4">Mon Compte</h2>
        <div class="avatar my-4">
            <div class="w-24 rounded-xl">
                <img :src="$auth.user.picture"/>
            </div>
        </div>
        <p class="text-lg"><span class="font-bold">Nom: </span>{{$auth.user.name}}</p>
        <p class="text-lg"><span class="font-bold">Email: </span>{{$auth.user.email}}</p>
    </div>
</template>

<style scoped>

</style>