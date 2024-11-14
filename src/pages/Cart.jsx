import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

export function Cart() {
  const { user } = useUser();
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(user?.unsafeMetadata.cart || {});
  const [products, setProducts] = useState([]);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    if (cart) {
      const fetchProductData = async () => {
        let newTotal = 0;
        try {
          const productRequests = Object.entries(cart).map(([id]) =>
            fetch(`https://dummyjson.com/products/${id}`).then((res) =>
              res.json()
            )
          );

          const productData = await Promise.all(productRequests);

          setProducts(productData);

          productData.forEach((data, index) => {
            const productId = Object.keys(cart)[index];
            newTotal += data.price * cart[productId];
          });

          setTotal(newTotal);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };

      fetchProductData();
    }
  }, [cart]);

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = { ...cart };

    if (quantity === 0) {
      delete updatedCart[id];
    } else {
      updatedCart[id] = quantity;
    }

    setCart(updatedCart);

    user
      .update({ unsafeMetadata: { ...user.unsafeMetadata, cart: updatedCart } })
      .then(() => {
        console.log("Updated cart");
      });
  };

  const handlePurchase = () => {
    user.unsafeMetadata.cart = {};
    user.update({ unsafeMetadata: user.unsafeMetadata }).then(() => {
      setCart({});
      setTotal(0);
      setIsPurchased(true);
      console.log("Purchase completed");
    });
  };

  return (
    <>
      <section className="section-container">
        <h1 className="text-4xl font-bold">Cart</h1>

        {isPurchased ? (
          <div className="thank-you-message text-center">
            <h2 className="text-3xl font-semibold text-green-600">
              Thank you for your purchase!
            </h2>
            <p className="text-xl text-gray-600">
              We hope you enjoy your products.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 self-stretch items-stretch">
              {products &&
                products.map((product, index) => {
                  const productId = Object.keys(cart)[index];
                  const quantity = cart[productId];

                  return (
                    <div
                      key={product.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>
                      </div>

                      <div>
                        <button
                          className="p-1 bg-gray-200 hover:bg-gray-300"
                          onClick={() =>
                            handleQuantityChange(productId, quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span>{quantity}</span>
                        <button
                          className="p-1 bg-gray-200 hover:bg-gray-300"
                          onClick={() =>
                            handleQuantityChange(productId, quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="text-end w-full text-2xl font-bold">
              Total: ${Math.round(total * 100) / 100}
            </div>
            <button
              className="p-2 bg-blue-300 hover:bg-blue-400"
              onClick={handlePurchase}
            >
              Purchase
            </button>
          </>
        )}
      </section>
    </>
  );
}

export default Cart;
