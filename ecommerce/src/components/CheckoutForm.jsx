import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const CheckoutForm = ({ openCheckout, setOpenCheckout, setOrderPlaced }) => {
  // form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    altEmail: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // error state
  const [errors, setErrors] = useState({});

  // handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // validation
  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.pincode) newErrors.pincode = "Pincode is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // submit
  const handleSubmit = () => {
    if (validate()) {
      setOpenCheckout(false);
      setOrderPlaced(true);
    }
  };

  return (
    <Dialog
      open={openCheckout}
      onClose={() => setOpenCheckout(false)}
      fullWidth
    >
      <DialogTitle>Enter Delivery Details</DialogTitle>

      <DialogContent>
        <Box mt={1} display="flex" flexDirection="column" gap={2}>
          {/* Name */}
          <TextField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />

          {/* Email */}
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          {/* Alternate Email */}
          <TextField
            label="Alternate Email"
            name="altEmail"
            value={form.altEmail}
            onChange={handleChange}
          />

          {/* Phone */}
          <TextField
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />

          {/* Address */}
          <TextField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            multiline
            rows={3}
            error={!!errors.address}
            helperText={errors.address}
          />

          {/* City */}
          <TextField
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            error={!!errors.city}
            helperText={errors.city}
          />

          {/* Pincode */}
          <TextField
            label="Pincode"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            error={!!errors.pincode}
            helperText={errors.pincode}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpenCheckout(false)}>Cancel</Button>

        <Button
          variant="contained"
          sx={{ background: "#ff3f6c" }}
          onClick={handleSubmit}
        >
          Confirm Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutForm;
