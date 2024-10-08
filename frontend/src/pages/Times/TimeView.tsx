import {
  ArrowBack,
  Circle,
  Delete,
  Edit,
  History,
  TaskAlt,
} from "@mui/icons-material"
import {
  Alert,
  AlertColor,
  AlertPropsColorOverrides,
  Box,
  Card,
  Chip,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useNavigate, useParams } from "@tanstack/react-router"
import { useDialogs } from "@toolpad/core/useDialogs"
import TimeTimeline from "../../common/TimeTimeline"
import { formatDateIntoString } from "../../utils/dateHelpers"
import { formatStatusIntoText } from "../../utils/stringHelpers"
import { getTextColorFromStatus } from "../../utils/styleHelpers"
import {
  deleteTime,
  getTimeById,
  retractTime,
  submitTime,
} from "../../api/timesApi"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Loader from "../../common/Loader"
import Error from "../../common/Error/Error"
import { AxiosError } from "axios"
import { FetchError } from "../../interfaces/error.interface"
import { useEffect, useRef, useState } from "react"
import DeleteDialog from "../../common/Dialogs/DeleteDialog"
import Killed from "../../common/Killed"
import { useSnackbar } from "notistack"
import {
  formatMinuteDurationToHourDisplay,
  formatMinuteDurationToString,
} from "../../utils/timeHelpers"

const TimeView = () => {
  const dialogs = useDialogs()
  const { enqueueSnackbar } = useSnackbar()
  const qc = useQueryClient()
  const navigate = useNavigate()
  const { timeId } = useParams({ strict: false })
  const {
    isPending,
    isError,
    isSuccess,
    data: time,
    error,
  } = useQuery({
    queryKey: ["time", { timeId }],
    queryFn: () => getTimeById(parseInt(timeId!)),
    throwOnError: (err: AxiosError & FetchError) => false,
  })

  const cancelRedirectTimer = () => {
    clearTimeout(redirectTimerRef.current)
  }

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) cancelRedirectTimer()
    }
  }, [])

  const redirectTimerRef = useRef<NodeJS.Timeout>()

  let duration: number

  const [isDeleted, setIsDeleted] = useState(false)

  if (isPending) return <Loader />

  if (isError) {
    return <Error error={error} />
  }

  if (isSuccess) {
    duration = time.blocks.reduce((a, b) => a + b.duration, 0)
  }

  if (isDeleted) {
    let date = formatDateIntoString(time.date)
    if (date == "Today" || date == "Yesterday") date = date.toLowerCase()

    return (
      <Killed
        onCancelTimeout={cancelRedirectTimer}
        message={`Your time from ${date} has been deleted.`}
      />
    )
  }

  const submitHandler = () => {
    submitTime(parseInt(timeId!)).then(() => {
      qc.invalidateQueries({ queryKey: ["time", { timeId }] })
    })
  }

  const retractHandler = () => {
    retractTime(parseInt(timeId!)).then(() => {
      qc.invalidateQueries({ queryKey: ["time", { timeId }] })
    })
  }

  const openDelete = () => {
    dialogs.open(DeleteDialog, {
      onAccept: deleteTimeHandler,
      title: "Time",
      itemDesc: "this time",
    })
  }

  const deleteTimeHandler = () => {
    deleteTime(parseInt(timeId!))
      .then(() => {
        qc.invalidateQueries({ queryKey: ["times"] })
        setIsDeleted(true)
        redirectTimerRef.current = setTimeout(() => {
          navigate({ to: "/times" })
        }, 5000)
      })
      .catch(() => {
        enqueueSnackbar("Failed to delete time.", {
          variant: "error",
        })
      })
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Stack direction="row" spacing={2}>
        <IconButton size="small" onClick={() => navigate({ to: ".." })}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" sx={{ display: "inline-block", mb: 3 }}>
          Time overview
        </Typography>
        <Chip label={formatDateIntoString(time.date)} color="primary" />
      </Stack>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TimeTimeline time={time} />
          </Box>
        </Grid>
        <Grid size={4}>
          <Card variant="outlined">
            <Grid container sx={{ py: 3, px: 3, gap: 3 }}>
              <Grid
                size="auto"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Typography>Date</Typography>
                <Typography>Duration</Typography>
                <Typography>Status</Typography>
                {time.managerCommentary && time.status == "denied" && (
                  <Typography>Commentary</Typography>
                )}
              </Grid>
              <Grid
                size="grow"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Typography>{formatDateIntoString(time.date)}</Typography>
                <Typography>
                  {formatMinuteDurationToString(duration!)}
                </Typography>
                <Typography
                  color={getTextColorFromStatus(time.status)}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Circle fontSize="small" />
                  {formatStatusIntoText(time.status)}{" "}
                </Typography>
                {time.managerCommentary && time.status == "denied" && (
                  <Typography>{time.managerCommentary}</Typography>
                )}
              </Grid>
            </Grid>
            <Divider />
            <List>
              {time.status == "pending" && (
                <ListItem disablePadding>
                  <ListItemButton sx={{ px: 3 }} onClick={retractHandler}>
                    <ListItemIcon sx={{ minWidth: "48px" }}>
                      <History />
                    </ListItemIcon>
                    <ListItemText>Retract</ListItemText>
                  </ListItemButton>
                </ListItem>
              )}
              {time.status == "draft" && (
                <ListItem disablePadding>
                  <ListItemButton sx={{ px: 3 }} onClick={submitHandler}>
                    <ListItemIcon sx={{ minWidth: "48px" }}>
                      <TaskAlt />
                    </ListItemIcon>
                    <ListItemText>Submit</ListItemText>
                  </ListItemButton>
                </ListItem>
              )}
              <ListItem disablePadding>
                <ListItemButton
                  sx={{ px: 3 }}
                  onClick={() => {
                    navigate({ from: "/times/$timeId", to: "edit" })
                  }}
                  disabled={
                    time.status == "approved" || time.status == "pending"
                  }
                >
                  <ListItemIcon sx={{ minWidth: "48px" }}>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText>Edit</ListItemText>
                </ListItemButton>
              </ListItem>
              {time.status == "draft" && (
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ px: 3 }}
                    onClick={openDelete}
                    disabled={time.status != "draft"}
                  >
                    <ListItemIcon sx={{ minWidth: "48px" }}>
                      <Delete />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TimeView
