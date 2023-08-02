import { Box, Typography, useTheme } from "@mui/material";
import { WidgetWrapper } from "../../../components/StyledComponent/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends as setUsersFriends } from "../../../Redux/Slices/authSlice";
import { userRequest } from "../../../requestMethod";
import { setLoading } from "../../../Redux/Slices/authSlice";

import Friend from "../../../components/Friend";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const [friends, setFriends] = useState([]);
  const loading = useSelector((state) => state.loading);
  // const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const getFriends = async () => {
    try {
      const res = await userRequest.get(`/users/${userId}/friends`);
      const data = await res.data;
      setFriends(data);
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching friends:", error);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, loading, dispatch]);

  useEffect(() => {
    if (user._id === userId) {
      dispatch(setUsersFriends({ friends: friends }));
    }
  }, [dispatch, friends, user._id, userId]);

  console.log("loading", loading);
  console.log("friends", friends);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
