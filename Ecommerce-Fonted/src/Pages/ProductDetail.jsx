import React, { useState, useEffect } from 'react';

import {
  useParams,
  Link
} from 'react-router-dom';

import {
  ShoppingBag,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  Minus,
  Plus
} from 'lucide-react';

import {
  productService,
  wishlistService
} from '../services/api';

import { useCart } from '../context/CartContext';


const ProductDetail = () => {

  const { addToCart } = useCart();

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const [activeImage, setActiveImage] = useState(0);


  // =========================
  // FETCH PRODUCT
  // =========================

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const response =
          await productService.getProductById(id);

        console.log(
          "Product => ",
          response.data
        );

        setProduct(
          response?.data?.product
        );

      } catch (err) {

        console.error(
          "Failed to fetch product",
          err
        );

      } finally {

        setLoading(false);

      }
    };

    fetchProduct();

  }, [id]);


  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = async () => {

    try {

      await addToCart(id, quantity);

      alert(
        'Product added to cart'
      );

    } catch (err) {

      console.error(err);

    }
  };


  // =========================
  // ADD TO WISHLIST
  // =========================

  const handleAddToWishlist = async () => {

    try {

      console.log(
        "Wishlist Product ID => ",
        id
      );

      const response =
        await wishlistService.addToWishlist({
          productId: id
        });

      console.log(
        "Wishlist Response => ",
        response.data
      );

      if (response?.data?.success) {

        alert("Added To Wishlist");

      } else {

        alert("Wishlist Failed");

      }

    } catch (err) {

      console.error(
        "Wishlist Error => ",
        err
      );

      alert(
        "Failed To Add Wishlist"
      );

    }
  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold">
          Loading...
        </h1>

      </div>
    );
  }


  // =========================
  // PRODUCT NOT FOUND
  // =========================

  if (!product) {

    return (

      <div className="h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>

      </div>
    );
  }


  // =========================
  // MAIN RETURN
  // =========================

  return (

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gray-50 min-h-screen">

      {/* BREADCRUMB */}

      <div className="flex items-center gap-2 text-sm text-gray-400 mb-10">

        <Link to="/">
          Home
        </Link>

        <ChevronRight className="w-4 h-4" />

        <Link to="/products">
          Products
        </Link>

        <ChevronRight className="w-4 h-4" />

        <span className="text-black">
          {product?.name}
        </span>

      </div>


      {/* MAIN GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* IMAGE SECTION */}

        <div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-xl">

            <img
              src={
                product?.images?.[activeImage] ||
                'https://via.placeholder.com/600'
              }
              alt={product?.name}
              className="w-full h-[700px] object-cover"
            />

          </div>

          {/* THUMBNAILS */}

          <div className="grid grid-cols-4 gap-4 mt-5">

            {product?.images?.map((img, idx) => (

              <button
                key={idx}
                onClick={() =>
                  setActiveImage(idx)
                }
                className={`rounded-xl overflow-hidden border-2
                ${
                  activeImage === idx
                    ? 'border-black'
                    : 'border-transparent'
                }`}
              >

                <img
                  src={img}
                  alt=""
                  className="w-full h-28 object-cover"
                />

              </button>

            ))}

          </div>

        </div>


        {/* PRODUCT INFO */}

        <div className="flex flex-col">

          {/* CATEGORY */}

          <p className="uppercase text-sm text-gray-400 mb-4">

            {product?.category}

          </p>

          {/* NAME */}

          <h1 className="text-6xl font-bold mb-8">

            {product?.name}

          </h1>

          {/* RATING */}

          <div className="flex items-center gap-2 text-yellow-500 mb-6">

            {[...Array(5)].map((_, i) => (

              <Star
                key={i}
                className="w-5 h-5 fill-yellow-500"
              />

            ))}

            <span className="text-gray-500 text-sm">
              Premium Product
            </span>

          </div>

          {/* PRICE */}

          <h2 className="text-5xl font-bold mb-10">

            ₹{product?.price}

          </h2>

          {/* DESCRIPTION */}

          <p className="text-gray-600 leading-relaxed text-lg mb-14">

            {product?.description}

          </p>

          {/* QUANTITY */}

          <div className="flex items-center gap-5 mb-10">

            <div className="flex items-center border rounded-xl overflow-hidden bg-white">

              <button
                onClick={() =>
                  setQuantity((q) =>
                    Math.max(1, q - 1)
                  )
                }
                className="p-4"
              >

                <Minus className="w-5 h-5" />

              </button>

              <span className="px-8 font-bold">

                {quantity}

              </span>

              <button
                onClick={() =>
                  setQuantity((q) => q + 1)
                }
                className="p-4"
              >

                <Plus className="w-5 h-5" />

              </button>

            </div>

            {/* ADD TO CART */}

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-800 transition-all"
            >

              <ShoppingBag className="w-5 h-5" />

              Add To Cart

            </button>

            {/* WISHLIST */}

            <button
              onClick={handleAddToWishlist}
              className="p-5 bg-white rounded-2xl shadow hover:text-red-500 transition-all"
            >

              <Heart className="w-5 h-5" />

            </button>

          </div>


          {/* FEATURES */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-10">

            <div className="flex items-center gap-3">

              <Truck className="w-6 h-6" />

              <span>Free Delivery</span>

            </div>

            <div className="flex items-center gap-3">

              <ShieldCheck className="w-6 h-6" />

              <span>Secure Payment</span>

            </div>

            <div className="flex items-center gap-3">

              <RotateCcw className="w-6 h-6" />

              <span>Easy Returns</span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetail;