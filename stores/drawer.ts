import {defineStore} from 'pinia';


export const useDrawerStore = defineStore('DrawerStore', {
    state: () => ({
        open: true
    }),
    actions: {
        toggleOpen() {
            this.open = !this.open
        }
    }
})