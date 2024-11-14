import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const LastCollection = () => {
  const [products, setProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=9"
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("shaasangushde:", error);
      }
    };

    fetchProducts();
  }, []);

  // user ashiglan baraagaa sagslav
  const { user } = useUser();

  const buyBasket = (productId) => {
    if (!user) return;
    let userData = user.unsafeMetadata;
    if (!userData.cart) {
      userData.cart = {};
    }
    if (userData.cart[productId]) {
      delete userData.cart[productId];
      setIsInCart(false);
    } else {
      userData.cart[productId] = 1;
      setIsInCart(true);
    }
    user
      .update({
        unsafeMetadata: userData,
      })
      .then(() => console.log("Ystoi goy shaalaa"), console.log(userData.cart));
  };

  return (
    <div className="my-10">
      <div className="text-center py-8">
        <h1 className="inline-flex gap-2 items-center mb-3 font-semibold text-3xl">
          LATEST <span>COLLECTION</span>
        </h1>
        <p className="text-gray-600">Check our products</p>
      </div>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded shadow relative"
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
            >
              <h2 className="font-semibold text-lg">{product.title}</h2>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover mt-2"
              />
              <div className="mt-2 flex flex-wrap justify-between">
                <p className="text-gray-500">${product.price}</p>
                <ul className="flex">
                  {[...Array(5)].map((_, index) => (
                    <li key={index}>
                      <FaStar />
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`${
                  hoveredProductId === product.id
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } absolute bottom-0 left-0 right-0 flex justify-center space-x-4 transition-all duration-500 ease-out py-20`}
              >
                <Link to={`/product/${product.id}`}>
                  <button className="border w-fit bg-slate-50">SEE</button>
                </Link>
                {!!user && (
                  <button
                    onClick={() => buyBasket(product.id)}
                    className="border w-fit bg-slate-50"
                  >
                    {isInCart ? "Remove from Cart" : "Add to Cart"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LastCollection;
