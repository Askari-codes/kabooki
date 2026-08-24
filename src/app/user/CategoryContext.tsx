"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CategoryContextValue {
  category: string;
  setCategory: (category: string) => void;
}

const CategoryContext = createContext<CategoryContextValue | null>(null);

export const CategoryProvider = ({
  children,
  defaultCategory,
}: {
  children: ReactNode;
  defaultCategory: string;
}) => {
  const [category, setCategory] = useState(defaultCategory);
  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("useCategory must be used within a CategoryProvider");
  return ctx;
};
