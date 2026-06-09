import { Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function CategoryBar({ categories }) {
  const nav = useNavigate();
  const location = useLocation();

  const currentCategory = location.pathname.split("/")[2];

  return (
    <Box
      sx={{
        position: "sticky",
        top: 65, // below navbar
        zIndex: 1000,
        background: "#fff",
        borderBottom: "1px solid #eee",
        px: 2,
        py: 2,
        display: "flex",
        gap: 2,
        // overflowX: "auto",
        // scrollbarWidth: "none",
        flexWrap: "wrap",
        rowGap: 1,
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <Button
        variant={!currentCategory ? "contained" : "outlined"}
        onClick={() => nav("/")}
        sx={{
          borderRadius: "20px",
          px: 3,
          background: !currentCategory ? "#ff3f6c" : "white",
          color: !currentCategory ? "white" : "#333",
          borderColor: "#ff3f6c",
        }}
      >
        All
      </Button>

      {categories.map((cat) => {
        const isActive = currentCategory === cat;

        return (
          <Button
            key={cat}
            variant={isActive ? "contained" : "outlined"}
            onClick={() => nav(`/category/${cat}`)}
            sx={{
              textTransform: "capitalize",
              borderRadius: "20px",
              px: 3,
              whiteSpace: "nowrap",

              background: isActive ? "#ff3f6c" : "white",
              color: isActive ? "white" : "#333",

              borderColor: "#ff3f6c",

              "&:hover": {
                background: "#ff3f6c",
                color: "white",
              },
            }}
          >
            {cat}
          </Button>
        );
      })}
    </Box>
  );
}
