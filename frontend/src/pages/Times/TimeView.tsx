import { Box, Card, Chip, Container, Stack, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useParams } from "@tanstack/react-router"
import { DUMMY_TIMES } from "../../data/DUMMY_TIMES"
import { formatDateIntoString } from "../../utils/dateHelpers"
import TimeTimeline from "../../components/TimeTimeline"

type Props = {}

const TimeView = (props: Props) => {
  const { timeId } = useParams({ strict: false })
  const time = DUMMY_TIMES.filter((time) => time.id.toString() === timeId)[0]
  return (
    <Container sx={{ mt: 4 }}>
      <Stack direction="row">
        <Typography variant="h5" sx={{ display: "inline-block", mb: 3, mr: 2 }}>
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
              flexDirection: "row",
            }}
          >
            <TimeTimeline time={time} />
          </Box>
        </Grid>
        <Grid size={4}>
          <Card variant="outlined" sx={{ minHeight: 350, py: 2 }}></Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TimeView
