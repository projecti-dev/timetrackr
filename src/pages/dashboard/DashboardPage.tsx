import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getStatsAction, getEntriesAction } from "@reducers/sessionReducer";
import { selectStats, selectEntries } from "@selectors/sessionSelector";
import { selectUser } from "@selectors/authSelector";
import { logout } from "@reducers/authReducer";
import { AppDispatch } from "@store/index";
import {
  formatMinutes,
  formatDateLabel,
  formatTimeLabel,
} from "@utils/timeUtils";
import dayjs from "dayjs";

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stats = useSelector(selectStats);
  const entries = useSelector(selectEntries);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getStatsAction());
    dispatch(getEntriesAction());
  }, [dispatch]);

  const handleLogout = () => dispatch(logout());

  // Group by month
  const grouped = entries.reduce<Record<string, typeof entries>>(
    (acc, entry) => {
      const month = entry.date.slice(0, 7);
      if (!acc[month]) acc[month] = [];
      acc[month].push(entry);
      return acc;
    },
    {},
  );

  const formatMonth = (monthStr: string) => {
    return dayjs(monthStr + "-01").format("MMMM YYYY");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          px: 4,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "primary.main",
            }}
          />
          <Typography variant="h6" color="text.primary">
            TimeTrackr
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Welcome, <strong>{user?.displayName}</strong>
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={handleLogout}
            sx={{ borderColor: "divider", color: "text.secondary" }}
          >
            Sign out
          </Button>
        </Box>
      </Box>

      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Typography variant="h5" color="text.primary" mb={4}>
          Your Stats
        </Typography>

        {/* Stats cards */}
        {stats && (
          <Stack direction="row" spacing={2} mb={5}>
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                p: 2.5,
                textAlign: "center",
                backgroundColor: "#fef3ec",
              }}
            >
              <Typography
                variant="caption"
                color="text.disabled"
                display="block"
                mb={0.5}
              >
                Today
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontFamily: '"Lora", serif', color: "primary.dark" }}
              >
                {formatMinutes(stats.daily)}
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                flex: 1,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                p: 2.5,
                textAlign: "center",
                backgroundColor: "#dff0db",
              }}
            >
              <Typography
                variant="caption"
                color="text.disabled"
                display="block"
                mb={0.5}
              >
                This week
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontFamily: '"Lora", serif', color: "secondary.dark" }}
              >
                {formatMinutes(stats.weekly)}
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                flex: 1,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                p: 2.5,
                textAlign: "center",
                backgroundColor: "#ede8f5",
              }}
            >
              <Typography
                variant="caption"
                color="text.disabled"
                display="block"
                mb={0.5}
              >
                This month
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontFamily: '"Lora", serif', color: "#7a5fa0" }}
              >
                {formatMinutes(stats.monthly)}
              </Typography>
            </Paper>
          </Stack>
        )}

        {/* All entries grouped by month */}
        <Typography variant="h6" color="text.primary" mb={3}>
          History
        </Typography>

        {Object.keys(grouped).length === 0 ? (
          <Typography variant="body2" color="text.disabled" textAlign="center">
            No entries yet
          </Typography>
        ) : (
          <Stack spacing={4}>
            {Object.entries(grouped)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([month, monthEntries]) => {
                const monthTotal = monthEntries.reduce(
                  (sum, e) => sum + e.durationMinutes,
                  0,
                );

                const byDate = monthEntries.reduce<
                  Record<string, typeof entries>
                >((acc, entry) => {
                  if (!acc[entry.date]) acc[entry.date] = [];
                  acc[entry.date].push(entry);
                  return acc;
                }, {});

                return (
                  <Box key={month}>
                    {/* Month header */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        color="text.primary"
                      >
                        {formatMonth(month)}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: '"Lora", serif',
                          color: "#7a5fa0",
                          fontWeight: 600,
                        }}
                      >
                        {formatMinutes(monthTotal)}
                      </Typography>
                    </Box>

                    {/* Days in month */}
                    <Stack spacing={1.5}>
                      {Object.entries(byDate)
                        .sort(([a], [b]) => b.localeCompare(a))
                        .map(([dateStr, dayEntries]) => {
                          const dayTotal = dayEntries.reduce(
                            (sum, e) => sum + e.durationMinutes,
                            0,
                          );
                          return (
                            <Paper
                              key={dateStr}
                              elevation={0}
                              sx={{
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 3,
                                p: 2,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  mb: 1,
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  fontWeight={600}
                                  color="text.secondary"
                                >
                                  {formatDateLabel(dateStr)}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontFamily: '"Lora", serif',
                                    color: "primary.dark",
                                    fontWeight: 600,
                                  }}
                                >
                                  {formatMinutes(dayTotal)}
                                </Typography>
                              </Box>
                              <Stack spacing={0.5}>
                                {dayEntries.map((e) => (
                                  <Typography
                                    key={e.id}
                                    variant="caption"
                                    color="text.disabled"
                                  >
                                    {formatTimeLabel(e.startTime)} →{" "}
                                    {formatTimeLabel(e.endTime)} ·{" "}
                                    {formatMinutes(e.durationMinutes)}
                                  </Typography>
                                ))}
                              </Stack>
                            </Paper>
                          );
                        })}
                    </Stack>
                  </Box>
                );
              })}
          </Stack>
        )}

        <Box textAlign="center" mt={5}>
          <Button
            variant="text"
            href="/home"
            sx={{ color: "text.secondary", textDecoration: "underline" }}
          >
            ← Back to home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardPage;
