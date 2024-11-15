const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./Review");

const foodListingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    images: {  // Changed to match the Joi schema and form
        url:String,
        filename:String,
    },

    location: {
        type: String,
        required: true,
    },
    DeliveryCharge: {
        type: Number,
        required: true,
    },
    _id: {   
    type: Schema.Types.ObjectId,
  },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});

// Middleware to delete reviews when a listing is deleted
foodListingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const FoodListing = mongoose.model("FoodListing", foodListingSchema);
module.exports = FoodListing; 