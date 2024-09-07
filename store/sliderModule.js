const sliderModule = {
    state: {
        products: [
            { 
                id: 1,
                images: ["product1.png", "product1-2.png", "product1-3.png"],
                categoryEng: "shoes", 
                currentPrice: 32190, 
                oldPrice: 58990, 
                description: "Ботинки мужские Kappa Seicento Puffy", 
                longDescription: "Ботинки мужские от Kappa Seicento Puffy, понравятся всем, кто увлекается зимними видами спорта.", 
                category: "Обувь",
                InStock: true,
                path: "/product1" 
            },
            { 
                id: 2,
                images: ["product2.png", "product2-2.png", "product2-3.png"], 
                categoryEng: "clothes",
                currentPrice: 22790, 
                oldPrice: 38990, 
                description: "Куртка мужская Kappa Seicento Puffy", 
                longDescription: "Куртка мужская от Kappa Seicento Puffy, понравится всем, кто увлекается зимними видами спорта.", 
                category: "Одежда",
                InStock: false,
                path: "/product2" 
            },
            { 
                id: 3,
                images: ["product3.png", "product3-2.png", "product3-3.png"], 
                categoryEng: "clothes",
                currentPrice: 12190, 
                oldPrice: 22990, 
                description: "Джемпер флисовый женский Outventure", 
                longDescription: "Джемпер флисовый женский Outventure, понравится всем, кто увлекается зимними видами спорта.",
                category: "Одежда", 
                InStock: false,
                path: "/product3" 
            },
            { 
                id: 4,
                images: ["product4.png", "product4-2.png", "product4-3.png"], 
                categoryEng: "clothes",
                currentPrice: 2690, 
                oldPrice: 3990, 
                description: "Термобелье верх женское Rukka Tintto", 
                longDescription: "Термобелье верх женское Rukka Tintto, понравится всем, кто увлекается зимними видами спорта.", 
                category: "Одежда",
                InStock: false,
                path: "/product4" 
            },
            { 
                id: 5,
                images: ["product5.png", "product5-2.png", "product5-3.png"], 
                categoryEng: "clothes",
                currentPrice: 4599, 
                oldPrice: "", 
                description: "Куртка утепленная женская Glissade", 
                longDescription: "Легкая и практичная куртка от Glissade понравится всем, кто увлекается зимними видами спорта.", 
                category: "Одежда",
                InStock: true,
                path: "/product5" 
            },
        ]
    },
    getters: {
        getProducts(state) {
          return state.products;
        },
    },

}

export default sliderModule