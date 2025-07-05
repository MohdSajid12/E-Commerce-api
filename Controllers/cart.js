import { Cart } from "../Models/Cart.js"

//add to cart

export const addToCart = async (req, res) => {
    try {
        const { productId, title, price, qty } = req.body || {};

        const userId = req.user;
        //first we will check any items avaliable in user cart if available then we will increase the quantity
        //otherwise we will add product in user's cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        //findIndex returns -1 in false cases
        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() == productId
        )
        if (itemIndex > -1) {
            cart.items[itemIndex].qty += qty
            cart.items[itemIndex].price += price * qty
        } else {
            cart.items.push({ productId, title, price, qty })
        }

        await cart.save();

        return res.status(200).json({
            message: 'Items added to cart', cart, success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}

//get User cart

export const getUserCart = async (req, res) => {
    try {
        const userId = req.user;
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            res.status(404).json({ message: "No cart found", success: false });
        }
        res.status(200).json({ message: "User cart", cart, success: true });
    } catch (error) {
        console.log(error);
    }
}

//remove product from cart
export const removeProductFromCart = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }

        cart.items = cart.items.filter((item) => item.productId.toString() != productId)

        await cart.save();

        return res.status(200).json({
            message: "Item removed successfully", success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}

export const clearCart = async (req, res) => {
    try {
        const userId = req.user;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new cart({ items: [] })
        } else {
            cart.items = []
        }

        await cart.save();

        return res.status(200).json({
            message: "Cart cleared successfully", success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}

export const decreaseProductQty = async (req, res) => {
    try {
        const { productId, qty } = req.body || {};
        const userId = req.user;
        if (!productId || !qty) {
            return res.status(400).json({ message: "Product ID and qty are required", success: false });
        }

        let cart = await Cart.findOne({ userId });

        // If no cart exists, return error (cannot decrease from non-existent cart)
        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }
        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex > -1) {
            const item = cart.items[itemIndex];

            if (item.qty > qty) {
                const pricePerUnit = item.price / item.qty;
                item.qty -= qty;
                item.price -= pricePerUnit * qty;
            } else {
                // Remove item if qty is 0 or less
                cart.items.splice(itemIndex, 1);
            }
        } else {
            return res.status(404).json({
                message: "Invalid product ID", success: false
            });
        }

        await cart.save();

        return res.status(200).json({ message: "Item quantity decreased", cart, success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
