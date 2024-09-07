<template>
    <div class="list">
        <Carousel :value="filteredProducts" :numVisible="numVisible" :numScroll="1">
            <template #item="slotProps">
                <router-link :to="slotProps.data.path" class="product-link" @click="goPageOrPopup(slotProps.data)" @mousemove="sizeColorShow(slotProps.data)" @mouseleave="sizeColorHide(slotProps.data)">
                    <div class="product-card">
                        <img :src="slotProps.data.images[0]" alt="product" class="product-image" />
                        <div class="product-info">
                            <div class="product-price">
                                <span class="current-price">{{ formatPrice(slotProps.data.currentPrice) }}</span>
                                <span class="old-price">{{ formatPrice(slotProps.data.oldPrice) }}</span>
                            </div>
                            <span class="product-description">{{ slotProps.data.description }}</span>   
                            <div v-if="isSizeColorShow[slotProps.data.id] && isBreakpointBetter992px" class="product-size">
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
                            <div v-if="isSizeColorShow[slotProps.data.id] && isBreakpointBetter992px" class="product-color">
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
                        </div>
                    </div> 
                </router-link>                
            </template>
        </Carousel>
    </div>
</template>

<script setup>
import Carousel from "primevue/carousel";
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import { useStore } from "vuex";
import { formatPrice } from "../utils/formatPrice";

const store = useStore();
const products = computed(() => store.getters.getProducts);
const selectedProduct = ref(null)
const selectedCategories = computed(() => store.getters.getSelectedCategories);
const rangePrice = computed(() => store.getters.getRangePrice);

const isMobile = ref(window.innerWidth < 768);

const isBreakpointBetter992px = ref(window.innerWidth >= 992);

const isShoes = computed(() => store.getters.getIsShoes)

const isSizeColorShow = ref({});

const activeColor = computed(() => store.state.productCardModule.activeColor)
const activeSize = computed(() => store.state.productCardModule.activeSize)
    
const colorsCloth = computed(() => store.getters.getColorsCloth);
const colorsShoes = computed(() => store.getters.getColorsShoes);

const sizesCloth = computed(() => store.getters.getSizesCloth);
const sizesShoes = computed(() => store.getters.getSizesShoes);

const numVisible = ref(2);

const checkScreenWidth = () => {
    isMobile.value = window.innerWidth < 768;
    isBreakpointBetter992px.value = window.innerWidth >= 992;
};
const goPageOrPopup = (product) => {
    if (isMobile.value) {
        store.commit("setRouterUse", true);
        if (product["categoryEng"] == "shoes") {
            store.commit("setIsShoes", true);
        } else {
            store.commit("setIsShoes", false);
        }
    } else {
        selectedProduct.value = product;
        if (product["categoryEng"] == "shoes") {
            store.commit("setIsShoes", true);
        } else {
            store.commit("setIsShoes", false);
        }
        store.commit("setProductCardDetailsPopup", true);
        store.commit("setSelectedProduct", selectedProduct.value);
    }  
};

const sizeColorShow = (product) => {    
    if (product["categoryEng"] == "shoes") {
        store.commit("setIsShoes", true);
    } else {
        store.commit("setIsShoes", false);
    }
    isSizeColorShow.value[product.id] = true;
};

const sizeColorHide = (product) => {
    isSizeColorShow.value[product.id] = false;
};

const filteredProducts = computed(() => {
    let filtered = products.value;

    // Фильтрация по категориям
    if (selectedCategories.value.length > 0) {
        filtered = filtered.filter(product =>
            selectedCategories.value.includes(product.category)
        );
    }
    // Фильтрация по ценовому диапазону  
    return filtered.filter(product => 
        product.currentPrice >= rangePrice.value[0] && product.currentPrice <= rangePrice.value[1]
    );
});

const updateNumVisible = () => {
    const width = window.innerWidth;
    numVisible.value = width >= 768 ? 3 : 2;
};

onMounted(() => {
    updateNumVisible(); 
    window.addEventListener('resize', updateNumVisible); 
     window.addEventListener('resize', checkScreenWidth)
});

onUnmounted(() => {
    window.removeEventListener('resize', updateNumVisible); 
     window.removeEventListener('resize', checkScreenWidth);
});
</script>

<style scoped>
</style>
