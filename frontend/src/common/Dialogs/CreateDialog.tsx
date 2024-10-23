import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2 as Grid,
  Input,
  Slide,
  TextField,
} from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import { DialogProps } from "@toolpad/core/useDialogs"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
  ) => {
    return <Slide direction="up" ref={ref} {...props} />
  }
)

type FieldType = "text" | "checkbox" | "radio" | "switch" | "password"

export type Field<T> = {
  label: string
  type: FieldType
  name: keyof T
  width: 4 | 6 | 12
}

type Payload<T> = {
  title: string
  formFields: Field<T>[]
  onSubmit: (item: T) => void
}

const FieldByType = <T,>(props: {
  field: Field<T>
  value: T[keyof T]
  onChange: (data: { name: keyof T; value: string }) => void
}) => {
  const { field, value, onChange } = props
  switch (field.type) {
    case "text":
      return (
        <TextField
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange({ name: field.name, value: e.target.value })
          }}
          value={value}
          label={field.label}
        />
      )
  }
}

const CreateDialog = <T,>(props: DialogProps<Payload<T>>) => {
  const { open, onClose } = props
  const { title, formFields, onSubmit } = props.payload

  const [item, setItem] = useState<T>(() => {
    const initialValues = Object.fromEntries(
      formFields.map((field) => [field.name, undefined as T[keyof T & string]])
    ) as T
    return initialValues
  })

  const handleChange = (data: { name: keyof T; value: string }) => {
    const { name, value } = data
    setItem((prevItem) => ({
      ...prevItem,
      [name as string]: value as T[keyof T & string],
    }))
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        onClose()
      }}
      aria-describedby="create-dialog-description"
    >
      <DialogTitle>{`Create${title ? ` ${title}` : " Item"}`}</DialogTitle>
      <DialogContent>
        <Grid sx={{ mt: 1 }} container spacing={2}>
          {formFields.map((field) => (
            <Grid key={field.name as string} size={field.width}>
              <FieldByType
                field={field}
                value={item![field.name]}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose()
            if (item) onSubmit(item)
          }}
        >
          Submit
        </Button>
        <Button
          onClick={() => {
            onClose()
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateDialog
