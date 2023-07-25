import { Box } from "@mui/material";
import { BASE_URL, publicRequest } from "../../requestMethod";

const UserImage = ({ image, size = "60px", alignSelf = "center" }) => {
  return (
    <Box width={size} height={size} alignSelf={alignSelf}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${BASE_URL}assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
