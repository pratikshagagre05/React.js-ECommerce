import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = ({ setOrderPlaced }) => {
  const nav = useNavigate();

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <Box
        sx={{
          background: "#fff",
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          animation: "scaleUp 0.5s ease",
        }}
      >
        <Typography variant="h4" color="#ff3f6c">
          ✅ Order Placed!
        </Typography>

        <Typography mt={2}>Your order will be delivered soon 🚚</Typography>

        <Typography mt={2} color="gray">
          Processing your order...
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 3, background: "#ff3f6c" }}
          onClick={() => {
            setOrderPlaced(false);
            nav("/");
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
};

export default OrderSuccess;
