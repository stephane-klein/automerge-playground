import { WebSocketServer } from "ws"
import { NodeWSServerAdapter } from "@automerge/automerge-repo-network-websocket"

const wss = new WebSocketServer({ port: 8080 })
// const adapter = new NodeWSServerAdapter(wss)
