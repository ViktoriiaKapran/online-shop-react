import { Box } from "@mui/material";
import React from "react";


export default function Price({ children }) {
  return (
    <Box sx={{ fontSize: '22px', fontWeight: '400', color: 'rgb(58, 78, 88)' }}>
      {children} UAH
    </Box>
  )
}