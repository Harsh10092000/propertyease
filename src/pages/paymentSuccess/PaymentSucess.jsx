import React from "react";
import { IconChecks, IconHome } from '@tabler/icons-react';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const PaymentSucess = ({handleClose1}) => {
  return (
    <Box
    sx={{
      py: 5,
      px: 4,
      mx: "auto",
      maxWidth: 480, // Slightly narrower for a premium, focused look
      bgcolor: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)", // Subtle gradient
      borderRadius: 3,
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)", // Deeper shadow
      border: "1px solid rgba(30, 29, 133, 0.1)", // Subtle border with brand color
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Premium Accent Line */}
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 4,
        bgcolor: "#1e1d85",
        background: "linear-gradient(90deg, #1e1d85 0%, #00c4cc 100%)", // Gradient accent
      }}
    />

    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
          bgcolor: "#1e1d85",
          width: 70,
          height: 70,
          borderRadius: "50%",
          mx: "auto",
          boxShadow: "0 4px 12px rgba(30, 29, 133, 0.3)", // Shadow for depth
        }}
      >
        <IconChecks size={36} color="#fff" stroke={1.5} />
      </Box>

      <Typography
        variant="h4"
        sx={{
          color: "#1e1d85",
          fontWeight: "bold",
          mb: 2,
          fontFamily: "'Poppins', sans-serif", // Premium font
          letterSpacing: "0.5px",
        }}
      >
        Congratulations!
      </Typography>

      <Typography
        sx={{
          color: "#333",
          fontSize: "1.2rem",
          mb: 3,
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 300, // Lighter weight for elegance
          lineHeight: 1.5,
        }}
      >
        Thank you for your payment! You're now ready to showcase your properties to the world.
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Link to="/allproperties">
          <Button
            variant="outlined"
            startIcon={<IconHome />}
            sx={{
              textTransform: "none",
              color: "#1e1d85",
              borderColor: "#1e1d85",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#1e1d85",
                color: "#fff",
                borderColor: "#1e1d85",
                boxShadow: "0 4px 12px rgba(30, 29, 133, 0.2)",
              },
            }}
          >
            Explore Properties
          </Button>
        </Link>

        <Button
          variant="contained"
          onClick={handleClose1}
          sx={{
            textTransform: "none",
            bgcolor: "#00c4cc",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            px: 4,
            py: 1.5,
            borderRadius: "8px",
            //boxShadow: "0 4px 12px rgba(0, 196, 204, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "#00b3b8",
              boxShadow: "0 6px 16px rgba(0, 196, 204, 0.4)",
            },
          }}
        >
          Close
        </Button>
      </Box>
    </Box>
  </Box>
  );
};

export default PaymentSucess;