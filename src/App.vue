<template>
  <router-view v-if="isRouterUse"></router-view>
  <div v-else>
    <Filter v-if="filterOpen" :close-filter="closeFilter" :apply-and-close-filter="applyAndCloseFilter" />
    <div v-else>
      <Auth v-if="authOpen" :close-auth="closeAuth" />
      <ProductCardDetailsPopup v-if="isProductCardDetailsPopup" />
      <Header :open-auth="openAuth" />
      <BannerCatalog />
      <ListFilter :open-filter="openFilter" />
      <BannerOffer />
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Filter from "./components/Filter.vue";
import Auth from "./components/Auth.vue";
import ProductCardDetailsPopup from "./components/ProductCardDetailsPopup.vue";
import Header from "./components/Header.vue";
import BannerCatalog from "./components/BannerCatalog.vue";
import ListFilter from "./components/ListFilter.vue";
import BannerOffer from "./components/BannerOffer.vue";
import Footer from "./components/Footer.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const filterOpen = ref(false);
const authOpen = ref(false);
const isRouterUse = computed(() => store.state.routerUseModule.isRouterUse);
const isProductCardDetailsPopup = computed(() => store.state.popupModule.isProductCardDetailsPopup);

const openFilter = () => {
  filterOpen.value = true;
};

const closeFilter = () => {
  filterOpen.value = false;
  store.commit("setIsButtonApplyPushed", false);
  store.commit("setSelectedCategories", '');
  store.commit("setRangePrice", [0, 100000]);
  store.commit("setInStock", false);
};

const applyAndCloseFilter = () => {
  filterOpen.value = false;
  store.commit("setIsButtonApplyPushed", true);
}

const openAuth = () => {
  authOpen.value = true;
};

const closeAuth = () => {
  authOpen.value = false;
};
</script>
