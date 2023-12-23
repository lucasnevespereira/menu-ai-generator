<script setup>
import NumberInput from '@/components/ui/NumberInput.vue';
import Loader from "@/components/ui/Loader.vue";
import Toast from "@/components/ui/Toast.vue";
import MultiSelectInput from "@/components/ui/MultiSelectInput.vue";
import {useAppStore} from "@/stores/app";
import ContainerHeader from "~/components/ContainerHeader.vue";
import SelectInput from "~/components/ui/SelectInput.vue";
import {Lang} from "@/types/enum";
import {SAVE_TO_PDF} from "@/utils/pdf.js";

const store = useAppStore()
store.setPageName("Dashboard")

const formData = ref({
  lang: "en",
  maxCalories: 0,
  maxCarbs: 0,
  maxProteins: 0,
  maxFats: 0,
  regimes: [],
  wantShoppingList: false
});

const frRegimeOptions = [
  {label: 'Vegan', value: 'vegan'},
  {label: 'Végétarien', value: 'végétarien'},
  {label: 'Sans Lactose', value: 'sans lactose'},
  {label: 'Sans Gluten', value: 'sans gluten'},
  {label: 'Sans Arrachide', value: 'sans arrachide'}
];

const enRegimeOptions = [
  {label: 'Vegan', value: 'vegan'},
  {label: 'Vegetarian', value: 'vegetarian'},
  {label: 'Lactose-Free', value: 'lactose-free'},
  {label: 'Gluten-Free', value: 'gluten-free'},
  {label: 'Peanut-Free', value: 'peanut-free'}
];

const langOptions = [
  {label: 'English', value: 'en'},
  {label: 'French', value: 'fr'},];

const isLoading = ref(false);

const menu = ref({
  content: null,
  specs: {},
  description: "",
  shoppingList: null,
})

const getMenuDescription = computed(() => {
  const {maxCalories, maxFats, maxCarbs, maxProteins, lang} = menu.value.specs;
  let description = '';

  if (maxCalories && maxCalories > 0) {
    description += `${maxCalories} calories `;
  }

  if (maxFats && maxFats > 0) {
    const fatLabel = lang === Lang.FR ? 'lipides' : 'fats';
    description += ` ${fatLabel} ${maxFats} % `;
  }

  if (maxCarbs && maxCarbs > 0) {
    const carbLabel = lang === Lang.FR ? 'glucides' : 'carbs';
    description += `${carbLabel}  ${maxCarbs} % `;
  }

  if (maxProteins && maxProteins > 0) {
    const proteinLabel = lang === Lang.FR ? 'protéines' : 'proteins';
    description += `${proteinLabel} ${maxProteins} % `;
  }

  return description;
});

const toastRef = ref(null);

const copyToClipboard = () => {
  const menuContent = menu.value.content;
  if (menuContent) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = menuContent;
    const plainText = tempElement.textContent;

    const textArea = document.createElement('textarea');
    textArea.value = plainText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  toastRef.value.start('Menu Content Copied');
}

const saveToPDF = () => {
  SAVE_TO_PDF(menu.value)
};

const saveMenu = async (userID) => {
  const data = {
    content: menu.value.content,
    shoppingList: menu.value.shoppingList,
    specs: menu.value.specs,
    userID: userID
  };
  try {
    const response = await useFetch('/api/menus/save', {
      method: 'POST',
      body: data
    });
    if (response.data.value.status === 200) {
      toastRef.value.start("Menu Saved");
    }
  } catch (error) {
    console.error(error);
    toastRef.value.start('Something went wrong while saving');
  }
}

const generateMenu = async () => {
  isLoading.value = true;
  const {data} = await useFetch('/api/menus/generate', {
    method: 'POST', body: formData.value
  })
  menu.value.content = data.value.menu
  menu.value.specs = data.value.specs
  menu.value.description = data.value.description
  menu.value.shoppingList = data.value.shoppingList
  isLoading.value = false
};
</script>

