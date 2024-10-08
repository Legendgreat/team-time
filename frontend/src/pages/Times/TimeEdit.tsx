import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "@tanstack/react-router"
import React, { useEffect, useRef, useState } from "react"
import {
  deleteBlock,
  getTimeById,
  submitTime,
  updateBlocks,
} from "../../api/timesApi"
import { AxiosError } from "axios"
import { FetchError } from "../../interfaces/error.interface"
import Loader from "../../common/Loader"
import Error from "../../common/Error/Error"
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  Fab,
  Grid2 as Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import TimeEditBlock from "./TimeEditBlock"
import {
  Add,
  ArrowBack,
  Circle,
  Delete,
  History,
  Save,
  TaskAlt,
} from "@mui/icons-material"
import { formatDateIntoString } from "../../utils/dateHelpers"
import { getTextColorFromStatus } from "../../utils/styleHelpers"
import { formatStatusIntoText } from "../../utils/stringHelpers"
import { createBlock } from "../../api/timesApi"
import { Block } from "../../interfaces/time.interface"
import { useSnackbar } from "notistack"

type Props = {}

const TimeEdit = (props: Props) => {
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

  const [blocks, setBlocks] = useState<Block[]>([])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key == "s") {
      e.preventDefault()
      saveBlocksHandler()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [blocks])

  if (isPending) return <Loader />

  if (isError) return <Error error={error} />

  const newBlockHandler = () => {
    createBlock(parseInt(timeId!)).then(() => {
      qc.invalidateQueries({ queryKey: ["time", { timeId }] })
    })
  }

  const deleteBlockHandler = (id: number) => {
    deleteBlock(parseInt(timeId!), id).then(() => {
      qc.invalidateQueries({ queryKey: ["time", { timeId }] })
    })
  }

  const saveBlocksHandler = () => {
    updateBlocks(time.id, blocks).then(() => {
      enqueueSnackbar("Saved blocks.", { variant: "success" })
      qc.invalidateQueries({ queryKey: ["time", { timeId }] })
    })
  }

  const saveAndSubmitHandler = () => {
    console.log("Saving following blocks:", blocks)
    updateBlocks(time.id, blocks).then(() => {
      submitTime(time.id).then(() => {
        enqueueSnackbar("Saved blocks and submitted time.", {
          variant: "success",
        })
        navigate({ to: ".." })
      })
    })
  }

  const updateBlockList = (data: Partial<Block>) => {
    const { title, description, duration, start } = data
    const blockToChange = blocks.filter((block) => block.id == data.id)[0]

    if (blockToChange) {
      blockToChange.title = title ?? blockToChange.title
      blockToChange.description = description ?? blockToChange.description
      blockToChange.duration = duration ?? blockToChange.duration
      blockToChange.start = start ?? blockToChange.start
    }

    const fBlocks = (fBlocks: Block[]) =>
      fBlocks!.filter((block) => block.id != data.id)
    setBlocks((oldBlocks) => [
      ...fBlocks(oldBlocks),
      blockToChange ?? { ...data },
    ])
  }

  const generateBlockList = () => {
    if (time.blocks.length == 0) {
      return (
        <Card variant="outlined" sx={{ maxWidth: 300 }}>
          <CardActionArea onClick={newBlockHandler}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                No Blocks
              </Typography>
              <Typography variant="body2">
                No blocks have been created yet, click here to make one now or
                click "Add Block" in the menu.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )
    }

    if (time.blocks.length > 0) {
      return (
        <>
          <Stack
            spacing={2}
            direction="row"
            useFlexGap
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {time.blocks.map((block) => (
              <TimeEditBlock
                key={block.id}
                onDelete={() => {
                  deleteBlockHandler(block.id)
                }}
                onUpdate={updateBlockList}
                block={block}
              />
            ))}
            <Box
              sx={{
                display: "flex",
                width: 300,
                height: 226,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Fab onClick={newBlockHandler}>
                <Add />
              </Fab>
            </Box>
            {time.blocks.length % 2 == 0 && <Box sx={{ width: 300 }} />}
          </Stack>
        </>
      )
    }
  }

  return (
    <Container sx={{ mt: 4, display: "flex", flexDirection: "column" }}>
      <Stack direction="row" spacing={2}>
        <IconButton
          size="small"
          onClick={() => {
            navigate({ to: ".." })
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" sx={{ display: "inline-block", mb: 3 }}>
          Editing time
        </Typography>
        <Chip label={formatDateIntoString(time.date)} color="primary" />
      </Stack>
      <Box sx={{ mt: 4, display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            gap: 1,
            justifyContent: "center",
          }}
        >
          {generateBlockList()}
        </Box>
        {/* Menu */}
        <Box sx={{ minWidth: 300 }}>
          <Card variant="outlined" sx={{ position: "fixed", minWidth: 300 }}>
            <Grid container sx={{ py: 3, px: 3, gap: 3 }}>
              <Grid
                size="auto"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                {/* Data Overview */}
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
            {/* Actions */}
            <List>
              {/* Add Block Action */}
              <ListItem disablePadding>
                <ListItemButton sx={{ px: 3 }} onClick={newBlockHandler}>
                  <ListItemIcon sx={{ minWidth: "48px" }}>
                    <Add />
                  </ListItemIcon>
                  <ListItemText>Add Block</ListItemText>
                </ListItemButton>
              </ListItem>
              {/* Save Action */}
              {time.status == "draft" && (
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ px: 3 }}
                    onClick={() => {
                      saveBlocksHandler()
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "48px" }}>
                      <Save />
                    </ListItemIcon>
                    <ListItemText>Save</ListItemText>
                  </ListItemButton>
                </ListItem>
              )}
              {/* Save & Submit Action */}
              {time.status == "draft" && (
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ px: 3 }}
                    onClick={() => {
                      saveAndSubmitHandler()
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "48px" }}>
                      <TaskAlt />
                    </ListItemIcon>
                    <ListItemText>Save & Submit</ListItemText>
                  </ListItemButton>
                </ListItem>
              )}
              {/* Delete Action */}
              {/* TODO: Delete and navigate back to /times */}
              {time.status == "draft" && (
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ px: 3 }}
                    onClick={() => {}}
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
        </Box>
      </Box>
    </Container>
  )
}

export default TimeEdit
