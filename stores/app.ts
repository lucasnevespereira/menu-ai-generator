import {defineStore} from 'pinia';
import type {Menu} from "@/types/menu";


export const useAppStore = defineStore('AppStore', {
    state: () => ({
        pageName: "Dashboard"
    }),
    getters: {
        getPageName: (state) => state.pageName,
    },
    actions: {
        setPageName(name: string) {
            this.pageName = name
        }
    }
})