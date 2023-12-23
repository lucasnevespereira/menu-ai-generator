<script setup lang="ts">

import ContainerHeader from "@/components/ContainerHeader.vue";
</script>

<template>
  <ContainerHeader label="My Account" />
    <div class="container w-full mx-auto p-10 rounded-lg">
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