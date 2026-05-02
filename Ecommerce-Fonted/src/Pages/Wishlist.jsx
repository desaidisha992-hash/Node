import React, { useState, useEffect } from 'react';

import {
  Heart,
  ShoppingBag,
  Trash2,
  Loader2
} from 'lucide-react';

import { Link } from 'react-router-dom';

import {
  wishlistService,
  cartService
} from '../services/api';


const Wishlist = () => {

  // =========================
  // STATES
  // =========================

  const [wishlistItems, setWishlistItems] = useState([]);

  const [loading, setLoading] = useState(true);


  // =========================
  // FETCH WISHLIST
  // =========================

  const fetchWishlist = async () => {

    try {

      const response =
        await wishlistService.getWishlist();

      console.log(
        "Wishlist => ",
        response.data
      );

      setWishlistItems(

        response?.data?.wishlist ||

        response?.data?.items ||

        response?.data ||

        []

      );

    } catch (err) {

      console.error(
        "Failed to fetch wishlist",
        err
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================
  // USE EFFECT
  // =========================

  useEffect(() => {

    fetchWishlist();

  }, []);


  // =========================
  // REMOVE ITEM
  // =========================

  const handleRemove = async (id) => {

    try {

      await wishlistService.removeFromWishlist(id);

      setWishlistItems((prev) =>
        prev.filter((item) => item._id !== id)
      );

      alert("Removed From Wishlist");

    } catch (err) {

      console.error(
        "Failed to remove item",
        err
      );

    }
  };


  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = async (product) => {

    try {

      await cartService.addToCart({

        item: {
          productId: product._id,
          quantity: 1
        }

      });

      alert(`${product.name} added to cart!`);

    } catch (err) {

      console.error(
        "Failed to add to cart",
        err
      );

    }
  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="min-h-[60vh] flex flex-col items-center justify-center">

        <Loader2 className="w-12 h-12 animate-spin text-luxury-gold mb-4" />

        <p className="text-xs tracking-[0.3em] font-bold text-slate-400 uppercase">

          Retrieving your treasures

        </p>

      </div>
    );
  }


  // =========================
  // MAIN RETURN
  // =========================

  return (

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">

        <div>

          <h1 className="text-5xl font-serif text-luxury-navy mb-3 italic">

            My Wishlist

          </h1>

          <p className="text-xs tracking-[0.2em] font-bold text-luxury-gold uppercase">

            Curated Selection • {wishlistItems.length} Products

          </p>

        </div>

        <Link
          to="/products"
          className="btn-premium"
        >
          Continue Shopping
        </Link>

      </div>


      {/* WISHLIST PRODUCTS */}

      {wishlistItems.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

          {wishlistItems.map((item) => (

            <div
              key={item._id}
              className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500"
            >

              {/* IMAGE */}

              <div className="relative aspect-[4/5] overflow-hidden">

                <img
                  src={
                    item?.images?.[0] ||
                    'https://via.placeholder.com/500'
                  }
                  alt={item?.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* REMOVE BUTTON */}

                <button
                  onClick={() =>
                    handleRemove(item._id)
                  }
                  className="absolute top-5 right-5 p-3 bg-white rounded-full shadow-lg hover:text-red-500 transition-all"
                >

                  <Trash2 className="w-5 h-5" />

                </button>

              </div>


              {/* CONTENT */}

              <div className="p-6">

                <p className="text-xs uppercase text-gray-400 mb-2">

                  {item?.category}

                </p>

                <h2 className="text-2xl font-semibold mb-4 truncate">

                  {item?.name}

                </h2>

                <div className="flex justify-between items-center">

                  {/* PRICE */}

                  <h3 className="text-3xl font-bold">

                    ₹{item?.price}

                  </h3>

                  {/* ADD TO CART */}

                  <button
                    onClick={() =>
                      handleAddToCart(item)
                    }
                    className="bg-black text-white p-3 rounded-2xl hover:bg-gray-800 transition-all"
                  >

                    <ShoppingBag className="w-5 h-5" />

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      ) : (

        // EMPTY STATE

        <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">

          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">

            <Heart className="w-10 h-10 text-slate-300" />

          </div>

          <h2 className="text-3xl font-bold mb-4">

            Wishlist Is Empty

          </h2>

          <p className="text-gray-500 mb-10">

            Save your favorite products here.

          </p>

          <Link
            to="/products"
            className="bg-black text-white px-8 py-4 rounded-2xl"
          >

            Explore Products

          </Link>

        </div>

      )}

    </div>
  );
};

export default Wishlist;