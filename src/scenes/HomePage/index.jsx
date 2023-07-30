import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";

const HomePage = () => {
  const isWideScreen = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isWideScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/*==== UserWidget starts ==== */}
        <Box flexBasis={isWideScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        {/*==== UserWidget ends ==== */}

        {/*==== MyPostWidget + PostWidget starts ==== */}
        <Box flexBasis={isWideScreen ? "42%" : undefined}>
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {/*==== MyPostWidget + PostWidget ends ==== */}

        {/* ++++ Advertise and FriendList ++++ */}
        {isWideScreen && (
          <Box flexBasis={isWideScreen ? "26%" : undefined}>
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
        {/*---- Advertise and FriendList ----  */}
      </Box>
    </Box>
  );
};

export default HomePage;
