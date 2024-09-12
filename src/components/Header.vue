<template>
  <div class="header">
    <svg
      v-if="!isAuth"
      @click="openAuth"
      class="auth-icon"
      width="7.5vw"
      height="7.5vw"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="7" r="4" stroke="white" />
      <path
        d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21"
        stroke="white"
      />
    </svg>
    <img v-else class="exit-icon" src="/exit-icon.svg" alt="exit" @click="authExit">
    <h4 class="heading">Testshop</h4>
    <svg
    class="cart-icon"
      width="7.5vw"
      height="7.5vw"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.8905 4.87596C5.95306 4.37554 6.37846 4 6.88278 4H17.1172C17.6215 4 18.0469 4.37554 18.1095 4.87597L19.8595 18.876C19.9341 19.4728 19.4687 20 18.8672 20H5.13278C4.53128 20 4.0659 19.4728 4.1405 18.876L5.8905 4.87596Z"
        stroke="white"
      />
      <path
        d="M15 6C15 7.65685 13.6569 9 12 9C10.3431 9 9 7.65685 9 6"
        stroke="white"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore();

const props = defineProps({
    openAuth: Function,
    showToast: Function
})

const isAuth = computed(() => store.state.authModule.isAuth);

const authExit = () => {
  store.commit('setAuth', false);
  props.showToast({ severity: 'success', summary: 'Всего хорошего!', detail: 'Вы вышли из аккаунта', life: 5000 });
}
</script>
