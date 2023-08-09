import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";

import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { FlexBetween } from "../../../components/StyledComponent/FlexBetween";
import { WidgetWrapper } from "../../../components/StyledComponent/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../../Redux/Slices/authSlice";

import { BASE_URL, userRequest } from "../../../requestMethod";
import Friend from "../../../components/Friend";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  isProfile,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    alert('Visitors are currently prohibited to make any changes. I appreciate your visits. Thank You!')
    return;
    const res = await userRequest.patch(`posts/${postId}/like`, {
      userId: loggedInUserId,
    });
    const updatedPost = await res.data;
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m={isProfile ? "0 0 2rem 0" : "2rem 0"}>
      <Friend
        friendId={postUserId}
        name={name}
        location={location}
        userPicturePath={userPicturePath}
      />
      {/* ++++ Post starts ++++ */}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${BASE_URL}assets/${picturePath}`}
        />
      )}
      {/* ---- Post ends --- */}

      {/* ++++ Like, Comment, Share ++++ */}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {/* ---- Like, Comment, Share --- */}

      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
