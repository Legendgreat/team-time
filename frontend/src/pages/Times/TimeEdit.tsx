import { useQuery } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import React from "react"
import { getTimeById } from "../../api/timesApi"
import { AxiosError } from "axios"
import { FetchError } from "../../interfaces/error.interface"
import Loader from "../../common/Loader"
import Error from "../../common/Error/Error"
import { Card, CardContent, CardHeader, Container, Grid2 as Grid, TextField } from "@mui/material"
import TimeEditBlock from "./TimeEditBlock"

type Props = {}

const TimeEdit = (props: Props) => {
  const userId = 0;
  const { timeId } = useParams({ strict: false })
  const {
    isPending,
    isError,
    data: time,
    error,
  } = useQuery({
    queryKey: ["time", { userId, timeId }],
    queryFn: () => getTimeById(parseInt(timeId!)),
    throwOnError: (err: AxiosError & FetchError) => false,
  })

  if (isPending) return <Loader />

  if (isError) return <Error error={error} />

  return (
    <Container sx={{ mt: 4, display: "flex", gap: 1, justifyContent: "center" }}>
      
      { time.blocks.length > 0 && time.blocks.map((block) => <TimeEditBlock />) }
    </Container>
  )
}

export default TimeEdit
