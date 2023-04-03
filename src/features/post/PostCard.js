import React, { useEffect } from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import Popover from "@mui/material/Popover";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import { getPosts } from "./postSlice";
import PostForm from "./PostForm";

function PostCard({ post, userId, page, handleDelete }) {
  const [isEditing, setIsEditing] = React.useState(false);
  // const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [openDel, setOpenDel] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpenDel(true);
  // };

  // const handleCloseBtn = () => {
  //   setOpenDel(false);
  // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleEditBtn = (postId) => {
  //   dispatch(startEditing({ postId }));
  //   console.log(postId);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    getPosts({ userId, page });
  }, [post.content, post.image]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <>
            <IconButton onClick={handleClick}>
              <MoreVertIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Stack>
                <Button onClick={() => handleDelete(post._id)}>Delete</Button>
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
              </Stack>
            </Popover>
          </>
        }
      />

      {isEditing ? (
        <PostForm
          postId={post._id}
          content={post.content}
          // currentImage={post.image}
          userId={userId}
        />
      ) : (
        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography>{post.content}</Typography>

          {post.image && (
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                height: 300,
                "& img": { objectFit: "cover", width: 1, height: 1 },
              }}
            >
              <img src={post.image} alt="post" />
            </Box>
          )}

          <PostReaction post={post} />
          <CommentList postId={post._id} />
          <CommentForm postId={post._id} />
        </Stack>
      )}
    </Card>
  );
}

export default PostCard;
