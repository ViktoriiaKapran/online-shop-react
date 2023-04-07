import { Typography } from "@mui/material";
import React from "react";


export default function Title({ children }) {
  return (
    <Typography variant="h4" component="h1" sx={{ textAlign: 'center', fontWeight: '300', my: '20px', mx: '0' }}>
      {children}
    </Typography>
  )

}