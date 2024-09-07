const filterModule = {
    state: {
        selectedCategories: '',
        rangePrice:[0, 100000],
        InStock: false,
        isButtonApplyPushed: false
    },
    mutations: {
        setSelectedCategories(state, selectedCategories) {
            state.selectedCategories = selectedCategories
        },
        setRangePrice(state, rangePrice) {
            state.rangePrice = rangePrice
        },
        setInStock(state, value) {
            state.InStock = value
        },
        setIsButtonApplyPushed(state, value) {
            state.isButtonApplyPushed = value
        }
    },
    getters: {
        getSelectedCategories(state) {
            return state.selectedCategories
        },
        getRangePrice(state) {
            return state.rangePrice
        },
        getInStock(state) {
            return state.InStock
        }
    }
}

export default filterModule