import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";
import { userRequest } from "../../requestMethod";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const isWideScreen = useMediaQuery("(min-width: 1000px)");

  const loggedInUser = useSelector((state) => state.user);
  const isUser = loggedInUser._id === userId;
  console.log("isUser:", isUser);

  const getUser = async () => {
    const res = await userRequest.get(`/users/${userId}`);
    setUser(res.data);
  };

  useEffect(() => {
    isUser ? setUser(loggedInUser) : getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isWideScreen ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        {/* ++++ UserWidget + FriendListWidget starts ++++ */}
        <Box flexBasis={isWideScreen ? "26%" : undefined}>
          <UserWidget
            userId={userId}
            picturePath={user.picturePath}
            userProfile={user}
          />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        {/* ---- UserWidget + FriendListWidget ends ---- */}

        <Box
          flexBasis={isWideScreen ? "42%" : undefined}
          mt={isWideScreen ? undefined : "2rem"}
        >
          {isUser && (
            <>
              <MyPostWidget picturePath={user.picturePath} />
              <Box m="2rem 0" />
            </>
          )}

          <PostsWidget userId={userId} isUser isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
