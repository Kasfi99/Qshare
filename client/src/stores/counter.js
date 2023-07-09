// stores/counter.js
import { defineStore } from "pinia";
import axios from "axios";
import router from "../routers/router";

export const useMainStore = defineStore("counter", {
  state: () => ({
    baseUrl: "http://localhost:3000",
    isLogged: localStorage.getItem("access_token") ? true : false,
    showModal: false,
    order: null,
  }),
  getters: {},
  actions: {
    async signIn(userData) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${this.baseUrl}/user/sign-in`,
          data: userData,
        });

        this.isLogged = true;
        localStorage.setItem("email", data.email);
        await localStorage.setItem("access_token", data.access_token);
        this.fetchData();
        router.push("/");

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Succesfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Login Problem",
          text: "Please, check your email & password again",
        });
      }
    },
    async signUp(userData) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${this.baseUrl}/user/sign-up`,
          data: userData,
        });

        localStorage.setItem("email", data.email);
        this.isLogged = true;
        await localStorage.setItem("access_token", data.access_token);
        router.push("/");

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Register Succesfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Register Problem",
          text: "Please, check your email & password again",
        });
      }
    },
    async LogOut() {
      try {
        await localStorage.removeItem("access_token");
        this.isLogged = false;
        localStorage.removeItem("email");
        router.push("/sign-in");

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log Out Succesfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Log Out Problem",
          text: "Sorry, for the inconvenience",
        });
      }
    },
    async toggleModal() {
      this.showModal = !this.showModal;
    },
    async fetchData() {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${this.baseUrl}/order/my-order`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.order = data;
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Fetch Data is Failed",
          text: "Sorry, for the inconvenience",
        });
      }
    },
    async submitOrder(dataInput) {
      try {
        console.log("masuk sinbi", dataInput);
        const { data } = await axios({
          method: "POST",
          url: `${this.baseUrl}/order/add-order`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: dataInput,
        });

        await this.fetchData();
        router.push("/");

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Add Your Order",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to Submit Order",
          text: "Sorry, for the inconvenience",
        });
      }
    },
  },
});
