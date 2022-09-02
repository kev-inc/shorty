import { handleOptions, sendResponse } from "./utils";

export interface Env {
  db: KVNamespace;
}

type Payload = {
  shortname: string,
  link: string
}

export default {
  async fetch(
    request: Request,
    env: Env,
  ): Promise<Response> {

    const { method } = request;
    const { pathname, searchParams } = new URL(request.url);

    if (method === "OPTIONS") {
      return handleOptions(request)
    }

    if (pathname === '/api/links') {
      switch (method) {
        case "GET":
          const key = searchParams.get('shortname')
          if (key == null) {
            return sendResponse("Param 'shortname' is missing", 400)
          }
          const val = await env.db.get(key)
          return val == null ? sendResponse("Not found", 404) : sendResponse(val)
        case "POST":
          const body: Payload = await request.json()
          const { shortname, link } = body
          if (shortname == null || link == null) {
            return sendResponse("POST payload must include 'shortname' and 'link'", 400)
          }
          await env.db.put(shortname, link)
          return sendResponse("OK", 201)
      }
    }

    return sendResponse("Not found", 404)
  },
};
