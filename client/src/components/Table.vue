<script>
import { useMainStore } from '../stores/counter';
import ModalVue from '../components/Modal.vue';
export default {
    data() {
        return {
            search: ''
        }
    },
    computed: {
        filteredOrders() {
            return this.getOrdersData?.filter(order => {
                return order.User.email.toLowerCase().includes(this.search.toLowerCase()) || order.Product.name.toLowerCase().includes(this.search.toLowerCase());
            });
        },
        getOrdersData() {
            return useMainStore().order;
        },
        isLogged() {
            return useMainStore().isLogged;
        }
    },
    components: {
        ModalVue
    },
    methods: {
        fetchOrder() {
            return useMainStore().fetchData();
        }
    },
    created() {
        try {
            this.fetchOrder();
        } catch (error) {
            console.log(error)
        }
    }
}
</script>
<template>
    <ModalVue />
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="pb-4 bg-white dark:bg-gray-900 flex">
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative mt-1">
                <div style="margin-top: -8px;" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="text" id="table-search" v-model="search"
                    class="mb-2 block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by email or product name">
            </div>
        </div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        No
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Product Orderer
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Product Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Product Quantity
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Product Price
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, index) in filteredOrders" :key="index"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ index + 1 }}
                    </th>
                    <td class="px-6 py-4">
                        {{ order.User.email }}
                    </td>
                    <td class="px-6 py-4">
                        {{ order.Product.name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ order.Product.quantity }}
                    </td>
                    <td class="px-6 py-4">
                        {{ order.Product.price }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>