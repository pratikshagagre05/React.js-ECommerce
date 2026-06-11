import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import OrderSuccess from "../components/OrderSuccess";
import CheckoutForm from "../components/CheckoutForm";

export default function CartPage() {
  const { cart, removeFromCart, addToCart } = useContext(AppContext);

  const [suggestions, setSuggestions] = useState([]);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Fetch suggestions
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=8")
      .then((res) => res.json())
      .then((data) => setSuggestions(data.products));
  }, []);

  // Auto close success screen after 1 min
  useEffect(() => {
    let timer;
    if (orderPlaced) {
      timer = setTimeout(() => {
        setOrderPlaced(false);
      }, 6000);
    }
    return () => clearTimeout(timer);
  }, [orderPlaced]);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const formattedTotal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(total);

  return (
    <Box
      p={3}
      sx={{
        background: "#f5f5f5",
        minHeight: "100vh",

        // Animation
        "@keyframes scaleUp": {
          "0%": { transform: "scale(0.8)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={3}>
        🛒 Your Cart
      </Typography>

      {/* Cart Section */}
      {cart.length === 0 ? (
        <Typography>Your cart is empty 😢</Typography>
      ) : (
        <Grid container spacing={3}>
          {/* Items */}
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
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{ width: "80px", height: "80px", borderRadius: "8px" }}
                />

                <Box flex={1}>
                  <Typography fontWeight="bold">{item.title}</Typography>

                  <Typography color="text.secondary">{item.brand}</Typography>

                  <Typography mt={1} color="#ff3f6c" fontWeight="bold">
                    ₹{item.price}
                  </Typography>
                </Box>

                <IconButton
                  onClick={() => removeFromCart(item.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Paper>
            ))}
          </Grid>

          {/* Summary */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Price Details
              </Typography>

              <Box mt={2}>
                <Typography>Items: {cart.length}</Typography>
                <Typography mt={1}>Total: ₹{formattedTotal}</Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  background: "#ff3f6c",
                }}
                onClick={() => setOpenCheckout(true)}
              >
                Place Order
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Suggested Products */}
      <Box mt={5}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          You May Also Like
        </Typography>

        <Grid container spacing={2}>
          {suggestions
            .filter((p) => !cart.some((c) => c.id === p.id))
            .map((item) => (
              <Grid item xs={6} sm={4} md={3} key={item.id}>
                <Box
                  sx={{
                    p: 2,
                    background: "#fff",
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "8px",
                    }}
                  />

                  <Typography fontSize={14} mt={1}>
                    {item.title.slice(0, 20)}...
                  </Typography>

                  <Typography color="#ff3f6c">₹{item.price}</Typography>

                  <Button
                    size="small"
                    variant="contained"
                    sx={{ mt: 1, background: "#ff3f6c" }}
                    onClick={() => addToCart(item)}
                  >
                    Add
                  </Button>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* Checkout Form */}
      <CheckoutForm
        openCheckout={openCheckout}
        setOpenCheckout={setOpenCheckout}
        setOrderPlaced={setOrderPlaced}
      />

      {/* Order Success Screen */}
      {orderPlaced && (
        <OrderSuccess
          openCheckout={openCheckout}
          setOrderPlaced={setOrderPlaced}
        />
      )}
    </Box>
  );
}
