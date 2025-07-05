import { Product } from "../Models/Product.js";

//add product
export const addProduct = async (req, res) => {
    try {
        let product = await Product.create(req.body);

        return res.status(200).json({
            message: "Product addess successfully",
            product,
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}

//get product
export const getAllProduct = async (req, res) => {
    try {
        let products = await Product.find();

        if (!products) {
            return res.status(401).json({ message: "No Products found", success: false });
        }
        return res.status(200).json({ message: "All product fetch successfully", products, success: true });
    } catch (error) {
        console.log(error);
    }
}

//get product by ID
export const getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        let product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Invalid Id", success: false });
        }
        return res.status(200).json({ message: "Product fetch successfully", product, success: true });
    } catch (error) {
        console.log(error);
    }
}

//update product by Id
export const updateProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Invalid Id", success: false });
        }
        return res.status(200).json({ message: "Product updated successfully", product, success: true });
    } catch (error) {
        console.log(error);
    }

}

export const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOneAndDelete(id);
        if (!product) {
            return res.status(404).json({ messaage: "NO product found", success: false });
        }
        return res.status(200).json({
            message: "Delete successfully",
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }

}