import { Product } from "../models/Product";

export const createProduct = async (data) => {
    const obj = await Product.create(data);
    return obj;
};

export const updateProduct = async (productId, data) => {
    const obj = await Product.findOneAndUpdate({ _id: productId }, data);
    return obj;
};
