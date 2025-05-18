import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

const HeroCard = ({ product, index }) => {
  const dispatch = useDispatch();
  const { title, images, description, _id } = product;

  const handleAddToCart = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));

      const isAlreadyInCart = cart.some((item) => item._id === product._id);
      if (isAlreadyInCart) {
        toast.error("There are products in the cart!");
        return;
      }

      toast.success("Add to Cart Success!");
    }

    cart.push({
      ...product,
      count: 1,
    });

    const unique = _.uniqWith(cart, _.isEqual);

    localStorage.setItem("cart", JSON.stringify(unique));
    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center py-6 sm:py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="w-full lg:w-1/3 sm:lg:w-1/3 flex items-center justify-center mb-6 lg:mb-0">
        <img
          src={images[0]?.url}
          alt="heroImage"
          className="h-94 sm:h-full sm:w-2/3 lg:h-96 w-2/3 lg:w-full sm:object-cover object-cover rounded-lg"
        />
      </div>

      <div className="w-full lg:w-1/2 space-y-4 py-4 px-4">
        <h1 className="text-gray-500 text-sm sm:text-base">
          # {index + 1}{" "}
          <span className="bg-pink-500 px-1 text-white text-xs sm:text-sm">New Product</span>
        </h1>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">{title}</h1>
        <p className="min-h-[4rem] sm:min-h-[5rem] text-gray-500 text-sm sm:text-base">{description}</p>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={handleAddToCart}
            id="button"
            className="w-full sm:w-auto relative cursor-pointer rounded bg-indigo-700 px-6 py-4 sm:px-6 sm:py-3 font-semibold text-white text-sm sm:text-base"
          >
            Add to Cart
          </button>
          <Link to={"/product-detail/" + _id}>
            <button className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 font-light hover:font-semibold text-sm sm:text-base">
              View Detail
              <FaLongArrowAltRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;