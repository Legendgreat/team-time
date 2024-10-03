import { Card, CardContent, Grid2 as Grid, TextField } from '@mui/material'
import React from 'react'

type Props = {}

const TimeEditBlock = (props: Props) => {
  return (
    <Card sx={{ minWidth: "300px", width: "300px" }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <TextField id="title" label="Title" variant="outlined" />
          <TextField id="description" label="Description" multiline variant="outlined" />
          <Grid container spacing={1}>
            <Grid size={6}>
              <TextField id="duration" label="Duration" multiline variant="outlined" />
            </Grid>
            <Grid size={6}>
              <TextField id="start" label="Start Time" multiline variant="outlined" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  )
}

export default TimeEditBlock