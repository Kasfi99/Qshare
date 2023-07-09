<script>
import { useMainStore } from '../stores/counter';

export default {
    data() {
        return {
            dataInput: {
                name: null,
                quantity: null,
                price: null,
            },
            Validation: {
                nameInput: false,
                quantityInput: false,
                priceInput: false
            }
        }
    },
    computed: {
        showModal() {
            return useMainStore().showModal;
        },
        validateInput() {
            const nameRegex = /^[a-zA-Z0-9\s]+$/; // Only allow letters and spaces
            const numberRegex = /^\d+$/; // Only allow numbers

            if (this.dataInput.name && !nameRegex.test(this.dataInput.name)) {
                this.Validation.nameInput = true;
            } else this.Validation.nameInput = false;

            if (this.dataInput.quantity && !numberRegex.test(this.dataInput.quantity)) {
                this.Validation.quantityInput = true;
            } else this.Validation.quantityInput = false;

            if (this.dataInput.price && !numberRegex.test(this.dataInput.price)) {
                this.Validation.priceInput = true;
            } else this.Validation.priceInput = false;
        }
    },
    methods: {
        toggleModal() {
            useMainStore().toggleModal();
        },
        formatNumber(event) { //abandoned function
            let value = event.target.value;
            value = value.replace(/\./g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            this.dataInput.price = value;

            this.validateInput
        },
        async handleOrderForm(dataInput) {
            if (this.Validation.nameInput || this.Validation.quantityInput || this.Validation.priceInput) {
                return;
            }
            await useMainStore().submitOrder(dataInput)
            this.toggleModal();
        }
    }


}
</script>
<template>
    <div v-bind:hidden="!showModal">
        <div id="authentication-modal" tabindex="-1" aria-hidden="true"
            class="fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center">
            <div class="relative w-full max-w-md max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button @click="toggleModal()" type="button"
                        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="authentication-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="px-6 py-6 lg:px-8">
                        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create New Order</h3>
                        <form @submit.prevent="handleOrderForm(dataInput)" class="space-y-6" action="#">
                            <div>
                                <div v-if="Validation.nameInput">
                                    <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                        role="alert">
                                        <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>
                                        <span class="sr-only">Info</span>
                                        <div>
                                            <span class="font-medium">Danger alert!</span> Input Correct Name!
                                        </div>
                                    </div>
                                </div>
                                <label for="name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product
                                    Name</label>
                                <input v-model="dataInput.name" @input="validateInput" type="text" name="name" id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Samsung Television QHD 4k" required>
                            </div>
                            <div>
                                <div v-if="Validation.quantityInput"
                                    class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                    role="alert">
                                    <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span class="sr-only">Info</span>
                                    <div>
                                        <span class="font-medium">Danger alert!</span> Invalid Quantity Format
                                    </div>
                                </div>
                                <label for="quantity"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product
                                    Quantity</label>
                                <input v-model="dataInput.quantity" type="Number" name="quantity" id="quantity"
                                    placeholder="Enter product quantity"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required>
                            </div>
                            <div>
                                <div v-if="Validation.priceInput"
                                    class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                    role="alert">
                                    <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span class="sr-only">Info</span>
                                    <div>
                                        <span class="font-medium">Danger alert!</span> Invalid Price Format
                                    </div>
                                </div>
                                <label for="price"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product
                                    Price</label>
                                <input v-model="dataInput.price" @input="validateInput" type="number" name="price"
                                    id="price" placeholder="Enter product price"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required>
                            </div>
                            <button type="submit"
                                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                                My Order</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>