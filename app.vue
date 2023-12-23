<script setup lang="ts">
import Landing from "@/components/Landing.vue";
import {useDrawerStore} from "@/stores/drawer";
const drawer = useDrawerStore()
</script>

<template>
  <div data-theme="jennyDarkLite" class="h-screen bg-base-200">
    <Landing v-if="!$auth.loggedIn"/>
    <div v-else>
      <div class="drawer drawer-open">
        <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" :checked="drawer.open">
        <div class="drawer-content flex flex-col h-screen overflow-scroll">
          <NuxtPage/>
        </div>
        <div v-if="drawer.open" class="drawer-side h-full overflow-hidden bg-secondary">
          <div class="flex w-40 lg:w-60 min-h-full flex-col py-10 px-2">
            <div class="logo">
              <NuxtLink to="/" class="hover:bg-none normal-case text-2xl font-bold ml-5">menuAI</NuxtLink>
            </div>
            <ul class="menu flex-1 space-y-2 mt-6 text-base-content">
              <li>
                <NuxtLink to="/" class="text-lg">
                  Dashboard
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/menus" class="text-lg">
                  Menus
                </NuxtLink>
              </li>
            </ul>
            <ul class="menu">
              <hr>
              <li>
                <NuxtLink to="/api/logout" class="text-lg mt-2" external>
                  <PhosphorIconSignOut size="24"/>
                  Logout
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
