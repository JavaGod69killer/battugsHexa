import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Hero from "../components/Hero";
import { FaStar } from "react-icons/fa";
import { useUser, SignInButton } from "@clerk/clerk-react";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useUser();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetail();
  }, [id]);

  // Check if product is already in the cart when the page loads
  useEffect(() => {
    if (user && user.unsafeMetadata.cart) {
      const cart = user.unsafeMetadata.cart;
      setIsInCart(!!cart[id]);
    }
  }, [user, id]);

  const buyBasket = (productId) => {
    if (!user) return;

    let userData = user.unsafeMetadata || {};
    userData.cart = userData.cart || {};

    // Add or remove product from cart
    if (userData.cart[productId]) {
      delete userData.cart[productId]; // Remove product
      setIsInCart(false); // Set the cart status to not in cart
    } else {
      userData.cart[productId] = quantity; // Add product with quantity
      setIsInCart(true); // Set the cart status to in cart
    }

    // Update cart in Clerk's unsafeMetadata
    user
      .update({ unsafeMetadata: userData })
      .then(() => console.log("Cart updated", userData.cart))
      .catch((error) => console.error("Error updating cart:", error));
  };

  const handleQuantityChange = (action) => {
    setQuantity((prevQuantity) => {
      if (action === "increase") return prevQuantity + 1;
      if (action === "decrease" && prevQuantity > 1) return prevQuantity - 1;
      return prevQuantity;
    });
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-detail-page">
      <div className="mb-20">
        <Hero />
      </div>
      <div className="container mx-auto py-10">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg mb-5"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
            <p className="text-xl text-gray-600 mb-4">${product.price}</p>
            <ul className="flex mb-4">
              {[...Array(5)].map((_, index) => (
                <li key={index}>
                  <FaStar />
                </li>
              ))}
            </ul>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="quantity-selector flex items-center mb-6">
              <button
                onClick={() => handleQuantityChange("decrease")}
                className="border px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                min="1"
                readOnly
                className="mx-2 w-16 text-center border py-1 rounded-md"
              />
              <button
                onClick={() => handleQuantityChange("increase")}
                className="border px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <div className="total-price mb-6">
              <h3 className="text-xl font-semibold">Total: ${totalPrice}</h3>
            </div>

            {user ? (
              <button
                onClick={() => buyBasket(product.id)}
                className="w-1/3 py-3 border text-black rounded-lg hover:bg-scale-600 transition duration-300"
              >
                {isInCart ? "Remove from Cart" : "Add to Cart"}
              </button>
            ) : (
              <SignInButton className="w-1/3 py-3 border text-black rounded-lg hover:bg-scale-600 transition duration-300">
                Sign In
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
