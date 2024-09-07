<template>
    <div>
        <div class="popup-background"></div>
        <div class="popup-content">
            <svg class="svg-close-popup" @click="closeDetails" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.75 5.25L5.25 18.75M18.75 18.75L5.25 5.25" stroke="#0B0B0B" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="photos">
                <div class="photo-zoom">
                    <img v-if="selectedProduct.images.length" 
                        :src="selectedProduct.images[activeImageIndex]" 
                        alt="Active Photo" 
                        class="photo-zoom-image"
                    />
                </div>
                <div class="photo-list">
                    <img 
                        v-for="(image, index) in selectedProduct.images" 
                        :key="index" 
                        class="photo-list-item" 
                        :src="image" 
                        alt="Photo"
                        :class="{ active: activeImageIndex === index }" 
                        @click="setActiveImage(index)"
                    >
                </div>
            </div>
            <div class="product-card-details">
                <div class="product-card-details-title">
                    <span>{{ selectedProduct.description }}</span>
                </div>
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
                    <span class="product-card-details-description-text">{{ selectedProduct.longDescription }}</span>
                </div>
                <div class="product-card-details-price">
                    <span class="product-card-details-current-price">{{ formatPrice(selectedProduct.currentPrice) }}</span>
                    <span class="product-card-details-old-price">{{ formatPrice(selectedProduct.oldPrice) }}</span>
                </div>
                <button class="product-card-details-button-add" @click="addProduct"><img v-if="buttonName === `Ждём...`" src="/wait.svg" alt="" class="wait-svg">{{ buttonName || `Добавить в корзину` }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex"
import { computed, ref } from 'vue'
import { formatPrice } from "../utils/formatPrice"

const store = useStore()

const isShoes = computed(() => store.getters.getIsShoes)

const selectedProduct = computed(() => store.getters.getSelectedProduct)

const activeImageIndex = ref(0);

const activeColor = computed(() => store.state.productCardModule.activeColor)
const activeSize = computed(() => store.state.productCardModule.activeSize)
const buttonName = ref('');

const colorsCloth = computed(() => store.getters.getColorsCloth);
const colorsShoes = computed(() => store.getters.getColorsShoes);

const sizesCloth = computed(() => store.getters.getSizesCloth);
const sizesShoes = computed(() => store.getters.getSizesShoes);

const closeDetails = () => {
    store.commit('setProductCardDetailsPopup', false);  
    store.commit('setSelectedProduct', null);  
}

const setActiveImage = (index) => {
  activeImageIndex.value = index;
};

const addProduct = () => {
    buttonName.value = 'Ждём...';
    alert('Товар добавлен в корзину!');
    buttonName.value = '';
}
</script>