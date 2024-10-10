import { Card, CardActionArea, CardContent, Typography } from "@mui/material"
import React from "react"

type Props = {
  label: string
  onClick: () => void
}

const AdminPanelCard = (props: Props) => {
  const { label, onClick } = props

  return (
    <Card variant="outlined" sx={{ width: 250, height: 250 }}>
      <CardActionArea onClick={onClick} sx={{ height: "100%" }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 !important",
            height: "100%",
          }}
        >
          <Typography variant="h6">{label}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default AdminPanelCard
