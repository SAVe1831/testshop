const productCardModule = {
    state: {
        activeColor: '#7FFFD4',
        activeSize: '40/42',
        colorsCloth: [
            { hex: '#7FFFD4', src: '/color-aquamarine.svg', alt: 'aquamarine' },
            { hex: '#FF0000', src: '/color-red.svg', alt: 'red' },
            { hex: '#008000', src: '/color-green.svg', alt: 'green' },
            { hex: '#000000', src: '/color-black.svg', alt: 'black' }
        ],
        colorsShoes: [
            { hex: '#000000', src: '/color-black.svg', alt: 'black' },
            { hex: '#BE7E50', src: '/color-brown.svg', alt: 'brown' },
            { hex: '#D9D9D9', src: '/color-gray.svg', alt: 'gray' },
            { hex: '#FFFFFF', src: '/color-white.svg', alt: 'white' }
        ],
        sizesCloth: ['40/42', '42/44', '44/46', '46/48'],
        sizesShoes: ['39', '40', '41', '42', '43', '44'],
        isShoes: false
    },
    mutations: {
        setActiveColor(state, color) {
            state.activeColor = color
        },
        setActiveSize(state, size) {
            state.activeSize = size
        },
        setIsShoes(state, value) {
            state.isShoes = value
        }
    },
    getters: {
        getColorsCloth(state) {
            return state.colorsCloth
        },
        getColorsShoes(state) {
            return state.colorsShoes
        },
        getSizesCloth(state) {
            return state.sizesCloth
        },
        getSizesShoes(state) {
            return state.sizesShoes
        },
        getIsShoes(state) {
            return state.isShoes
        }
    }
}

export default productCardModule