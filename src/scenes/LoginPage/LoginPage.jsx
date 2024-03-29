import { useTheme } from "@emotion/react";
import React, { useEffect } from "react";
import LoginForm from "../../components/LoginForm/AuthForm";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const LoginPage = () => {
  const theme = useTheme();
  const isWideScreen = useMediaQuery("(min-width: 1000px)");
  const isAuth = Boolean(useSelector((state) => state.token));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
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
        <LoginForm location={location} navigate={navigate} />
      </Box>
    </Box>
  );
};

export default LoginPage;