<template>
  <ContainerHeader label="Dashboard"/>
  <div class="container w-full h-full mx-auto flex flex-col lg:flex-row">
    <!--Form container-->
    <div class="form-container w-full lg:w-1/2 p-4">
      <div class="form-header flex align-middle items-center">
      </div>
      <div class="w-full">
        <SelectInput size="md" max-width="full" label="Language" v-model="formData.lang"
                     placeholder="Choose your menu language"
                     :options="langOptions"/>
      </div>
      <div class="w-full">
        <NumberInput input-size="sm" max-width="full" label="Calories" v-model="formData.maxCalories"
                     placeholder="0" placeholder-symbol="kcal"/>
      </div>
      <div class="flex flex-wrap items-center gap-2 align-middle   ">
        <NumberInput input-size="sm" label="Carbs" v-model="formData.maxCarbs"
                     placeholder="0" placeholder-symbol="%"/>
        <NumberInput input-size="sm" label="Proteins" v-model="formData.maxProteins"
                     placeholder="0" placeholder-symbol="%"/>
        <NumberInput input-size="sm" label="Fats" v-model="formData.maxFats"
                     placeholder="0" placeholder-symbol="%"/>
      </div>

      <div class="w-full max-w-md mt-4">
        <MultiSelectInput size="md" label="Diets/Allergies" v-model="formData.regimes"
                          placeholder="Choose your diets or allergies"
                          :options="formData.lang === Lang.EN ? enRegimeOptions : frRegimeOptions"/>
      </div>
      <div class="w-full max-w-md mt-5">
        <div class="form-control flex">
          <label class="label cursor-pointer">
            <span class="label-text font-light uppercase text-lg tracking-widest">Shopping List</span>
            <input type="checkbox" v-model="formData.wantShoppingList" class="checkbox"/>
          </label>
        </div>
      </div>
      <div class="form-control w-full max-w-xs mt-6">
        <button @click="generateMenu" class="btn btn-accent">Generate</button>
      </div>
    </div>
    <!--Divider-->
    <div class="border-2 border-accent-content/10 mx-3"></div>
    <!--Menu container-->
    <div class="menu-container w-full lg:w-1/2 lg:p-4 py-6 px-4">
      <div class="card menu-card bg-base-100 p-4 shadow-xl w-full no-scrollbar">
        <Loader size="lg" v-if="isLoading"/>
        <div v-else-if="menu.content">
          <div class="title flex flex-col">
            <h2 class="text-xl font-semibold mb-2">
              {{ menu.specs && menu.specs.lang === Lang.FR ? 'Menu du Jour' : 'Daily Menu' }}</h2>
            <p v-if="menu.specs" class="text-sm mb-2 font-semibold">
              {{ getMenuDescription }}
            </p>
          </div>
          <div class="menu-content p-4">
            <div class="menu-text">
              <div v-html="menu.content"></div>
              <div v-if="menu.shoppingList">
                <hr class="m-2">
                <div class="flex flex-col">
                  <h2 class="text-xl font-semibold mb-2">
                    {{ menu.specs && menu.specs.lang === Lang.FR ? 'Liste de Courses' : 'Shopping List' }}</h2>
                  <div v-html="menu.shoppingList"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div v-else>
          <div class="h-full w-full flex flex-col justify-center items-center text-center">
          </div>
        </div>
      </div>
      <div class="flex items-center sm:pb-4 mt-3 gap-5 flex-row flex-wrap">
          <button class="btn btn-secondary" :disabled="!menu.content" @click="saveMenu($auth.user.id)">
            <PhosphorIconBookmarkSimple class="hover:cursor-pointer" size="24"/>
            Save Menu
          </button>
          <button class="btn btn-secondary flex" :disabled="!menu.content" @click="copyToClipboard">
            <PhosphorIconCopy class="hover:cursor-pointer" size="24"/>
            Copy Menu
          </button>

          <button class="btn btn-secondary flex" :disabled="!menu.content" @click="saveToPDF">
            <PhosphorIconDownloadSimple class="hover:cursor-pointer" size="24"/>
            Download
          </button>
        </div>
    </div>
    <Toast ref="toastRef"/>
  </div>
</template>


<style scoped>

.menu-container {
  max-height: 70vh;
}

.menu-text {
  font-size: 16px;
  line-height: 1.5;
}

.menu-card {
  height: 70vh;
  max-height: 100%;
  overflow-y: scroll;
  z-index: 0;
}

</style>
