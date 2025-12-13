import api from "./api";

export const productService = {
  getAllProducts: async () => {
    try {
      const response = await api.get("/products/active");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  getProductsByCategory: async (categoryId) => {
    try {
      const response = await api.get(`/products/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  },

  searchProducts: async (keyword) => {
    try {
      const response = await api.get(`/products/search?keyword=${keyword}`);
      return response.data;
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  },

  getProductBySlug: async (slug) => {
    try {
      const response = await api.get(`/products/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by slug:", error);
      throw error;
    }
  },
};
