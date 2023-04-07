import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import './CategoriesSection.scss';

export function CategoriesSection({ categories, categoryLabel }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {categoryLabel}
      {categories?.map(category => <Link key={category._id} to={`/${category.name}/${category._id}`} className="link-style">
        {category.name}</Link>)}
    </Box>
  )
}