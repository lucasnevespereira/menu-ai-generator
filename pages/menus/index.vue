<script setup>
import Loader from "@/components/ui/Loader.vue";
import {useAppStore} from '@/stores/app'
import ContainerHeader from "@/components/ContainerHeader.vue";
import {SAVE_TO_PDF} from "@/utils/pdf.js";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";
import {COPY_TO_CLIPBOARD} from "@/utils/copy.js";
import Toast from "@/components/ui/Toast.vue";
import {Lang} from "@/types/enum";

definePageMeta({
  middleware: ['auth-logged-in'],
})

const store = useAppStore()
store.setPageName("Menus")

const nuxtApp = useNuxtApp()
const user = nuxtApp.$auth.user

const {data: api} = await useFetch(`/api/menus?userID=${user.id}`)
const menus = ref(api)


const toastRef = ref(null);
const confirmDelete = ref(null)
const isDeleting = ref(false)

const downloadMenu = (menu) => {
  SAVE_TO_PDF(menu)
}

const copyMenu = (menu) => {
  if (menu.content) {
    const menuContentTitle = Lang.FR ? 'Menu du jour' : 'Daily Menu'
    const menuShoppingListTitle = Lang.FR ? 'Liste de courses' : 'Shopping List'
    const content = menu.shoppingList ?
        `${menuContentTitle} \n ${menu.content} \n\n ${menuShoppingListTitle} \n ${menu.shoppingList}`
        : `${menuShoppingListTitle} \n ${menu.content}`;
    COPY_TO_CLIPBOARD(content);
    toastRef.value.start('Menu Copied');
  }
}
const openConfirmDelete = (menuID) => {
  localStorage.setItem('menuIDtoDelete', menuID)
  confirmDelete.value.open()
}

const handleCancel = () => {
  localStorage.removeItem('menuIDtoDelete')
}


const deleteMenu = async () => {
  isDeleting.value = true
  try {
    const menuID = localStorage.getItem('menuIDtoDelete')
    const response = await useFetch(`/api/menus?id=${menuID}`, {
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
    localStorage.removeItem('menuIDtoDelete')
    isDeleting.value = false
  }
}

const truncateContent = (content) => {
  // Replace <br> with spaces and truncate the content
  const replacedContent = content.replace(/<br>/g, ' ');
  const truncatedContent = replacedContent.slice(0, 50); // Adjust the number of characters to truncate

  return truncatedContent + (replacedContent.length > 50 ? '...' : ''); // Add ellipsis if content was truncated
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
        <button class="btn btn-secondary flex mr-2" @click="copyMenu(menu)">
          <PhosphorIconCopy class="hover:cursor-pointer" size="22"/>
        </button>
        <button class="btn btn-secondary flex mr-2" @click="downloadMenu(menu)">
          <PhosphorIconDownloadSimple class="hover:cursor-pointer" size="22"/>
        </button>
        <button class="btn btn-error flex justify-center items-center" @click="openConfirmDelete(menu.id)">
          <PhosphorIconTrashSimple class="hover:cursor-pointer" size="22"/>
        </button>
      </div>
    </div>
    <ConfirmationModal ref="confirmDelete" title="Delete Menu"
                       message="Are you certain to delete this menu?"
                       @on-confirm="deleteMenu" @on-cancel="handleCancel"></ConfirmationModal>

    <Toast ref="toastRef"/>
  </div>
</template>

<style scoped>

</style>