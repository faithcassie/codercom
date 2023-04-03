import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import { deletePost, getPosts } from "./postSlice";

function PostList({ userId }) {
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  const { currentPagePosts, postsById, isLoading, totalPosts } = useSelector(
    (state) => state.post
  );
  const posts = currentPagePosts.map((postId) => postsById[postId]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(getPosts({ userId, page }));
  }, [dispatch, userId, page]);

  const [openDialog, setOpenDialog] = React.useState(false);

  // const handleClickOpenDialog = () => {
  //   setInterval(setOpenDialog(true), 1000);
  // };

  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  // };

  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          userId={userId}
          page={page}
          // setSelectedId={setSelectedId}
          // setOpenDialog={setOpenDialog}
          handleDelete={(postId) => {
            setSelectedId(postId);
            setOpenDialog(true);
          }}
        />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalPosts ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(totalPosts) && posts.length >= totalPosts}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6">No Post Yet</Typography>
        )}
      </Box>
      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this post?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Disagree</Button>
          <Button
            onClick={() => {
              dispatch(deletePost({ postId: selectedId, userId, page }));
              setOpenDialog(false);
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PostList;
