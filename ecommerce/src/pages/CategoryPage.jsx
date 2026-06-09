import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Grid,
  Slider,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

export default function CategoryPage() {
  const { category } = useParams();
  const { products, loading } = useProducts();

  const [price, setPrice] = useState([0, 2000]);
  const [brand, setBrand] = useState("");

  // Filter products
  const filtered = products.filter(
    (p) =>
      p.category === category &&
      p.price >= price[0] &&
      p.price <= price[1] &&
      (brand ? p.brand === brand : true)
  );

  const brands = [...new Set(filtered.map((p) => p.brand))];

  if (loading) return <CircularProgress sx={{ m: 5 }} />;

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
      {/* LEFT FILTER */}
      <Box
        sx={{
          width: { xs: "100%", md: "250px" },
          borderRight: "1px solid #ddd",
          p: 2,
        }}
      >
        <Typography variant="h6">Filters</Typography>

        {/* Price */}
        <Typography mt={2}>Price</Typography>
        <Slider value={price} onChange={(e, val) => setPrice(val)} max={3000} />

        {/* Brand */}
        <Typography mt={2}>Brand</Typography>
        <Select
          fullWidth
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {brands.map((b) => (
            <MenuItem key={b} value={b}>
              {b}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* RIGHT PRODUCTS */}
      <Box sx={{ flex: 1, p: 2 }}>
        <Typography variant="h5">{category} Products</Typography>

        <Grid container spacing={2}>
          {filtered.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <ProductCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
