import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

import {
  productService,
  wishlistService,
  categoryService,
} from '../services/api';

import {
  Search,
  ShoppingBag,
  Heart,
  Star,
  Layers,
  SlidersHorizontal,
  X,
} from 'lucide-react';

const ProductListing = () => {
  const { addToCart } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || 'All';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || ''
  );

  // =========================
  // SEARCH PARAM UPDATE
  // =========================
  useEffect(() => {
    const query = searchParams.get('search');

    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {

        // =========================
        // GET PRODUCTS
        // =========================
        const prodRes = await productService.getProducts();

        console.log('Products => ', prodRes.data);

        setProducts(
          prodRes?.data?.products ||
          prodRes?.data?.data ||
          prodRes?.data ||
          []
        );

        // =========================
        // GET CATEGORIES
        // =========================
        try {
          const catRes = await categoryService.getCategories();

          console.log('Categories => ', catRes.data);

          setCategories(
            catRes?.data?.categories ||
            catRes?.data ||
            []
          );
        } catch (err) {
          console.log('Category API not found', err);
        }

      } catch (error) {
        console.log('Fetch Error => ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // =========================
  // FILTER PRODUCTS
  // =========================
  const filteredProducts = products.filter((product) => {

    const categoryName =
      typeof product.category === 'object'
        ? product.category?.name
        : product.category;

    const matchesCategory =
      activeCategory === 'All' ||
      categoryName === activeCategory;

    const matchesSearch =
      product.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.brand
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // =========================
  // CATEGORY CHANGE
  // =========================
  const handleCategoryChange = (category) => {
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }

    setSearchParams(searchParams);
  };

  // =========================
  // WISHLIST
  // =========================
  const handleAddToWishlist = async (productId) => {
    try {
      await wishlistService.addToWishlist(productId);

      alert('Added To Wishlist');
    } catch (error) {
      console.log(error);

      alert('Please Login First');
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-12">

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Product Collection
            </h1>

            <p className="text-gray-500 mt-2">
              Explore Premium Products
            </p>
          </div>

          {/* SEARCH + FILTER */}
          <div className="flex items-center gap-3 w-full lg:w-auto">

            {/* SEARCH */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search Product..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full lg:w-72 border border-gray-300 rounded-lg py-3 pl-10 pr-4 outline-none focus:border-black"
              />

              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            </div>

            {/* FILTER BUTTON */}
            <button
              onClick={() =>
                setShowFilters(!showFilters)
              }
              className="border border-gray-300 rounded-lg p-3 hover:bg-black hover:text-white duration-300"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================= */}
        {/* MAIN */}
        {/* ========================= */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* ========================= */}
          {/* SIDEBAR */}
          {/* ========================= */}

          <div
            className={`bg-white p-5 rounded-xl shadow-md h-fit lg:block ${
              showFilters ? 'block' : 'hidden'
            }`}
          >

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-semibold">
                Categories
              </h2>

              <button
                className="lg:hidden"
                onClick={() =>
                  setShowFilters(false)
                }
              >
                <X />
              </button>
            </div>

            <div className="space-y-3">

              {/* ALL CATEGORY */}

              <button
                onClick={() =>
                  handleCategoryChange('All')
                }
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  activeCategory === 'All'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                All Products
              </button>

              {/* CATEGORY LIST */}

              {categories?.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() =>
                    handleCategoryChange(cat.name)
                  }
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeCategory === cat.name
                      ? 'bg-black text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* ========================= */}
          {/* PRODUCT GRID */}
          {/* ========================= */}

          <div className="lg:col-span-3">

            {filteredProducts.length > 0 ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

                {filteredProducts.map((product) => (

                  <div
                    key={product._id}
                    className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-2xl duration-300 group"
                  >

                    {/* IMAGE */}

                    <div className="relative overflow-hidden">

                      <Link
                        to={`/product/${product._id}`}
                      >
                        <img
                          src={
                            product.images?.[0] ||
                            'https://via.placeholder.com/500'
                          }
                          alt={product.name}
                          className="w-full h-72 object-cover group-hover:scale-105 duration-500"
                        />
                      </Link>

                      {/* WISHLIST */}

                      <button
                        onClick={() =>
                          handleAddToWishlist(
                            product._id
                          )
                        }
                        className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:text-red-500"
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>

                    {/* CONTENT */}

                    <div className="p-5">

                      <p className="text-sm text-gray-500 mb-2">
                        {typeof product.category ===
                        'object'
                          ? product.category?.name
                          : product.category}
                      </p>

                      <Link
                        to={`/product/${product._id}`}
                      >
                        <h2 className="text-xl font-semibold text-gray-800 hover:text-black">
                          {product.name}
                        </h2>
                      </Link>

                      {/* RATING */}

                      <div className="flex items-center gap-1 mt-2 text-yellow-500">

                        <Star className="w-4 h-4 fill-yellow-500" />

                        <span className="text-sm text-gray-500">
                          4.9
                        </span>
                      </div>

                      {/* PRICE + BUTTON */}

                      <div className="flex justify-between items-center mt-5">

                        <h3 className="text-2xl font-bold text-black">
                          ₹{product.price}
                        </h3>

                        <button
                          onClick={() =>
                            addToCart(
                              product._id,
                              1
                            )
                          }
                          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (

              <div className="bg-white rounded-2xl p-20 text-center shadow">

                <Layers className="mx-auto w-14 h-14 text-gray-300 mb-5" />

                <h2 className="text-2xl font-bold text-gray-700">
                  No Products Found
                </h2>

                <p className="text-gray-500 mt-2">
                  Try changing category or search.
                </p>

                <button
                  onClick={() =>
                    handleCategoryChange('All')
                  }
                  className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;