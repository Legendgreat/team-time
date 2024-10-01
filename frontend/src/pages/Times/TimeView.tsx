import { ArrowBack, Circle, Edit, History } from "@mui/icons-material"
import {
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
  Stack,
  Typography,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useNavigate, useParams } from "@tanstack/react-router"
import TimeTimeline from "../../components/TimeTimeline"
import { formatDateIntoString } from "../../utils/dateHelpers"
import { formatStatusIntoText } from "../../utils/stringHelpers"
import { getTextColorFromStatus } from "../../utils/styleHelpers"
import { getTimeById } from "../../api/timesApi"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../components/Loader"

type Props = {}

const TimeView = (props: Props) => {
  const userId = 0
  const navigate = useNavigate()
  const { timeId } = useParams({ strict: false })
  const {
    isPending,
    isError,
    data: time,
    error,
  } = useQuery({
    queryKey: ["time", { userId, timeId }],
    queryFn: () => getTimeById(userId, parseInt(timeId!)),
  })

  if (isPending) return <Loader />

  if (isError) {
    return <Typography>Error: {error.message}</Typography>
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
                  <ListItemButton sx={{ px: 3 }} onClick={() => {}}>
                    <ListItemIcon sx={{ minWidth: "48px" }}>
                      <History />
                    </ListItemIcon>
                    <ListItemText>Retract</ListItemText>
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
            </List>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TimeView
