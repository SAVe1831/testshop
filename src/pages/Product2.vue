<template>
    <product-card-details-page
        :description="product.description"
        :image="product.images[0]"
        :long-description="product.longDescription"
        :current-price="product.currentPrice"
        :old-price="product.oldPrice"
    ></product-card-details-page>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const product = computed(() => store.getters.getProducts[1]) 
</script>
