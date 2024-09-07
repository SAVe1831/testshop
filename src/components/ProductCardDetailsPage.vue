<template>
    <div class="product-card-details">
        <div class="product-card-details-title">
            <span>{{ description }}</span>
            <router-link @click="closeDetails" to="/">
            <svg width="7.5vw" height="7.5vw" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.75 5.25L5.25 18.75M18.75 18.75L5.25 5.25" stroke="#0B0B0B" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </router-link>
        </div>
        <img :src="image" class="product-card-details-image"  alt="Product-image">
        <div class="product-card-details-colors">
            <span class="product-card-details-colors-text">Цвет:</span>
            <div v-if="!isShoes" class="product-card-details-colors-list">
                <img 
                    v-for="(color, index) in colorsCloth"
                    :key="index"
                    class="product-card-details-colors-list-item"
                    :data-color="color.hex"
                    :src="color.src"
                    :alt="color.alt"
                    @click="store.commit('setActiveColor', color.hex)"
                    :style="{ borderColor: activeColor === color.hex ? activeColor : '#F5F5F5' }"
                />
            </div>
            <div v-else class="product-card-details-colors-list">
                <img 
                    v-for="(color, index) in colorsShoes"
                    :key="index"
                    class="product-card-details-colors-list-item"
                    :data-color="color.hex"
                    :src="color.src"
                    :alt="color.alt"
                    @click="store.commit('setActiveColor', color.hex)"
                    :style="{ borderColor: activeColor === color.hex ? activeColor : '#F5F5F5' }"
                />
            </div>
        </div>
        <div class="product-card-details-size">
            <span class="product-card-details-size-text">Размер:</span>
            <div v-if="!isShoes" class="product-card-details-size-choise">
                <div 
                    v-for="(size, index) in sizesCloth" 
                    :key="index" 
                    class="product-card-details-size-choise-item"
                    @click="store.commit('setActiveSize', size)"
                    :style="{ textDecoration: activeSize === size ? 'underline' : 'none', color: activeSize === size ? '#0B0B0B' : '#707070' }"
                >
                    {{ size }}
                </div>
            </div>
            <div v-else class="product-card-details-size-choise">
                <div 
                    v-for="(size, index) in sizesShoes" 
                    :key="index" 
                    class="product-card-details-size-choise-item"
                    @click="store.commit('setActiveSize', size)"
                    :style="{ textDecoration: activeSize === size ? 'underline' : 'none', color: activeSize === size ? '#0B0B0B' : '#707070' }"
                >
                    {{ size }}
                </div>
            </div>
        </div>
        <div class="product-card-details-description">
            <span class="product-card-details-description-title">Описание:</span>
            <span class="product-card-details-description-text">{{ longDescription }}</span>
        </div>
        <div class="product-card-details-price">
            <span class="product-card-details-current-price">{{ formatPrice(currentPrice) }}</span>
            <span class="product-card-details-old-price">{{ formatPrice(oldPrice) }}</span>
        </div>
        <button class="product-card-details-button-add" @click="addProduct"><img v-if="buttonName === `Ждём...`" src="/wait.svg" alt="" class="wait-svg">{{ buttonName || `Добавить в корзину` }}</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from "vuex"
import { computed, ref } from 'vue'
import { formatPrice } from "../utils/formatPrice"


const props = defineProps({
    description: String,
    image: String,
    longDescription: String,
    currentPrice: Number,
    oldPrice: Number
})

const store = useStore()
const router = useRouter()

const isShoes = computed(() => store.getters.getIsShoes)

const activeColor = computed(() => store.state.productCardModule.activeColor)
const activeSize = computed(() => store.state.productCardModule.activeSize)
const buttonName = ref('');

const colorsCloth = computed(() => store.getters.getColorsCloth);
const colorsShoes = computed(() => store.getters.getColorsShoes);

const sizesCloth = computed(() => store.getters.getSizesCloth);
const sizesShoes = computed(() => store.getters.getSizesShoes);

const closeDetails = () => {
    store.commit('setRouterUse', false);    
}

const addProduct = () => {
    buttonName.value = 'Ждём...';
    alert('Товар добавлен в корзину!');
    buttonName.value = '';
}
</script>
