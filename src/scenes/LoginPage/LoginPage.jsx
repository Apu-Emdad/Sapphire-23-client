import { useTheme } from "@emotion/react";
import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import Navbar from "../../components/Navbar/Navbar";
import { Box, Typography, useMediaQuery } from "@mui/material";
const LoginPage = () => {
  const theme = useTheme();
  const isWideScreen = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sapphire23
        </Typography>
      </Box>
      <Box
        width={isWideScreen ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Sapphire23, the Social Media for Sociopaths!
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default LoginPage;
