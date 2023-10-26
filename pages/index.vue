<template>
    <div class="container p-4">
      <h1 class="text-3xl font-bold mb-4">Menu AI Generator</h1>
  
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="form-container">
          <form @submit.prevent="generateMenu">
            <div class="form-field mb-4">
              <label for="max-calories" class="label">Calories max par jour:</label>
              <div class="control">
                <input type="number" id="max-calories" v-model="formData.maxCalories" required class="input" placeholder="Calories" />
              </div>
            </div>
  
            <!-- Repeat the same structure for other form fields -->
            
  
            <div class="form-field">
              <label for="allergies" class="label">Allergies:</label>
              <div class="control">
                <div class="select select-multiple">
                  <select id="allergies" v-model="formData.allergies" multiple>
                    <option value="lait">Lait</option>
                  </select>
                </div>
              </div>
            </div>
  
            <div class="form-field mt-4">
              <div class="control">
                <button type="submit" class="button button-primary">Générer</button>
              </div>
            </div>
          </form>
        </div>
  
        <div class="column is-half">
          <div v-if="isLoading" class="loader animate-spin text-4xl"></div>
          <div class="card" id="menu-card">
            <div class="card-content max-h-[70vh] overflow-y-auto">
              <div class="content" id="menu-content">
                <!-- Display generated menu here -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
// const maxCalories = ref(null)
// const maxCarbs = ref(null)
// const maxProteins = ref(null)
// const maxFats = ref(null)
// const allergies = reactive([])

const formData = ref({
  maxCalories: null,
  maxCarbs: null,
  maxProteins: null,
  maxFats: null,
  allergies: [],
});


const isLoading = ref(false);

const generateMenu = () => {
  // Implement the menu generation logic here
  isLoading.value = true;
  // Call your API or function to generate the menu
  // When the menu is ready, update the "menu-content" div
  // and set isLoading.value = false
};
</script>
