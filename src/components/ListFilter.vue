<template>
    <div class="list-filter-container">
        <h4 class="heading">Каталог</h4>
        <div class="list-filter">
            <button class="filter-button" @click="openFilter" :style="{ width: isButtonApplyPushed ? '119px' : '87px' }">
                <span>Фильтр</span>
                <img v-if="isButtonApplyPushed" src="/badge-filter.svg" class="filter-badge-icon" alt="">
            </button>
            <div class="filter">
                <div class="filter-category-and-price"> 
                    <div class="filter-category">
                        <div class="custom-select" ref="dropdownRef">
                            <div class="select-selected-icon" @click="toggleDropdown" >
                                <div class="select-selected">Категория</div>
                                <svg v-if="dropdownOpen" @click.stop="toggleDropdown" class="svg-dropdown" width="2.6vw" height="2.6vw" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 7L10 13L16 7" stroke="#0B0B0B" stroke-linecap="round" transform="rotate(180, 10, 10)" />
                                </svg>
                                <svg v-else @click.stop="toggleDropdown" class="svg-dropdown" width="2.6vw" height="2.6vw" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 7L10 13L16 7" stroke="#0B0B0B" stroke-linecap="round"/>
                                </svg>
                            </div>                            
                            <div class="select-items" v-show="dropdownOpen">
                                <div class="select-item" v-for="category in categories" :key="category.name" @click="selectItem(category.name)">
                                    <Checkbox v-model="selectedCategories" :id="category.name" name="category" :value="category.name" />
                                    <label class="checkbox-label" :for="category.name">{{ category.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button @click="activePriceFilter" class="filter-price" :style="{ border: isPriceFilterActive ? '1px solid #0B0B0B' : '' }">Цена, ₽
                        <div v-if="isPriceFilterActive" @click="activePriceFilter" class="price-range">
                            <Slider v-model="rangeValue" range class="slider-range" />
                            <div class="price-value">
                                <div class="price-value-box">
                                    <span>от {{ rangeValue[0]*500 }}</span>
                                </div>
                                <svg width="2.6vw" height="2.6vw" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.125 10H16.875" stroke="#0B0B0B" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <div class="price-value-box">
                                    <span>до {{ rangeValue[1]*500 }}</span>
                                </div>    
                            </div>
                        </div>
                    </button>                    
                </div>                
                <div class="in-stock">
                    <span>Показывать только в наличии</span>
                    <svg v-if="switchSvg==='default'" @mousemove="switchSvg='hover'" class="switch-svg" width="5.99vw" height="3.13vw" viewBox="0 0 46 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="46" height="24" rx="12" fill="#F5F5F5"/>
                        <rect x="2" y="2" width="20" height="20" rx="10" fill="white"/>
                        <rect x="2" y="2" width="20" height="20" rx="10" fill="white"/>
                    </svg>
                    <svg v-if="switchSvg==='hover'" @mouseleave="switchSvg='default'" @click="switchSvg='active'" class="switch-svg" width="5.99vw" height="3.13vw" viewBox="0 0 46 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="46" height="24" rx="12" fill="#E7F6FC"/>
                        <rect x="2" y="2" width="20" height="20" rx="10" fill="white"/>
                    </svg>
                    <svg v-if="switchSvg==='active'" @click="switchSvg='default'" class="switch-svg" width="5.99vw" height="3.13vw" viewBox="0 0 46 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="46" height="24" rx="12" fill="#61AFD2"/>
                        <rect x="24" y="2" width="20" height="20" rx="10" fill="white"/>
                    </svg>
                </div>
            </div>  
            <div v-if="selectedCategory || isRangePriceSelected" class="filter-selected">
                <div class="filter-selected-category">
                    <span>{{ selectedCategory }}</span>
                    <svg class="svg-remove-icon" v-if="selectedCategory" @click="removeSelectedCategory" width="2.6vw" height="2.6vw" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.75 5.25L5.25 18.75M18.75 18.75L5.25 5.25" transform="scale(0.8)" stroke="#0B0B0B" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>                    
                </div>
                <div v-if="isRangePriceSelected" class="filter-selected-price">
                    <span>Цена от {{ formatPrice(rangeValue[0]*500) }} до {{ formatPrice(rangeValue[1]*500) }}</span>
                    <svg class="svg-remove-icon" @click="removeRangePrice" width="2.6vw" height="2.6vw" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.75 5.25L5.25 18.75M18.75 18.75L5.25 5.25" transform="scale(0.8)" stroke="#0B0B0B" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>    
                </div>
            </div>          
            <SliderCarousel v-if="!isBreakpointBetter992px" />
            <SliderCarouselDesktop v-else />
        </div>
    </div>
</template>


<script setup>
import SliderCarousel from './SliderCarousel.vue'
import SliderCarouselDesktop from './SliderCarouselDesktop.vue'
import { useStore } from 'vuex'
import { ref, computed, onMounted, onUnmounted, watch } from "vue"
import Checkbox from 'primevue/checkbox'
import Slider from 'primevue/slider'
import { formatPrice } from '../utils/formatPrice.js'


const store = useStore()

const props = defineProps({
    openFilter: Function
});

const isBreakpointBetter992px = ref(window.innerWidth >= 992);

const checkScreenWidth = () => {
    isBreakpointBetter992px.value = window.innerWidth >= 992;
};

const dropdownOpen = ref(false);
const dropdownRef = ref(null);
const isButtonApplyPushed = computed(() => store.state.filterModule.isButtonApplyPushed);

const isPriceFilterActive = ref(false);

const switchSvg = ref('default');

const rangeValue = ref([20, 80]);

let rangePrice = rangeValue.value.map(value => value * 500);

watch(rangeValue, () => {
    rangePrice = rangeValue.value.map(value => value * 500);    
    return rangePrice
})

const isRangePriceSelected = ref(false);

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

const selectedCategories = ref([]);

const toggleDropdown = () => {
    if (dropdownOpen.value) {
        dropdownOpen.value = false;
    } else {
        dropdownOpen.value = true;
    }
}

const activePriceFilter = () => {
    if (isPriceFilterActive.value) {
        isPriceFilterActive.value = !isPriceFilterActive.value;
        isRangePriceSelected.value = true;
        store.commit("setRangePrice", rangePrice);
    } else {
        isPriceFilterActive.value = !isPriceFilterActive.value;
        store.commit("setRangePrice", rangePrice);
    }
}

let selectedCategory;
const selectItem = (name) => {
    selectedCategories.value = [];
    selectedCategories.value.push(name);   
    selectedCategory = selectedCategories.value[0];     
    toggleDropdown();
    store.commit("setSelectedCategories", selectedCategories.value);
    return selectedCategory, selectedCategories;
};

const removeSelectedCategory = () => {
    selectedCategories.value = [];
    selectedCategory = '';
    store.commit("setSelectedCategories", selectedCategories.value);
}

const removeRangePrice = () => {
    isRangePriceSelected.value = false;
    rangePrice = [0, 100000];
    store.commit("setRangePrice", rangePrice);
}

const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        dropdownOpen.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    window.removeEventListener('resize', checkScreenWidth);
})

onUnmounted(() => {
    window.removeEventListener('resize', checkScreenWidth);
});
</script>
