import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../../Redux/Slices/authSlice";
import PostWidget from "../PostWidget";
import { userRequest } from "../../../requestMethod";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  console.log("posts", posts);

  const getPosts = async () => {
    const res = await userRequest.get("/posts");
    console.log("all Posts", res.data);
    dispatch(setPosts(res.data));
  };

  const getUserPosts = async () => {
    const res = await userRequest.get(`/${userId}/posts`);
    console.log("user Post", res.data);
    dispatch(setPosts(res.data));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
