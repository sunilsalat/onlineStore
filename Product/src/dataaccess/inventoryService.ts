import { Types } from "mongoose";
import { Attribute } from "../models/inventory/Attribute";
import { AttributeOption } from "../models/inventory/AttributeOptions";
import { Category } from "../models/inventory/Category";
import { Product } from "../models/inventory/Product";
import { ProductAttribute } from "../models/inventory/ProductAttribute";
import { ProductVariant } from "../models/inventory/ProductVariant";
import { StoreProduct } from "../models/inventory/StoreProduct";

/* Product */
export const createProduct = async (data: any, session?: any) => {
    const productObj = await Product.create(data, { session: session });
    return productObj;
};

export const updateProduct = async (filter: any, data: any, session?: any) => {
    const productObj = await Product.findOneAndUpdate(filter, data, {
        session: session,
    });
    return productObj;
};

export const findProductByFilter = async (filters: any) => {
    const productObj = await Product.findOne(filters);
    return productObj;
};

export const findProductsByFilter = async (filters: any) => {
    const productObj = await Product.find(filters);
    return productObj;
};

/* Product Variants */
export const createProductVariant = async (data: any, session?: any) => {
    const obj = await ProductVariant.create(data, { session: session });
    return obj;
};

export const findVariantsByFilter = async (filter: any) => {
    const obj = await ProductVariant.find(filter);
    return obj;
};

export const findVariantByFilter = async (filter: any) => {
    const obj = await ProductVariant.findOne(filter);
    return obj;
};

export const updateProductVariant = async (
    filter: any,
    data: any,
    session?: any
) => {
    const obj = await ProductVariant.findOneAndUpdate(filter, data, {
        new: true,
    });
    return obj;
};

export const updateProductsVariant = async (
    filter: any,
    data: any,
    session?: any
) => {
    const productObj = await ProductVariant.updateMany(filter, data, {
        session,
    });
    return productObj;
};

/* Product Attribute */
export const createProductAttributes = async (data: any, session?: any) => {
    const productAttribute = await ProductAttribute.create(data, {
        session: session,
    });
    return productAttribute;
};

/*  Category  */
export const createCategory = async (data: any) => {
    const obj = await Category.create(data);
    return obj;
};

export const findCategoryByFilter = async (filter: any) => {
    const obj = await Category.findOne(filter);
    return obj;
};

export const findCategoriesByFilter = async (filter: any) => {
    const obj = await Category.find(filter);
    return obj;
};

/* Attribute */
export const createAttribute = async (data: any) => {
    const obj = await Attribute.create(data);
    return obj;
};

export const findAttributesByFilter = async (filter: any) => {
    const obj = await Attribute.find(filter);
    return obj;
};

/* Attribute Options */
export const createAttributeOption = async (data: any) => {
    const obj = await AttributeOption.create(data);
    return obj;
};

export const findAttributeOptionByFilter = async (filter: any) => {
    const obj = await AttributeOption.findOne(filter).populate([
        { path: "attributeId" },
    ]);
    return obj;
};

export const findAttributeOptionsByFilter = async (filter: any) => {
    const obj = await AttributeOption.find(filter);
    return obj;
};
