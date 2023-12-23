<script setup>
import Loader from "@/components/ui/Loader.vue";
import {useAppStore} from '@/stores/app'
import ContainerHeader from "@/components/ContainerHeader.vue";
import {SAVE_TO_PDF} from "@/utils/pdf.js";

definePageMeta({
  middleware: ['auth-logged-in'],
})


const store = useAppStore()
store.setPageName("Menus")

const nuxtApp = useNuxtApp()
const user = nuxtApp.$auth.user

const {data: api} = await useFetch(`/api/menus?userID=${user.id}`)
const menus = ref(api)

const confirmDelete = ref(null)
const menuIDtoDelete = ref(null)
const isDeleting = ref(false)

const downloadMenu = (menu) => {
  SAVE_TO_PDF(menu)
}

const openConfirmDelete = (menuID) => {
  menuIDtoDelete.value = menuID
  confirmDelete.value.showModal()
}

const deleteMenu = async (menuID) => {
  isDeleting.value = true
  try {
    const response = await useFetch(`/api/menus?userID=${menuID}`, {
      method: 'DELETE',
    });
    if (response.status === 200) {
      toastRef.value.start("Menu Saved");
    }
    await refreshNuxtData()
  } catch (error) {
    console.error(error);
    toastRef.value.start('Something went wrong while deleting');
  } finally {
    menuIDtoDelete.value = null
    isDeleting.value = false
  }
}

const truncateContent = (content) => {
  // Replace <br> with spaces and truncate the content
  const replacedContent = content.replace(/<br>/g, ' ');
  const truncatedContent = replacedContent.slice(0, 100); // Adjust the number of characters to truncate

  return truncatedContent + (replacedContent.length > 100 ? '...' : ''); // Add ellipsis if content was truncated
}
</script>

<template>
  <ContainerHeader label="Menus"/>
  <div class="container w-full mx-auto p-10 overflow-y-auto rounded-lg">
    <div v-if="!menus" class="rounded-lg bg-base-100 shadow-2xl mb-4 p-4">
      You don't have any menus saved.
    </div>
    <div v-for="(menu, index) in menus" :key="index"
         class="rounded-lg bg-base-100 shadow-2xl mb-4">
      <div v-if="isDeleting && menuIDtoDelete === menu.id" class="p-1">
        <Loader/>
      </div>
      <div v-else class="card-content flex justify-between items-center p-4">
        <div class="flex-1 pr-4"><b>Menu {{ menu.specs.maxCalories }}kcal</b> - {{ truncateContent(menu.content) }}
        </div>
        <button class="btn btn-secondary flex mr-2" @click="downloadMenu(menu)">
          Download
          <PhosphorIconDownloadSimple class="hover:cursor-pointer" size="22"/>
        </button>
        <button class="btn btn-error flex justify-center items-center" @click="openConfirmDelete(menu.id)">
          <PhosphorIconTrashSimple class="hover:cursor-pointer" size="22"/>
        </button>
      </div>


    </div>
    <dialog ref="confirmDelete" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Delete Menu</h3>
        <p class="py-4">Are you certain to delete this menu?</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-ghost">Cancel</button>
            <button class="btn btn-error btn-outline ml-2" @click="deleteMenu(menuIDtoDelete)">Delete</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped>

</style>