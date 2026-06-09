import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  IconButton,
  Box,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ item }) {
  const nav = useNavigate();
  const { addToCart, toggleLike, likes } = useContext(AppContext);

  const isLiked = likes.includes(item.id);

  return (
    <Card
      sx={{
        cursor: "pointer",
        borderRadius: 3,
        boxShadow: 3,
        position: "relative",
        "&:hover": { transform: "scale(1.03)" },
      }}
      onClick={() => nav(`/product/${item.id}`)} // navigate on card click
    >
      {/* Image Wrapper */}
      <Box sx={{ position: "relative" }}>
        <CardMedia component="img" height="200" image={item.thumbnail} />

        {/* Like Button */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(item.id);
          }}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "white",
          }}
        >
          <FavoriteIcon color={isLiked ? "error" : "disabled"} />
        </IconButton>
      </Box>

      {/* Content */}
      <CardContent>
        <Typography fontWeight="bold">{item.title}</Typography>

        <Typography color="text.secondary">₹{item.price}</Typography>

        {/* Add to Cart Button */}
        <Button
          fullWidth
          startIcon={<ShoppingCartIcon />}
          variant="contained"
          sx={{
            mt: 2,
            background: "#ff3f6c",
            "&:hover": {
              background: "#d63357",
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(item);
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
