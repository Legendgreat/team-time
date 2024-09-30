import { Add } from "@mui/icons-material"
import { Box, Button, Container, Typography } from "@mui/material"
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridEventListener,
  GridRowsProp,
} from "@mui/x-data-grid"
import { useNavigate } from "@tanstack/react-router"
import { DUMMY_TIMES } from "../../data/DUMMY_TIMES"
import { formatDateIntoString } from "../../utils/dateHelpers"
import { formatStatusIntoText } from "../../utils/stringHelpers"
import { formatMinuteDurationToString } from "../../utils/timeHelpers"

type Props = {}

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

const rows: GridRowsProp = DUMMY_TIMES.map((time) => {
  const { id, date, status } = time
  const duration = time.blocks.reduce((a, b) => a + b.duration, 0)

  const fDuration = formatMinuteDurationToString(duration)

  return { id, date, status, duration: fDuration }
})

const Times = (props: Props) => {
  const navigate = useNavigate()

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    navigate({ to: params.row.id.toString() })
    console.log(params.row.id)
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
            <Button sx={{ gap: 1 }}>
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
