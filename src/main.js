import { createApp } from 'vue'
import PrimeVue from "primevue/config"
import './assets/css/styles.css'
import App from './App.vue'
import store from '/store/index.js'
import router from './router/index.js'
import ProductCardDetailsPage from './components/ProductCardDetailsPage.vue'
import ProductCardDetailsPopup from './components/ProductCardDetailsPopup.vue'
import ToastService from 'primevue/toastservice'


const app = createApp(App);

app.use(PrimeVue);
app.use(store);
app.use(router);
app.use(ToastService);

app.component('product-card-details-page', ProductCardDetailsPage);
app.component('product-card-details-popup', ProductCardDetailsPopup);

app.mount('#app')