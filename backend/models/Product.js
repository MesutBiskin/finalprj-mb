const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        min: 4,
    },
    desc: {
        type : String,
        requried: true,

    },
    img: {
        type: String,
        requried: true,
    },
    review:{
        type: Number,
        requried: true,
    },
    category: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Product", ProductSchema)