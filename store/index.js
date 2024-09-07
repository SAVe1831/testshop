import { createStore } from "vuex"
import sliderModule from "./sliderModule"
import timerModule from "./timerModule"
import formModule from "./formModule"
import authModule from "./AuthModule"
import routerUseModule from "./routerUseModule"
import productCardModule from "./productCardModule"
import filterModule from "./filterModule"
import popupModule from "./popupModule"

const store = createStore({
  modules: {
    timerModule,
    sliderModule,
    formModule,
    authModule,
    routerUseModule,
    productCardModule,
    filterModule,
    popupModule   
  }
});

export default store  