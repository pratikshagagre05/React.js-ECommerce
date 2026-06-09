import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { Grid } from "@mui/material";

export default function Wishlist() {
  const { likes } = useContext(AppContext);
  const likedItems = products.filter((p) => likes.includes(p.id));

  return (
    <Grid container spacing={2} p={2}>
      {likedItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <ProductCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}
