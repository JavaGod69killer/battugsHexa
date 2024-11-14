import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { useParams } from "react-router-dom";

export const CartContext = createContext();

const CartProvider = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchAddedProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(respone.data.product);
      } catch (error) {
        console.error("shaasangue andaa", error);
      }
    };
    fetchAddedProduct();
  }, []);
  return <div>CartProvider</div>;
};

export default CartProvider;
