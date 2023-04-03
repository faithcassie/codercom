import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Card,
  Box,
  Pagination,
  Grid,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFriendRequests, getSentRequests } from "./friendSlice";
import UserCard from "./UserCard";
import SearchInput from "../../components/SearchInput";

function FriendRequests() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = React.useState(1);
  const [page2, setPage2] = React.useState(1);

  const {
    currentPageUsers,
    sentUsersList,
    usersById,
    totalUsers,
    totalPages,
    totalUsers2,
    totalPages2,
  } = useSelector((state) => state.friend);
  const users = currentPageUsers.map((userId) => usersById[userId]);
  const users2 = sentUsersList.map((userId) => usersById[userId]);
  const totalRequests = totalUsers + totalUsers2;
  // const sentUsers =
  const dispatch = useDispatch();

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  useEffect(() => {
    dispatch(getFriendRequests({ filterName, page }));
    dispatch(getSentRequests({ filterName, page2 }));
  }, [filterName, page, page2, dispatch]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friend Requests
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalRequests > 1
                ? `${totalRequests} requests found`
                : totalRequests === 1
                ? `${totalRequests} request found`
                : "No request found"}
            </Typography>
          </Stack>
          <Card sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ mt: 3 }}>
              Received
            </Typography>
            <Grid container spacing={3} my={1}>
              {users.map((user) => (
                <Grid key={user._id} item xs={12} md={4}>
                  <UserCard profile={user} />
                </Grid>
              ))}
            </Grid>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, page) => setPage(page)}
            />
          </Card>
          <Card sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ mt: 3 }}>
              Sent
            </Typography>
            <Grid container spacing={3} my={1}>
              {users2.map((user) => (
                <Grid key={user._id} item xs={12} md={4}>
                  <UserCard profile={user} />
                </Grid>
              ))}
            </Grid>
            <Pagination
              count={totalPages2}
              page={page2}
              onChange={(e, page2) => setPage2(page2)}
            />
          </Card>
        </Stack>
      </Card>
    </Container>
  );
}

export default FriendRequests;
