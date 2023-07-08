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
        localStorage.setItem("access_token", data.access_token);
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

        this.isLogged = true;
        localStorage.setItem("access_token", data.access_token);
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
        localStorage.removeItem("access_token");
        this.isLogged = false;
        this.$router.push("/sign-in");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Log Out Problem",
          text: "Sorry, for the inconvenience",
        });
      }
    },
    async AddFavorite(id) {
      const { data } = await axios({
        method: "POST",
        url: `${this.baseUrl}/favorites/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      });
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
      } catch (error) {}
    },
  },
});
