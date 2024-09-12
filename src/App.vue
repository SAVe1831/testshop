<template>
  <Toast position="top-right" :style="{ backgroundColor: severity === 'success' ? '#8cf594' : '#f07171' }" />
  <router-view v-if="isRouterUse" :show-toast="showToast"></router-view>
  <div v-else>
    <Filter v-if="filterOpen" :close-filter="closeFilter" :apply-and-close-filter="applyAndCloseFilter" />
    <div v-else>
      <Auth v-if="authOpen" :close-auth="closeAuth" :show-toast="showToast" />
      <ProductCardDetailsPopup v-if="isProductCardDetailsPopup" :show-toast="showToast" />
      <Header :open-auth="openAuth" :show-toast="showToast" />
      <BannerCatalog />
      <ListFilter :open-filter="openFilter" />
      <BannerOffer :show-toast="showToast" />
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
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
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const severity = ref('');
const showToast = (obj) => {
    toast.add(obj);
    severity.value = obj.severity;
};

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

const handleBackButton = () => {
    store.commit('setRouterUse', false);
}

onMounted(() => {
    window.addEventListener('popstate', handleBackButton);
});

onBeforeUnmount(() => {
    window.removeEventListener('popstate', handleBackButton);
});
</script>
