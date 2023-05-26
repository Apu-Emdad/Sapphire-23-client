import { React, useState } from "react";

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../Redux/Slices/authSlice";
import Dropzone from "react-dropzone";
import { FlexBetween } from "../FlexBetween";

import { registerSchema } from "../Schema/Schema";
import { loginScheama } from "../Schema/Schema";

const LoginForm = () => {
  const [pageType, setPageType] = useState("login");
  const { pallete } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isWideScreen = useMediaQuery("(min-width:600px)");

  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  return <Box>THis is login form</Box>;
};

export default LoginForm;
