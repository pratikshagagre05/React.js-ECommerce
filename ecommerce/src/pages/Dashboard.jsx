import { Box, Button, Grid, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";
import CategoryBar from "../components/CategoryBar";

export default function Dashboard() {
  const nav = useNavigate();
  const { products, loading } = useProducts();

  // Extract categories dynamically
  const categories = [...new Set(products.map((p) => p.category))];

  if (loading) return <CircularProgress sx={{ m: 5 }} />;

  return (
    <Box p={4}>
      {/* Products */}
      <Grid container spacing={2}>
        {products.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <ProductCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
