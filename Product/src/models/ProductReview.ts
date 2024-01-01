import mongoose, { Model, Schema, Types } from "mongoose";

interface IReview {
    rating: number;
    title: string;
    comment: string;
    userId: Types.ObjectId;
    productId: Types.ObjectId;
}

interface ReviewModel extends Model<IReview> {
    calculateAvgRating(): void;
}

const ReviewSchema = new Schema<IReview, ReviewModel>(
    {
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: [true, "Rating can not be empty"],
        },
        title: {
            type: String,
            maxlength: 100,
            trim: true,
            required: [true, "Rating can not be empty"],
        },
        comment: {
            type: String,
            required: [true, "Comment can not be empty"],
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User can not be empty"],
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product can not be empty"],
        },
    },
    { timestamps: true }
);

// only one review can be added by one user per product, use compounding index
ReviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

// agg all review for a particular product and save it to the product shhema post review save

ReviewSchema.statics.calculateAvgRating = async function (productId) {
    const result = await this.aggregate([
        {
            $match: { productId: productId },
        },
        {
            $group: {
                _id: null,
                avgRating: { $avg: "$rating" },
                countOfRev: { $sum: 1 },
            },
        },
    ]);

    try {
        // @ts-ignore
        await this.model("Product").findOneAndUpdate(
            { _id: productId },
            {
                avgRatings: Math.ceil(result[0]?.avgRating || 0),
                countOfReviews: Math.ceil(result[0]?.countOfRev || 0),
            }
        );
    } catch (error) {
        console.log(error);
    }
};

ReviewSchema.post("save", async function () {
    // @ts-ignore
    await this.constructor.calculateAvgRating(this.productId);
});

// @ts-ignore
ReviewSchema.post("remove", async function () {
    // @ts-ignore
    await this.constructor.calculateAvgRating(this.productId);
});

const Review = mongoose.model<IReview, ReviewModel>("Review", ReviewSchema);

export { Review };
