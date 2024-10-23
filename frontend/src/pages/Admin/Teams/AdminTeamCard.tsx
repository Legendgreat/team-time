import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  ListItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"
import React from "react"
import { Team } from "../../../interfaces/team.interface"
import { User } from "../../../interfaces/user.interface"
import { convertFullNameToLetters } from "../../../utils/stringHelpers"
import { useNavigate } from "@tanstack/react-router"

const AdminTeamCard = (props: Team & { noClick?: boolean }) => {
  const { id, name, description, image, manager, members } = props
  const navigate = useNavigate()

  const Manager = () => {
    if (manager) {
      return (
        <Tooltip placement="top" title={manager.fullName}>
          <Avatar>{convertFullNameToLetters(manager.fullName!)}</Avatar>
        </Tooltip>
      )
    }
  }

  const Member = ({ member }: { member: Partial<User> }) => {
    return (
      <Tooltip placement="top" title={member.fullName}>
        <Avatar sx={{ width: 32, height: 32, fontSize: 16 }}>
          {convertFullNameToLetters(member.fullName!)}
        </Avatar>
      </Tooltip>
    )
  }

  const contents = (
    <CardContent sx={{ flex: "1 0 auto", width: 200 }}>
      <Box
        component="img"
        src={image ? `${image}` : undefined}
        sx={{
          opacity: 0.4,
          p: 1,
          position: "absolute",
          width: "100%",
          height: "auto",
          left: 0,
          top: 0,
        }}
      />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Typography variant="h5">{name}</Typography>
        {description && <Typography variant="body2">{description}</Typography>}
        <Manager />
        {members && (
          <>
            <Divider flexItem />
            <Stack
              gap={1}
              flexWrap="wrap"
              justifyContent="center"
              direction="row"
              flexGrow="1"
            >
              {members.map((member) => (
                <Member key={member.fullName} member={member} />
              ))}
            </Stack>
          </>
        )}
      </Box>
    </CardContent>
  )

  if (!props.noClick)
    return (
      <Card variant="outlined">
        <CardActionArea
          onClick={() => {
            navigate({ to: id.toString() })
          }}
          sx={{ display: "flex", height: "100%" }}
        >
          {contents}
        </CardActionArea>
      </Card>
    )

  return <Card variant="outlined">{contents}</Card>
}

export default AdminTeamCard
