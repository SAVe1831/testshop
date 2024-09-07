<template>
  <div class="banner-catalog">
    <img v-if="isBreakpointBetter1920px" class="banner" src="/banner2.png" alt="banner" />
    <img v-else class="banner" src="/banner.png" alt="banner" />
    <div class="big-sale">
        <div class="text">
            <div class="text-up">Большая распродажа</div>
            <div class="text-down">скидки до 50%</div>
        </div>
        <p v-if="countdown.isEventPassed" class="sale-end">Акция завершена!</p>
        <div v-else class="time">
          <div class="time__days">
              <div class="time__days__number">{{ countdown.days }}</div>
              <div class="time__days__text">дней</div>
          </div>
          <div class="time__hours">
              <div class="time__hours__number">{{ countdown.hours }}</div>
              <div class="time__hours__text">часов</div>
          </div>
          <div class="time__minutes">
              <div class="time__minutes__number">{{ countdown.minutes }}</div>
              <div class="time__minutes__text">минут</div>
          </div>
          <div class="time__seconds">
              <div class="time__seconds__number">{{ countdown.seconds }}</div>
              <div class="time__seconds__text">секунд</div>
          </div>
        </div>
    </div>
    <div class="catalog">
      <div class="clothes">
        <span class=clothes-text>Одежда</span>
        <img class="clothes-image" src="/clothes.png" alt="clothes">
      </div>
      <div class="shoes">
        <span class="shoes-text">Обувь</span>
        <img class="shoes-image" src="/shoes.png" alt="shoes">
      </div>
      <div class="equipment">
        <span class="equipment-text">Снаряжение</span>
        <img class="equipment-image" src="/equipment.png" alt="equipment">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore();
const countdown = computed(() => store.state.timerModule.countdown);

const isBreakpointBetter1920px = ref(window.innerWidth >= 1920);

const checkScreenWidth = () => {
  isBreakpointBetter1920px.value = window.innerWidth >= 1920;
};

let timerInterval;

onMounted(() => {
  timerInterval = store.dispatch('startCountdown');
  window.addEventListener('resize', checkScreenWidth);
});

onUnmounted(() => {
  clearInterval(timerInterval);
  window.removeEventListener('resize', checkScreenWidth);
});
</script>
