import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt={name}
        />
        <p className="text-sm pt-3 pb-1">{name}</p>
        <p className="text-sm font-semibold">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;