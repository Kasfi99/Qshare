<script>
import { RouterLink } from 'vue-router';
import router from '../routers/router';
import { mapActions } from 'pinia';
import { useMainStore } from '../stores/counter';

export default {
    data() {
        return {
            openNavbar: false,
        }
    },
    computed: {
        isLogged() {
            return useMainStore().isLogged;
        }
    },
    methods: {
        logOut() {
            return useMainStore().LogOut();
        },
        showModal() {
            return useMainStore().showModal();
        }
    }
}
</script>

<template>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <router-link to="/" href="https://flowbite.com/" class="flex items-center">
                <div class="h-10 w-10 mr-3 flex" style="overflow: hidden;border-radius: 100%;">
                    <img src="../assets/2.png" alt="Flowbite Logo" style=" transform: scale(1.5); object-fit: cover;" />
                </div>
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Home Device</span>
            </router-link>
            <button @click="openNavbar = !openNavbar" type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 1h15M1 7h15M1 13h15" />
                </svg>
            </button>
            <div :class="{ 'hidden': !openNavbar, 'block': openNavbar, 'w-full': true, 'md:block': true, 'md:w-auto': true }"
                id="navbar-default">
                <ul
                    class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <button @click="showModal()" type="button"
                            class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Order
                            Now</button>
                    </li>
                    <li v-if="!isLogged">
                        <router-link to="/sign-in">
                            <button type="button"
                                class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                Be a Member
                            </button>
                        </router-link>
                    </li>
                    <li v-if="isLogged">
                        <button @click="logOut()" type="button"
                            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Log
                            Out</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>