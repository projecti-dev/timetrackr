import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import { logout } from "@reducers/authReducer";
import {
  addEntryAction,
  getEntriesAction,
  deleteEntryAction,
} from "@reducers/sessionReducer";
import {
  selectEntries,
  selectSessionLoading,
  selectSessionError,
} from "@selectors/sessionSelector";
import { selectUser } from "@selectors/authSelector";
import { AppDispatch } from "@store/index";
import {
  formatMinutes,
  formatDateLabel,
  formatTimeLabel,
} from "@utils/timeUtils";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  fontSize: "0.95rem",
  fontFamily: '"DM Sans", sans-serif',
  border: "1px solid #ecddd3",
  borderRadius: "10px",
  backgroundColor: "#fdf8f4",
  color: "#3d2e26",
  outline: "none",
};

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const entries = useSelector(selectEntries);
  const isLoading = useSelector(selectSessionLoading);
  const error = useSelector(selectSessionError);

  const [date, setDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    dispatch(getEntriesAction());
  }, [dispatch]);

  const handleSave = async () => {
    setFormError("");
    if (!date || !startTime || !endTime) {
      setFormError("Please fill in all fields.");
      return;
    }
    const result = await dispatch(
      addEntryAction({
        date: date.format("YYYY-MM-DD"),
        startTime,
        endTime,
      }),
    );
    if (addEntryAction.fulfilled.match(result)) {
      setDate(null);
      setStartTime("");
      setEndTime("");
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteEntryAction(id));
  };

  const handleLogout = () => dispatch(logout());

  const grouped = entries.reduce<Record<string, typeof entries>>(
    (acc, entry) => {
      if (!acc[entry.date]) acc[entry.date] = [];
      acc[entry.date].push(entry);
      return acc;
    },
    {},
  );

  const todayStr = dayjs().format("YYYY-MM-DD");
  const todayTotal = (grouped[todayStr] || []).reduce(
    (sum, e) => sum + e.durationMinutes,
    0,
  );

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
        {/* Entry form */}
        <Paper
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 4,
            p: 3,
            mb: 4,
          }}
        >
          <Typography variant="h6" color="text.primary" mb={0.5}>
            Log your hours
          </Typography>
          <Typography variant="body2" color="text.disabled" mb={3}>
            Select a date and enter your start and end time
          </Typography>

          <Stack spacing={2.5}>
            {/* Date input */}
            <Box>
              <Typography
                variant="caption"
                color="text.disabled"
                display="block"
                mb={0.5}
              >
                Date
              </Typography>
              <input
                type="date"
                value={date ? date.format("YYYY-MM-DD") : ""}
                onChange={(e) =>
                  setDate(e.target.value ? dayjs(e.target.value) : null)
                }
                style={inputStyle}
              />
            </Box>

            {/* Start and End time */}
            <Stack direction="row" spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="caption"
                  color="text.disabled"
                  display="block"
                  mb={0.5}
                >
                  Start time
                </Typography>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  style={inputStyle}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="caption"
                  color="text.disabled"
                  display="block"
                  mb={0.5}
                >
                  End time
                </Typography>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  style={inputStyle}
                />
              </Box>
            </Stack>

            {(formError || error) && (
              <Typography color="error" variant="body2">
                {formError || error}
              </Typography>
            )}

            <Button
              variant="contained"
              onClick={handleSave}
              disabled={isLoading}
              sx={{ alignSelf: "flex-start", px: 4, py: 1.2 }}
            >
              {isLoading ? (
                <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
              ) : null}
              Save Entry
            </Button>
          </Stack>
        </Paper>

        {/* Today's total */}
        {todayTotal > 0 && (
          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              p: 2,
              mb: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fef3ec",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Today's total
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontFamily: '"Lora", serif', color: "primary.dark" }}
            >
              {formatMinutes(todayTotal)}
            </Typography>
          </Paper>
        )}

        {/* Entries list */}
        {Object.keys(grouped).length === 0 ? (
          <Typography
            variant="body2"
            color="text.disabled"
            textAlign="center"
            mt={4}
          >
            No entries yet — log your first session above
          </Typography>
        ) : (
          <Stack spacing={3}>
            {Object.entries(grouped)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([dateStr, dayEntries]) => {
                const dayTotal = dayEntries.reduce(
                  (sum, e) => sum + e.durationMinutes,
                  0,
                );
                return (
                  <Box key={dateStr}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1.5,
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

                    <Stack spacing={1}>
                      {dayEntries.map((entry) => (
                        <Paper
                          key={entry.id}
                          elevation={0}
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                            px: 2,
                            py: 1.5,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <Typography
                              variant="body2"
                              color="text.primary"
                              fontWeight={500}
                            >
                              {formatTimeLabel(entry.startTime)} →{" "}
                              {formatTimeLabel(entry.endTime)}
                            </Typography>
                            <Typography variant="caption" color="text.disabled">
                              {formatMinutes(entry.durationMinutes)}
                            </Typography>
                          </Box>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(entry.id)}
                            sx={{
                              color: "text.disabled",
                              "&:hover": { color: "error.main" },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Paper>
                      ))}
                    </Stack>

                    <Divider sx={{ mt: 2 }} />
                  </Box>
                );
              })}
          </Stack>
        )}

        <Box textAlign="center" mt={5}>
          <Button
            variant="text"
            href="/dashboard"
            sx={{ color: "text.secondary", textDecoration: "underline" }}
          >
            View weekly & monthly stats →
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
