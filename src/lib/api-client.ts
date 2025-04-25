import { hc } from "hono/client"
import { AppType } from "@/app/api/[[...route]]/app"

export const APIClient = hc<AppType>("http://localhost:3000/")