import api from "./api";

export const categoryService = {
  getAllCategories: async () => {
    try {
      const response = await api.get("/categories/active");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  getParentCategories: async () => {
    try {
      const response = await api.get("/categories/parent");
      return response.data;
    } catch (error) {
      console.error("Error fetching parent categories:", error);
      throw error;
    }
  },
};
