import { createRouter } from "../../lib/create-app"
import * as routes from "./reports.routes"
import * as handlers from "./reports.handlers"

const reports = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.create, handlers.create)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove)

export default reports
