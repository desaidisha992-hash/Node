import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

import {
  cartService
} from '../services/api';


// =========================
// CREATE CONTEXT
// =========================

const CartContext =
  createContext();


// =========================
// USE CART
// =========================

export const useCart = () =>
  useContext(CartContext);


// =========================
// CART PROVIDER
// =========================

export const CartProvider = ({
  children
}) => {

  const [cart, setCart] =
    useState([]);

  const [loading, setLoading] =
    useState(false);


  // =========================
  // FETCH CART
  // =========================

  const fetchCart = async () => {

    const token =
      localStorage.getItem('token');

    if (!token) return;

    try {

      const response =
        await cartService.getCart();

      console.log(
        "Cart Response => ",
        response.data
      );

      // BACKEND DATA

      const rawItems =
        response?.data?.cart?.items || [];

      // MAP DATA

      const mappedItems =
        rawItems.map((item) => ({

          // IMPORTANT FIX

          _id:
            item.productId?._id,

          productId:
            item.productId?._id,

          name:
            item.productId?.name ||

            'Luxury Item',

          price:
            item.productId?.price || 0,

          image:
            item.productId?.images?.[0] ||

            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',

          quantity:
            item.quantity

        }));

      setCart(mappedItems);

    } catch (err) {

      console.error(
        "Failed to fetch cart",
        err
      );

      if (

        err.response?.status === 401 ||

        err.response?.status === 400

      ) {

        setCart([]);

      }
    }
  };


  // =========================
  // ADD TO CART
  // =========================

  const addToCart = async (
    productId,
    quantity = 1
  ) => {

    setLoading(true);

    try {

      console.log(
        "Add To Cart => ",
        productId
      );

      // BACKEND API

      await cartService.addToCart({

        item: {
          productId,
          quantity
        }

      });

      // REFRESH CART

      await fetchCart();

      alert(
        "Added To Cart"
      );

    } catch (err) {

      console.error(
        "Failed to add to cart",
        err
      );

      if (

        err.response?.status === 400 &&

        err.response?.data?.message?.includes(
          "Token"
        )

      ) {

        alert(
          "Please Login First"
        );

      } else {

        alert(

          err.response?.data?.message ||

          "Failed To Add Item"

        );
      }

    } finally {

      setLoading(false);

    }
  };


  // =========================
  // REMOVE FROM CART
  // =========================

  const removeFromCart = async (
    productId
  ) => {

    try {

      await cartService.removeFromCart(
        productId
      );

      await fetchCart();

    } catch (err) {

      console.error(
        "Failed to remove from cart",
        err
      );

    }
  };


  // =========================
  // UPDATE QUANTITY
  // =========================

  const updateQuantity = async (
    productId,
    quantity
  ) => {

    try {

      await cartService.updateQuantity(
        productId,
        quantity
      );

      await fetchCart();

    } catch (err) {

      console.error(
        "Failed to update quantity",
        err
      );

    }
  };


  // =========================
  // USE EFFECT
  // =========================

  useEffect(() => {

    fetchCart();

  }, []);


  // =========================
  // TOTAL COUNT
  // =========================

  const cartCount =
    cart.reduce(

      (total, item) =>

        total + item.quantity,

      0
    );


  // =========================
  // TOTAL PRICE
  // =========================

  const cartTotal =
    cart.reduce(

      (total, item) =>

        total +
        item.price *
          item.quantity,

      0
    );


  // =========================
  // PROVIDER
  // =========================

  return (

    <CartContext.Provider
      value={{

        cart,

        loading,

        addToCart,

        removeFromCart,

        updateQuantity,

        cartCount,

        cartTotal,

        fetchCart

      }}
    >

      {children}

    </CartContext.Provider>
  );
};