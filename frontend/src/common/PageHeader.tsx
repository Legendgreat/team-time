import { ArrowBack } from "@mui/icons-material"
import { Chip, IconButton, Stack, Typography } from "@mui/material"
import { ColorOptions } from "../interfaces/palette.interface"

interface Props {
  onBack?: () => void
  content: string
  chip?: {
    label: string
    color: ColorOptions
  }
}

const PageHeader = (props: Props) => {
  const { onBack, content, chip } = props

  return (
    <Stack direction="row" spacing={2}>
      <IconButton size="small" onClick={onBack}>
        <ArrowBack />
      </IconButton>
      <Typography variant="h5" sx={{ display: "inline-block", mb: 3 }}>
        {content}
      </Typography>
      {chip && <Chip label={chip.label} color={chip.color} />}
    </Stack>
  )
}

export default PageHeader
