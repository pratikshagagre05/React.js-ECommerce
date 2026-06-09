import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Rating,
  Chip,
  IconButton,
} from "@mui/material";
import { AppContext } from "../context/AppContext";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { addToCart, toggleLike, likes } = useContext(AppContext);

  // Fetch product
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.thumbnail); // set default image
      });
  }, [id]);

  // Like logic
  const isLiked = product ? likes.includes(product.id) : false;

  if (!product || !selectedImage) return <h3>Loading...</h3>;

  return (
    <Box p={3} sx={{ background: "#f5f5f5" }}>
      <Grid container spacing={4}>
        {/* LEFT IMAGE SECTION */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: "relative" }}>
            {/* Main Image */}
            <img
              src={selectedImage}
              alt="product"
              style={{
                width: "70%",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />

            {/* Like button */}
            <IconButton
              onClick={() => toggleLike(product.id)}
              sx={{
                position: "absolute",
                bottom: 10,
                right: 10,
                background: "white",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              <FavoriteIcon color={isLiked ? "error" : "disabled"} />
            </IconButton>
          </Box>

          {/* Thumbnail Images */}
          <Box display="flex" gap={2} mt={2} flexWrap="wrap">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                onClick={() => setSelectedImage(img)} // click switch
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "0.3s",

                  // highlight selected image
                  border:
                    selectedImage === img
                      ? "2px solid #ff3f6c"
                      : "1px solid #ccc",
                }}
              />
            ))}
          </Box>
        </Grid>

        {/* RIGHT DETAILS */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold">
            {product.title}
          </Typography>

          <Typography color="text.secondary">{product.brand}</Typography>

          <Rating value={product.rating} precision={0.5} readOnly />

          <Typography variant="h6" mt={2} color="#ff3f6c">
            ₹{product.price}
          </Typography>

          <Typography color="green">
            {product.discountPercentage}% OFF
          </Typography>

          <Typography mt={2}>{product.description}</Typography>

          {/* Tags */}
          <Box mt={2}>
            {product.tags?.map((tag, i) => (
              <Chip key={i} label={tag} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>

          {/* Buttons */}
          <Box mt={3} display="flex" gap={2}>
            <Button
              variant="contained"
              sx={{ flex: 1, background: "#ff3f6c" }}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>

            <Button variant="outlined" sx={{ flex: 1 }}>
              Buy Now
            </Button>
          </Box>

          {/* Extra info */}
          <Box mt={3}>
            <Typography>Stock: {product.stock}</Typography>
            <Typography>{product.shippingInformation}</Typography>
            <Typography>{product.warrantyInformation}</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* REVIEWS */}
      <Box mt={5}>
        <Typography variant="h6" fontWeight="bold">
          Reviews
        </Typography>

        {product.reviews?.map((rev, i) => (
          <Box
            key={i}
            mt={2}
            p={2}
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              background: "#fafafa",
            }}
          >
            <Rating value={rev.rating} readOnly />
            <Typography mt={1}>{rev.comment}</Typography>
            <Typography variant="caption" color="text.secondary">
              - {rev.reviewerName}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
