<script setup lang="ts">

import ContainerHeader from "@/components/ContainerHeader.vue";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";
import Loader from "~/components/ui/Loader.vue";

const confirmDelete = ref(null)
const isDeleting = ref(false)
const deleteAccount = async (userID: string) => {
  isDeleting.value = true
  try {
    const {data} = await useFetch(`/api/users/token`)
    const accessToken = data.value.access_token
    if (accessToken) {
      try {
        console.log("deleting user..")
        await useFetch(`/api/users?id=${userID}&token=${accessToken}`, {
          method: 'DELETE'
        })
        window.location.href = "/api/logout"
      } catch (e) {
        console.error(e)
      }
    }
  } catch (e) {
    console.error(e)
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <ContainerHeader label="Account"/>
  <div class="min-h-fit p-10" v-if="isDeleting">
    <Loader/>
  </div>
  <div v-else class="container w-full mx-auto flex flex-col justify-center text-center p-10 rounded-lg">
    <div class="avatar my-4 mx-auto">
      <div class="w-22 rounded-full">
        <img :src="$auth.user.picture ? $auth.user.picture : `https://ui-avatars.com/api/?name=${$auth.user.name}`"
             alt="user picture"/>
      </div>
    </div>
    <p class="text-lg"><span class="font-bold">Name: </span>{{ $auth.user.name }}</p>
    <p class="text-lg"><span class="font-bold">Email: </span>{{ $auth.user.email }}</p>

    <button class="btn btn-error btn-outline max-w-sm mx-auto my-5" @click="confirmDelete.open()">Delete my account
    </button>
  </div>

  <ConfirmationModal ref="confirmDelete" title="Delete Account" message="Are you sure you want to delete your account?"
                     @on-confirm="deleteAccount($auth.user.id)"></ConfirmationModal>
</template>

<style scoped>

</style>