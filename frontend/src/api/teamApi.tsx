import { Team } from "../interfaces/team.interface"
import { query } from "./rootApi"

export const createTeam = async (team: Partial<Team>): Promise<Team> => {
  const data = await query<Team>(`/teams`, {
    method: "post",
    body: { ...team },
  })

  if (data) return data
  throw Error("Could not retrieve data.")
}

export const getTeams = async (): Promise<Team[]> => {
  const data = await query<Team[]>("/teams", { method: "get" })

  if (data) return data
  throw Error("Could not retrieve data.")
}

export const getTeamById = async (id: number): Promise<Team> => {
  const data = await query<Team>(`/teams/${id}`, { method: "get" })

  if (data) return data
  throw Error("Could not retrieve data.")
}
