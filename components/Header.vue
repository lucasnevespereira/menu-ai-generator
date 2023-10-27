<script setup lang="ts">
</script>

<template>
    <div class="navbar bg-base-100 sticky shadow-sm p-4">
        <div class="flex-1">
            <a class="btn btn-ghost hover:bg-none normal-case text-xl">menuAI</a>
        </div>
        <div class="flex-none mr-2">
            <div v-if="$auth.loggedIn" class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img :src="$auth.user.picture"/>
                    </div>
                </label>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <a class="justify-between">
                            Profile
                        </a>
                    </li>
                    <li>
                        <NuxtLink to="/api/logout" external>
                            Logout
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <NuxtLink v-else to="/api/login" external>
                Sign in
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped>

</style>