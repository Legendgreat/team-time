import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import React from "react"

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
  ) => {
    return <Slide direction="up" ref={ref} {...props} />
  }
)

type Props = {
  open: boolean
  onClose: () => void
  onAccept: () => void
  title?: string
  itemDesc?: string
}

const DeleteDialog = (props: Props) => {
  const { open, onClose, onAccept, title, itemDesc } = props

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle>{`Delete${title ? ` ${title}` : " Item"}`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete {itemDesc ?? "item"}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose()
            onAccept()
          }}
        >
          Accept
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
