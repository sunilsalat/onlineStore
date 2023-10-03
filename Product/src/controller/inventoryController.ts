import { Request, Response } from "express";
import * as IDalInventory from "../dataaccess/inventoryService";
import { ProductVariant } from "../models/inventory/ProductVariant";
import mongoose, { Types } from "mongoose";

/* Product */
export const createProduct = async (req: Request, res: Response) => {
    let { categoryId, name, description } = req.body;
    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            const categoryObj = await IDalInventory.findCategoryByFilter({
                _id: categoryId,
            });

            if (!categoryObj) {
                throw new Error("Please select valid category to add product");
            }

            const obj: any = await IDalInventory.createProduct(
                [
                    {
                        categoryId,
                        name,
                        description,
                    },
                ],
                session
            );

            if (obj) {
                const variantObj = await IDalInventory.createProductVariant(
                    [
                        {
                            productId: obj[0]._id,
                            productName: obj[0].name,
                            parentProductId: null,
                        },
                    ],
                    session
                );

                if (variantObj) {
                    // Publish msg and add data to PRODUCT table in ORDER service
                }
            }

            await session.commitTransaction();
            res.status(201).json({ data: obj, msg: "Product created" });
        });
    } catch (error) {
        throw error;
    } finally {
        session.endSession();
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { productId, data } = req.body;
    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            const obj = await IDalInventory.updateProduct(
                { _id: productId },
                data,
                session
            );
            if (obj) {
                await IDalInventory.updateProductsVariant(
                    { productId },
                    { productName: data.name },
                    session
                );
            }

            if (obj) {
                console.log("Reached here");
                // Publish product updated msg to other services
            }
            await session.commitTransaction();
            res.status(200).json({ data: obj, msg: "Product updated" });
        });
    } catch (error) {
        throw error;
    } finally {
        session.endSession();
    }
};

export const getAllProduct = async (req: Request, res: Response) => {
    const {} = req.body;
    const obj = await IDalInventory.findProductsByFilter({});
    res.status(201).json({ data: obj, msg: "" });
};

/* Product Varinat */
export const addProductVariant = async (req: Request, res: Response) => {
    const { productId, variants } = req.body;

    const productObj: any = await IDalInventory.findProductByFilter({
        _id: productId,
    });

    if (!productObj) {
        throw new Error("Please select valid product to add variant");
    }

    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            let sku: any;
            for (let i = 0; i < variants.length; i++) {
                const options = variants[i];
                let productType = "";
                let payload: any = {
                    productId: productObj._id,
                    productName: productObj.name,
                    parentProductId: productObj._id,
                };

                if (sku) {
                    payload.sku = sku;
                }

                // creating product variant
                const varintObj: any = await IDalInventory.createProductVariant(
                    [payload],
                    session
                );

                sku = varintObj[0].sku + 1;

                for (let j = 0; j < options.length; j++) {
                    const attributeOption: any =
                        await IDalInventory.findAttributeOptionByFilter({
                            _id: options[j],
                        });

                    if (attributeOption) {
                        const { _id, name, attributeId } = attributeOption;
                        // adding product attributes
                        const productatt: any =
                            await IDalInventory.createProductAttributes(
                                [
                                    {
                                        productId: productObj._id,
                                        sku: varintObj[0].sku,
                                        attributeId: attributeId._id,
                                        attribute: attributeId.name,
                                        attributeOptionId: _id,
                                        attributeOption: name,
                                    },
                                ],
                                session
                            );
                        productType += `${productatt[0].attributeOption},`;
                    }
                }

                const isVariantExists = await IDalInventory.findVariantByFilter(
                    {
                        productId,
                        productType,
                    }
                );

                if (isVariantExists) {
                    throw Error(
                        "Product variant already exsits, Please choose different attribute"
                    );
                }

                varintObj[0].productType = productType;
                await varintObj[0].save();
                productType = "";
            }
            await session.commitTransaction();
            res.status(201).json({ data: "", msg: "Product variants created" });
        });
    } catch (error) {
        throw error;
    } finally {
        session.endSession();
    }
};

export const getAllProductVariants = async (req: Request, res: Response) => {
    const { productId } = req.body;
    const variants = await IDalInventory.findVariantsByFilter({
        productId: new Types.ObjectId(productId),
    });
    res.status(200).json({ data: variants, msg: "" });
};

/* Category */
export const createCategory = async (req: Request, res: Response) => {
    const data = req.body;
    const obj = await IDalInventory.createCategory(data);
    res.status(201).json({ data: obj, msg: "Category created" });
};

export const getAllCategory = async (req: Request, res: Response) => {
    const { data } = req.body;
    const obj = await IDalInventory.findCategoriesByFilter({});
    res.status(201).json({ data: obj, msg: "" });
};

/* Attribute */
export const createAttribute = async (req: Request, res: Response) => {
    const data = req.body;
    const obj = await IDalInventory.createAttribute(data);
    res.status(201).json({ data: obj, msg: "Attribute created" });
};

export const getAllAttribute = async (req: Request, res: Response) => {
    const {} = req.body;
    const obj = await IDalInventory.findAttributesByFilter({});
    res.status(201).json({ data: obj, msg: "" });
};

/* Attribute Options */
export const createAttributeOptions = async (req: Request, res: Response) => {
    const data = req.body;
    const obj = await IDalInventory.createAttributeOption(data);
    res.status(201).json({ data: obj, msg: "Attribute Option Created" });
};

export const getAllAttributeOptions = async (req: Request, res: Response) => {
    const { attributeId } = req.body;
    const obj = await IDalInventory.findAttributeOptionsByFilter({
        attributeId,
    });
    res.status(201).json({ data: obj, msg: "" });
};
