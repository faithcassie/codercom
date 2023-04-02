import React from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import { useDispatch } from "react-redux";
import { deleteConmment } from "./commentSlice";

function CommentCard({ comment }) {
  // console.log(comment);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
          <Button
            sx={{ color: "red" }}
            // onClick={dispatch(deleteConmment({ commentId: comment._id }))}
            onClick={handleClickOpen}
          >
            Delete
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">
              {"Do you want to delete this?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button
                onClick={() =>
                  dispatch(
                    deleteConmment({
                      commentId: comment._id,
                      postId: comment.post,
                    })
                  )
                }
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
