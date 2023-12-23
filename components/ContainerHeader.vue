<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import {useDrawerStore} from "@/stores/drawer";
const store = useAppStore()
defineProps({
  label: {
    type: String,
    required: true,
    default: "MenuAI Generator"
  }
})
const drawer = useDrawerStore()
</script>

<template>
  <div class="navbar sticky py-8 px-4 items-center border-b-2 border-b-accent-content/10">
    <div class="flex-1 flex items-center align-middle">
      <button class="btn-ghost rounded mr-2 lg:hidden" @click="drawer.toggleOpen()">
        <PhosphorIconList size="24"/>
      </button>
      <p class="text-2xl font-bold">{{label}}</p>
    </div>
    <div class="flex-none mr-2 user-menu">
      <div v-if="$auth.loggedIn" class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar w-14 h-14">
          <div class="w-14 h-14 rounded-full">
            <img :src="$auth.user.picture ? $auth.user.picture : `https://ui-avatars.com/api/?name=${$auth.user.name}`"
                 alt="user picture"/>
          </div>
        </label>
        <ul tabindex="0"
            class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <NuxtLink to="/account" class="justify-between">
              Account
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-menu ul {
  z-index: 2;
  margin-top: -5px;
}
</style>