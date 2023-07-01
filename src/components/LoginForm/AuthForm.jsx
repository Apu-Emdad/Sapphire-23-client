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
import { Formik } from "formik";

const LoginForm = () => {
  const [pageType, setPageType] = useState("register");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isWideScreen = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  /* ++++ Register data initialization starts ++++ */
  const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
  };
  /* ---- Register data initialization ends ---- */

  /* ++++ Login data initialization starts ++++ */
  const initialValuesLogin = {
    email: "",
    password: "",
  };
  /* ---- Login data initialization ends ---- */

  /* ++++ Handling Register Starts ++++ */
  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:5001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };
  /* ---- Handling Register Ends ---- */

  /* ++++ Handling Login Starts ++++ */
  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:5001/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
  };
  /* ---- Handling Login ends ---- */

  /* ++++ Submitting the form Startss ++++  */
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  /* ---- Submitting the form Startss ----  */

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginScheama : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form action="" onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0,1fr))"
            sx={{
              "& > div": { gridColumn: isWideScreen ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                {/* ++++ First Name ++++ */}
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* ---- First Name ----  */}

                {/* ++++ Last Name ++++ */}
                <TextField
                  label="last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* ---- Last Name ----  */}

                {/* ++++ Location ++++ */}
                <TextField
                  label="location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* ---- Location ----  */}

                {/* ++++ occupation ++++ */}
                <TextField
                  label="occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* ---- occupation ----  */}

                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                ></Box>
              </>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
