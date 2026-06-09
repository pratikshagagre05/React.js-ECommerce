import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { cart, likes } = useContext(AppContext);
  const nav = useNavigate();

  return (
    <AppBar position="sticky" sx={{ background: "#ff3f6c" }}>
      <Toolbar>
        <div
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#ff3f6c",
              cursor: "pointer",
              zIndex: 999,
              fontWeight: "bold",
            }}
            onClick={() => nav("/")}
          >
            E
          </Typography>
        </div>

        <Typography
          variant="h7"
          sx={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            lineHeight: 1,
            fontWeight: "bold",
            gap: "4px",
            ml: "4px",
          }}
          onClick={() => nav("/")}
        >
          {"Shop".split("").map((letter, index) => (
            <span key={index}>{letter.toUpperCase()}</span>
          ))}
        </Typography>
        <div style={{ marginLeft: "auto" }}>
          <IconButton onClick={() => nav("/wishlist")} color="inherit">
            <Badge badgeContent={likes.length} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={() => nav("/cart")} color="inherit">
            <Badge badgeContent={cart.length} color="warning">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
