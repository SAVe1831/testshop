<template>
    <div class="filter-container">
        <div class="title">
            <span>Фильтр</span>
            <svg @click="closeFilter" width="6.25vw" height="6.25vw" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.625 4.375L4.375 15.625M15.625 15.625L4.375 4.375" stroke="#0B0B0B" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="category">
            <span>Категория</span>
            <div class="checkbox">
                <div v-for="category of categories" :key="category.name" class="checkbox-item">
                    <Checkbox v-model="selectedCategories" :inputId="category.name" name="category" :value="category.name" />
                    <label :for="category.key">{{ category.name }}</label>
                </div>
            </div>
        </div>
        <div class="price">
            <span>Цена</span>
            <div class="price-range">
                <Slider v-model="rangeValue" range class="slider-range" />
                <div class="price-value">
                    <div class="price-value-box">
                        <span>от {{ rangeValue[0]*500 }}</span>
                    </div>
                    <svg width="6.25vw" height="6.25vw" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.125 10H16.875" stroke="#0B0B0B" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div class="price-value-box">
                        <span>до {{ rangeValue[1]*500 }}</span>
                    </div>    
                </div>
            </div>
        </div>
        <div class="in-stock">
            <span>Показывать только в наличии</span>
            <svg v-if="switchSvg==='default'" @mousemove="switchSvg='hover'" class="switch-svg" width="14.3vw" height="7.5vw" viewBox="0 0 46 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="46" height="24" rx="12" fill="#F5F5F5"/>
                <rect x="2" y="2" width="20" height="20" rx="10" fill="white"/>
                <rect x="2" y="2" width="20" height="20" rx="10" fill="white"/>
            </svg>
            <svg v-if="switchSvg==='hover'" @mouseleave="switchSvg='default'" @click="switchSvg='active'" class="switch-svg" width="14.3vw" height="7.5vw" viewBox="0 0 46 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="46" height="24" rx="12" fill="#E7F6FC"/>
                <rect x="2" y="2" width="20" height="20" rx="10" fill="white"/>
            </svg>
            <svg v-if="switchSvg==='active'" @click="switchSvg='default'" class="switch-svg" width="14.3vw" height="7.5vw" viewBox="0 0 46 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="46" height="24" rx="12" fill="#61AFD2"/>
                <rect x="24" y="2" width="20" height="20" rx="10" fill="white"/>
            </svg>

        </div>
        <button class="button-apply" @click="filterApply"><img v-if="buttonName === `Ждём...`" src="/wait.svg" alt="" class="wait-svg">{{ buttonName || `Применить` }}</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Checkbox from 'primevue/checkbox'
import Slider from 'primevue/slider'
import { ref, watch, computed } from "vue"
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
    closeFilter: Function,
    applyAndCloseFilter: Function    
});

const categories = ref([
    {name: "Одежда"},
    {name: "Обувь"},
    {name: "Аксессуары, электроника"},
    {name: "Беговые лыжи"},
    {name: "Горные лыжи"},
    {name: "Сноуборды"},
    {name: "Коньки"},
    {name: "Шлемы"}
]);
const selectedCategories = ref('');

const rangeValue = ref([20, 80]);

let rangePrice = rangeValue.value.map(value => value * 500);

watch(rangeValue, () => {
    rangePrice = rangeValue.value.map(value => value * 500);    
    return rangePrice
})

const switchSvg = ref('default');

const buttonName = ref('');

const isButtonApplyPushed = ref(false);

const filterApply = () => {
    buttonName.value = 'Ждём...';
    store.commit('setSelectedCategories', selectedCategories.value);            
    store.commit('setRangePrice', rangePrice);
    if (switchSvg.value === 'active') {
        store.commit('setInStock', true);
    } else {
        store.commit('setInStock', false);
    }  
    props.applyAndCloseFilter();
    buttonName.value = ''; 
}
</script>
