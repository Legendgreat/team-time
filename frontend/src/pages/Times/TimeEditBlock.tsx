import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Fab,
  Grid2 as Grid,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material"
import React, { useState } from "react"
import { Block } from "../../interfaces/time.interface"
import { Close } from "@mui/icons-material"

type Props = {
  onDelete: () => void
  onUpdate: (block: Partial<Block>) => void
  block: Block
}

const TimeEditBlock = (props: Props) => {
  const { onDelete, onUpdate } = props
  const { id, title, description, duration, start } = props.block

  const theme = useTheme()

  const [currentTitle, setCurrentTitle] = useState(title)
  const [currentDescription, setCurrentDescription] = useState(description)
  const [currentDuration, setCurrentDuration] = useState(duration.toString())
  const [currentStart, setCurrentStart] = useState(start.toString())

  const saveChanges = (data: Partial<Block>) => {
    onUpdate({
      id,
      title: data.title,
      description: data.description,
      duration: data.duration,
      start: data.start,
    })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    switch (e.target.id) {
      case "title":
        saveChanges({ title: e.target.value })
        break
      case "description":
        saveChanges({ description: e.target.value })
        break
      case "duration":
        saveChanges({ duration: parseInt(e.target.value) })
        break
      case "start":
        saveChanges({ start: parseInt(e.target.value) })
        break
    }
  }

  const clearFields = () => {
    setCurrentTitle(title)
    setCurrentDescription(description)
    setCurrentDuration(duration.toString())
    setCurrentStart(start.toString())
  }

  // TODO Create form validation
  // TODO Convert duration and start time from and to readable text (eg. 10:30am, 1h 30m)

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        onClick={onDelete}
        sx={{ position: "absolute", right: -16, top: -16 }}
        color="error"
        size="small"
      >
        <Close />
      </IconButton>
      <Card variant="outlined" sx={{ width: "300px" }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            defaultValue={currentTitle}
            onChange={handleChange}
          />
          <TextField
            id="description"
            label="Description"
            multiline
            variant="outlined"
            defaultValue={currentDescription}
            onChange={handleChange}
          />
          <Grid container spacing={1}>
            <Grid size={6}>
              <TextField
                id="duration"
                label="Duration"
                multiline
                variant="outlined"
                defaultValue={currentDuration}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                id="start"
                label="Start Time"
                multiline
                variant="outlined"
                defaultValue={currentStart}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default TimeEditBlock
