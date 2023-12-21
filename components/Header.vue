<script setup lang="ts">
</script>

<template>
    <div class="navbar sticky p-3 items-center">
        <div class="flex-1">
            <NuxtLink to="/" class="btn btn-ghost hover:bg-none normal-case text-2xl font-bold">menuAI</NuxtLink>
        </div>
        <div class="flex-none mr-2 user-menu">
        <div v-if="$auth.loggedIn" class="dropdown dropdown-end">
              <label tabindex="0" class="btn btn-ghost btn-circle avatar w-14 h-14">
                    <div class="w-14 h-14 rounded-full">
                        <img :src="$auth.user.picture ? $auth.user.picture : `https://ui-avatars.com/api/?name=${$auth.user.name}`" alt="user picture"/>
                    </div>
                </label>
    <ul tabindex="0"
        class="menu menu-sm dropdown-content mt-3 z-[10000] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
                <NuxtLink to="/" class="justify-between">
                    Dashboard
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/menus" class="justify-between">
                    Mes Menus
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/account" class="justify-between">
                    Mon Compte
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/api/logout" external>
                    Logout
                </NuxtLink>
            </li>
        </ul>
        </div>
            <NuxtLink v-else to="/api/login" external>
                Se Connecter
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped>
.user-menu {
    z-index: 1000;
}
</style>