const popupModule = {
    state: {
        isProductCardDetailsPopup: false,
        selectedProduct: null
    },
    mutations: {
        setProductCardDetailsPopup(state, value) {
            state.isProductCardDetailsPopup = value
        },
        setSelectedProduct(state, value) {
            state.selectedProduct = value
        }
    },
    getters: {
        getSelectedProduct(state) {
            return state.selectedProduct
        }
    }
}

export default popupModule