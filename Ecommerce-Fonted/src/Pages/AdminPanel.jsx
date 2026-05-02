import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import {
  Search,
  Loader2,
} from 'lucide-react';

import {
  productService,
  orderService,
  userService,
  categoryService,
} from '../services/api';

const AdminPanel = () => {

  // =========================
  // STATES
  // =========================

  const [activeTab, setActiveTab] = useState('dashboard');

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [notification, setNotification] = useState(null);

  const [showModal, setShowModal] = useState(false);

  // =========================
  // NOTIFICATION
  // =========================

  const showNotify = (
    message,
    type = 'success'
  ) => {

    setNotification({
      message,
      type,
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // =========================
  // FETCH DATA
  // =========================

  const fetchData = useCallback(async () => {

    try {

      setLoading(true);

      // PRODUCTS

      try {

        const prodRes =
          await productService.getProducts();

        console.log(
          'Products => ',
          prodRes.data
        );

        setProducts(
          prodRes?.data?.products ||
          prodRes?.data?.data ||
          prodRes?.data ||
          []
        );

      } catch (error) {

        console.log(
          'Product Error => ',
          error
        );

      }

      // ORDERS

      try {

        const orderRes =
          await orderService.getAllOrders();

        setOrders(
          orderRes?.data?.orders ||
          orderRes?.data ||
          []
        );

      } catch (error) {

        console.log(
          'Order Error => ',
          error
        );

      }

      // USERS

      try {

        const userRes =
          await userService.getAllUsers();

        setUsers(
          userRes?.data?.users ||
          userRes?.data ||
          []
        );

      } catch (error) {

        console.log(
          'User Error => ',
          error
        );

      }

      // CATEGORIES

      try {

        const catRes =
          await categoryService.getCategories();

        setCategories(
          catRes?.data?.categories ||
          catRes?.data ||
          []
        );

      } catch (error) {

        console.log(
          'Category Error => ',
          error
        );

      }

    } catch (error) {

      console.log(error);

      showNotify(
        'Failed To Fetch Data',
        'error'
      );

    } finally {

      setLoading(false);

    }

  }, []);

  // =========================
  // USE EFFECT
  // =========================

  useEffect(() => {

    fetchData();

  }, [fetchData]);

  // =========================
  // ADD PRODUCT
  // =========================

  const handleAddProduct = async (e) => {

    e.preventDefault();

    try {

      const productData = {

        name: e.target.name.value,

        description:
          e.target.description.value,

        category:
          e.target.category.value,

        brand:
          e.target.brand.value,

        price:
          e.target.price.value,

        stock:
          e.target.stock.value,

        images: [
          e.target.image.value,
        ],

      };

      console.log(productData);

      await productService.createProduct(
        productData
      );

      showNotify(
        'Product Added Successfully'
      );

      setShowModal(false);

      fetchData();

    } catch (error) {

      console.log(error);

      showNotify(
        'Failed To Add Product',
        'error'
      );

    }
  };

  // =========================
  // FILTER DATA
  // =========================

  const filteredData = useMemo(() => {

    const term =
      searchTerm.toLowerCase();

    if (activeTab === 'products') {

      return products.filter((p) =>
        p?.name
          ?.toLowerCase()
          ?.includes(term)
      );
    }

    if (activeTab === 'orders') {

      return orders.filter((o) =>
        o?._id
          ?.toLowerCase()
          ?.includes(term)
      );
    }

    if (activeTab === 'users') {

      return users.filter((u) =>
        u?.username
          ?.toLowerCase()
          ?.includes(term)
      );
    }

    if (activeTab === 'categories') {

      return categories.filter((c) =>
        c?.name
          ?.toLowerCase()
          ?.includes(term)
      );
    }

    return [];

  }, [
    searchTerm,
    activeTab,
    products,
    orders,
    users,
    categories,
  ]);

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <Loader2 className="w-12 h-12 animate-spin" />

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}

      <div className="bg-white shadow-sm p-5 flex flex-col md:flex-row justify-between items-center gap-5">

        <h1 className="text-3xl font-bold">
          Admin Panel
        </h1>

        <div className="relative w-full md:w-72">

          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>

      </div>

      {/* TABS */}

      <div className="flex gap-4 p-5 flex-wrap">

        {[
          'dashboard',
          'products',
          'orders',
          'users',
          'categories',
        ].map((tab) => (

          <button
            key={tab}
            onClick={() =>
              setActiveTab(tab)
            }
            className={`px-5 py-2 rounded-lg capitalize transition-all
            ${
              activeTab === tab
                ? 'bg-black text-white'
                : 'bg-white border'
            }`}
          >
            {tab}
          </button>

        ))}

      </div>

      {/* ADD PRODUCT BUTTON */}

      <div className="px-5 mb-5">

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          Add Product
        </button>

      </div>

      {/* MAIN */}

      <div className="p-5">

        {/* DASHBOARD */}

        {activeTab === 'dashboard' && (

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

            <div className="bg-white p-6 rounded-xl shadow">

              <p className="text-gray-500">
                Products
              </p>

              <h2 className="text-3xl font-bold">
                {products.length}
              </h2>

            </div>

            <div className="bg-white p-6 rounded-xl shadow">

              <p className="text-gray-500">
                Orders
              </p>

              <h2 className="text-3xl font-bold">
                {orders.length}
              </h2>

            </div>

            <div className="bg-white p-6 rounded-xl shadow">

              <p className="text-gray-500">
                Users
              </p>

              <h2 className="text-3xl font-bold">
                {users.length}
              </h2>

            </div>

            <div className="bg-white p-6 rounded-xl shadow">

              <p className="text-gray-500">
                Categories
              </p>

              <h2 className="text-3xl font-bold">
                {categories.length}
              </h2>

            </div>

          </div>

        )}

        {/* PRODUCTS */}

        {activeTab === 'products' && (

          <div className="bg-white rounded-xl shadow overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-4 text-left">
                    Image
                  </th>

                  <th className="p-4 text-left">
                    Name
                  </th>

                  <th className="p-4 text-left">
                    Category
                  </th>

                  <th className="p-4 text-left">
                    Brand
                  </th>

                  <th className="p-4 text-left">
                    Price
                  </th>

                  <th className="p-4 text-left">
                    Stock
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredData.length > 0 ? (

                  filteredData.map((p) => (

                    <tr
                      key={p._id}
                      className="border-b"
                    >

                      <td className="p-4">

                        <img
                          src={
                            p?.images?.[0] ||
                            'https://via.placeholder.com/100'
                          }
                          alt=""
                          className="w-14 h-14 rounded-lg object-cover"
                        />

                      </td>

                      <td className="p-4">
                        {p?.name}
                      </td>

                      <td className="p-4">
                        {p?.category}
                      </td>

                      <td className="p-4">
                        {p?.brand}
                      </td>

                      <td className="p-4">
                        ₹{p?.price}
                      </td>

                      <td className="p-4">
                        {p?.stock}
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center p-10 text-gray-500"
                    >
                      No Products Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* ADD PRODUCT MODAL */}

      {
        showModal && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">

              <h2 className="text-2xl font-bold mb-5">
                Add Product
              </h2>

              <form
                onSubmit={handleAddProduct}
                className="space-y-4"
              >

                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  className="w-full border p-3 rounded-lg outline-none"
                  required
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  className="w-full border p-3 rounded-lg outline-none"
                  rows="4"
                  required
                />

                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  className="w-full border p-3 rounded-lg outline-none"
                  required
                />

                <input
                  type="text"
                  name="brand"
                  placeholder="Brand"
                  className="w-full border p-3 rounded-lg outline-none"
                  required
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  className="w-full border p-3 rounded-lg outline-none"
                  required
                />

                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  className="w-full border p-3 rounded-lg outline-none"
                  required
                />

                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  className="w-full border p-3 rounded-lg outline-none"
                  required
                />

                <div className="flex gap-3">

                  <button
                    type="submit"
                    className="bg-black text-white w-full py-3 rounded-lg"
                  >
                    Add Product
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setShowModal(false)
                    }
                    className="border w-full py-3 rounded-lg"
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          </div>
        )
      }

      {/* NOTIFICATION */}

      {
        notification && (

          <div
            className={`fixed bottom-5 right-5 px-5 py-3 rounded-lg shadow-lg text-white
            ${
              notification.type === 'error'
                ? 'bg-red-500'
                : 'bg-green-500'
            }`}
          >

            {notification.message}

          </div>
        )
      }

    </div>
  );
};

export default AdminPanel;