import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CartPage() {
  const { cart, removeFromCart, addToCart } = useContext(AppContext);

  const [suggestions, setSuggestions] = useState([]);

  // Fetch suggested products
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=9")
      .then((res) => res.json())
      .then((data) => setSuggestions(data.products));
  }, []);

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Box p={3} sx={{ background: "#f5f5f5", minHeight: "100vh" }}>
      {/* Page Title */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        🛒 Your Cart
      </Typography>

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <Typography>Your cart is empty 😢</Typography>
      ) : (
        <Grid container spacing={3}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            {cart.map((item) => (
              <Paper
                key={item.id}
                sx={{
                  p: 2,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: 3,
                }}
              >
                {/* Product Image */}
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                {/* Product Details */}
                <Box flex={1}>
                  <Typography fontWeight="bold">{item.title}</Typography>

                  <Typography color="text.secondary">{item.brand}</Typography>

                  <Typography mt={1} color="#ff3f6c" fontWeight="bold">
                    ₹{item.price}
                  </Typography>
                </Box>

                {/* Remove Button */}
                <IconButton
                  onClick={() => removeFromCart(item.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Paper>
            ))}
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Price Details
              </Typography>

              <Box mt={2}>
                <Typography>Items: {cart.length}</Typography>
                <Typography mt={1}>Total: ₹{total}</Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  background: "#ff3f6c",
                  fontWeight: "bold",
                  "&:hover": { background: "#e7335e" },
                }}
              >
                Place Order
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Suggested Products Section */}
      <Box mt={5}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          You May Also Like
        </Typography>

        <Grid container spacing={2}>
          {suggestions
            // optional: hide items already in cart
            .filter((p) => !cart.some((c) => c.id === p.id))
            .map((item) => (
              <Grid item xs={6} sm={4} md={3} key={item.id}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  {/* Image */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />

                  {/* Title */}
                  <Typography fontSize={14} mt={1}>
                    {item.title.slice(0, 20)}...
                  </Typography>

                  {/* Price */}
                  <Typography color="#ff3f6c" fontWeight="bold">
                    ₹{item.price}
                  </Typography>

                  {/* Add Button */}
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      mt: 1,
                      background: "#ff3f6c",
                      fontSize: "12px",
                      "&:hover": { background: "#e7335e" },
                    }}
                    onClick={() => addToCart(item)}
                  >
                    Add
                  </Button>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
