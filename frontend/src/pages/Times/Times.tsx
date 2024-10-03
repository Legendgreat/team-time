import { Add } from "@mui/icons-material"
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material"
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridEventListener,
  GridRowsProp,
} from "@mui/x-data-grid"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { createTime, getTimes } from "../../api/timesApi"
import { formatDateIntoString } from "../../utils/dateHelpers"
import { formatStatusIntoText } from "../../utils/stringHelpers"
import { formatMinuteDurationToString } from "../../utils/timeHelpers"
import Loader from "../../common/Loader"

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Date",
    valueFormatter: formatDateIntoString,
    width: 200,
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    valueFormatter: formatStatusIntoText,
    width: 150,
  },
]

const Times = () => {
  const userId = 0
  const navigate = useNavigate()

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["times", { userId }],
    queryFn: () => getTimes(),
  })

  if (isPending) {
    return <Loader />
  }

  if (isError) {
    return <Typography>Error: {error.message}</Typography>
  }

  const rows: GridRowsProp = data?.map((time) => {
    const { id, date, status } = time
    const duration = time.blocks.reduce((a, b) => a + b.duration, 0)

    const fDuration = formatMinuteDurationToString(duration)

    return { id, date, status, duration: fDuration }
  })

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    navigate({ to: params.row.id.toString() })
  }

  const newTimeHandler = () => {
    createTime().then((time) => {
      navigate({ to: time.id.toString() + "/edit" })
    })
  }

  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Typography variant="h5" textAlign="center">
          Have a 👀 into your 🕒
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              mb: 1,
            }}
          >
            <Button onClick={newTimeHandler} sx={{ gap: 1 }}>
              <Add /> Add new time
            </Button>
          </Box>
          <DataGrid
            sx={{
              [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                {
                  outline: "none",
                },
            }}
            columns={columns}
            rows={rows}
            onRowClick={handleRowClick}
          ></DataGrid>
        </Box>
      </Container>
    </>
  )
}

export default Times
