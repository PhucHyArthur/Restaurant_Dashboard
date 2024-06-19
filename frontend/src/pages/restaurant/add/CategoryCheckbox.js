import React from "react";

const CategoryCheckbox = ({ category, register }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        {...register(`categories.${category._id}`)}
        id={`category-${category._id}`}
        className="mr-2"
      />
      <label htmlFor={`category-${category._id}`} className="text-sm">
        {category.name}
      </label>
    </div>
  );
};

export default CategoryCheckbox;
