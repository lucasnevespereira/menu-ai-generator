<script setup lang="ts">
import Landing from "@/components/Landing.vue";
</script>

<template>
    <div data-theme="jenny" class="min-h-full bg-base-200">
       <Landing v-if="!$auth.loggedIn" />
        <div v-else>
            <Header/>
            <div class="max-w-8xl min-h-[80vh] max-h-[85vh] overflow-auto mx-auto">
                <NuxtPage/>
            </div>
            <Footer/>
        </div>
    </div>
</template>
