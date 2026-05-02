import React from 'react';

import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  ShoppingBag
} from 'lucide-react';

import { Link } from 'react-router-dom';

import { useCart } from '../context/CartContext';


const Cart = () => {

  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal
  } = useCart();


  // =========================
  // SHIPPING & TOTAL
  // =========================

  const shipping =
    cart.length > 0 ? 15 : 0;

  const total =
    cartTotal + shipping;


  // =========================
  // MAIN RETURN
  // =========================

  return (

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-luxury-gold-light min-h-[80vh]">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-12">

        <h1 className="text-4xl font-serif text-luxury-navy">

          Boutique Bag

        </h1>

        <span className="text-xs tracking-widest uppercase font-bold text-slate-400">

          {cart.length} ITEMS

        </span>

      </div>


      {/* CART EXISTS */}

      {cart.length > 0 ? (

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">

          {/* CART ITEMS */}

          <div className="lg:col-span-2 space-y-8">

            {cart.map((item) => (

              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 p-8 bg-white border border-luxury-gold/10 shadow-sm group"
              >

                {/* IMAGE */}

                <div className="h-32 w-32 shrink-0 overflow-hidden bg-slate-100 rounded-xl">

                  <img
                    src={
                      item?.image ||

                      item?.images?.[0] ||

                      'https://via.placeholder.com/300'
                    }
                    alt={item?.name}
                    className="h-full w-full object-cover"
                  />

                </div>


                {/* CONTENT */}

                <div className="grow text-center sm:text-left">

                  <h3 className="font-serif text-xl text-luxury-navy mb-2">

                    {item?.name}

                  </h3>

                  <p className="text-luxury-gold font-bold tracking-widest text-sm mb-4">

                    ₹{item?.price?.toLocaleString('en-IN')}

                  </p>


                  {/* QUANTITY */}

                  <div className="flex items-center justify-center sm:justify-start space-x-6">

                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">

                      {/* MINUS */}

                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            Math.max(
                              1,
                              item.quantity - 1
                            )
                          )
                        }
                        className="p-3 hover:bg-gray-100 transition-all"
                      >

                        <Minus className="w-4 h-4" />

                      </button>


                      {/* QUANTITY */}

                      <span className="px-5 font-bold text-luxury-navy">

                        {item.quantity}

                      </span>


                      {/* PLUS */}

                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.quantity + 1
                          )
                        }
                        className="p-3 hover:bg-gray-100 transition-all"
                      >

                        <Plus className="w-4 h-4" />

                      </button>

                    </div>


                    {/* REMOVE */}

                    <button
                      onClick={() =>
                        removeFromCart(item._id)
                      }
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >

                      <Trash2 className="w-5 h-5" />

                    </button>

                  </div>

                </div>


                {/* TOTAL */}

                <div className="text-right">

                  <p className="font-serif text-2xl text-luxury-navy">

                    ₹{(
                      item.price *
                      item.quantity
                    ).toLocaleString('en-IN')}

                  </p>

                </div>

              </div>

            ))}


            {/* CONTINUE SHOPPING */}

            <Link
              to="/products"
              className="inline-flex items-center text-luxury-navy font-bold tracking-widest uppercase text-xs border-b border-luxury-gold pb-2 hover:text-luxury-gold transition-all"
            >

              <ArrowLeft className="w-4 h-4 mr-2" />

              Continue Shopping

            </Link>

          </div>


          {/* SUMMARY */}

          <div className="lg:col-span-1">

            <div className="bg-luxury-navy text-white p-10 sticky top-32 shadow-2xl rounded-3xl">

              <h2 className="text-2xl font-serif mb-10 border-b border-white/10 pb-6 italic">

                Order Summary

              </h2>


              {/* SUMMARY DETAILS */}

              <div className="space-y-6 mb-10">

                <div className="flex justify-between text-slate-400">

                  <span>Subtotal</span>

                  <span className="text-white">

                    ₹{cartTotal.toLocaleString('en-IN')}

                  </span>

                </div>

                <div className="flex justify-between text-slate-400">

                  <span>Shipping</span>

                  <span className="text-white">

                    ₹{shipping}

                  </span>

                </div>

                <div className="border-t border-white/10 pt-6 flex justify-between text-2xl font-serif italic text-luxury-gold">

                  <span>Total</span>

                  <span>

                    ₹{total.toLocaleString('en-IN')}

                  </span>

                </div>

              </div>


              {/* CHECKOUT */}

              <Link
                to="/checkout"
                className="w-full bg-white text-black hover:bg-gray-200 transition-all flex items-center justify-center py-5 rounded-2xl font-semibold"
              >

                <CreditCard className="w-5 h-5 mr-3" />

                Proceed To Checkout

              </Link>

            </div>

          </div>

        </div>

      ) : (

        // =========================
        // EMPTY CART
        // =========================

        <div className="text-center py-32 bg-white border border-dashed border-luxury-gold/30 rounded-3xl">

          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-6" />

          <h2 className="text-3xl font-serif text-luxury-navy mb-4 italic">

            Your Cart Is Empty

          </h2>

          <p className="text-slate-400 mb-10">

            Explore premium products and add them to your bag.

          </p>

          <Link
            to="/products"
            className="bg-black text-white px-8 py-4 rounded-2xl"
          >

            Start Shopping

          </Link>

        </div>

      )}

    </div>
  );
};

export default Cart;