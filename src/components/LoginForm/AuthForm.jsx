import { React, useState } from "react";

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  styled,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Redux/Slices/authSlice";
import Dropzone from "react-dropzone";
import { FlexBetween } from "../StyledComponent/FlexBetween";

import { registerSchema } from "../Schema/Schema";
import { loginScheama } from "../Schema/Schema";
import { Formik } from "formik";
import { publicRequest } from "../../requestMethod";

const LoginForm = ({ location, navigate }) => {
  const [pageType, setPageType] = useState("register");
  const [pictureError, setPictureError] = useState("");
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const isWideScreen = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  /* ++++ <SubmitButton> starts++++ */
  const SubmitButton = styled(Button)(({ theme }) => ({
    margin: "2rem 0",
    padding: "1rem",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.alt,

    "&:hover": {
      color: theme.palette.primary.main,
    },
  }));
  /* ---- <SubmitButton> startsEnds ---- */

  /* ++++ <<AccountQuery> starts> starts++++ */
  const AccountQuery = styled(Button)(({ theme }) => ({
    textDecoration: "underline",
    color: theme.palette.primary.main,

    "&:hover": {
      cursor: "pointer",
      color: theme.palette.primary.light,
    },
  }));
  /* ---- <<AccountQuery> starts> startsEnds ---- */

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
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }

      const savedUserResponse = await publicRequest.post(
        "/auth/register",
        formData
      );
      const savedUser = await savedUserResponse.data;
      onSubmitProps.resetForm();
      if (savedUser) {
        setPageType("login");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  /* ---- Handling Register Ends ---- */

  /* ++++ Handling Login Starts ++++ */
  const redirect_uri = location.state?.from.pathname || "/home";
  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await publicRequest.post("/auth/login", values);
      const loggedIn = await loggedInResponse.data;

      onSubmitProps.resetForm();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );

        navigate(redirect_uri);
        window.location.reload();
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  /* ---- Handling Login ends ---- */

  /* ++++ Submitting the form Starts ++++  */
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  /* ---- Submitting the form ends ----  */

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
        setFieldValue,
        resetForm,
        handleSubmit,
      }) => {
        return (
          <form
            action=""
            onSubmit={(event) => {
              event.preventDefault();
              if (!values.picture) {
                setPictureError("Please Upload a picture");
              }
              handleSubmit();
            }}
          >
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
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
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
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
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

                  {/* ++++ picture ++++ */}
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg, .jpeg, .png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} name="picture" />
                          {!values.picture ? (
                            <p>Add Picture here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>
                                {values.picture.name} <EditOutlined />
                              </Typography>
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                    {/* ++++ Picture Error Message ++++ */}
                    {pictureError && (
                      <Typography color="error" textAlign="left">
                        {pictureError}
                      </Typography>
                    )}
                    {/* ---- Picture Error Message ---- */}
                  </Box>
                  {/* ---- picture ----  */}
                </>
              )}
              {/* ++++ email ++++ */}
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              {/* ---- email ----  */}

              {/* ++++ password ++++ */}
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              {/* ---- password ----  */}
            </Box>

            {/* ++++ Submit Buttons ++++ */}
            <Box>
              <SubmitButton type="submit" fullWidth>
                {isLogin ? "LOGIN" : "REGISTER"}
              </SubmitButton>
              <AccountQuery
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </AccountQuery>
            </Box>
            {/* ---- Submit Buttons ----  */}
          </form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
