import { Repo } from "@automerge/automerge-repo"
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket"
import { NodeFSStorageAdapter } from "@automerge/automerge-repo-storage-nodefs"
import { next as Automerge } from "@automerge/automerge"

const network = new BrowserWebSocketClientAdapter("ws://localhost:8080");
const repo = new Repo({
    storage: new NodeFSStorageAdapter("./client1_db"),
    network: [network]
})

const handle = repo.find("automerge:2pj6vUMaP349U95UcdboYQw2LRFE");
console.log(handle);
let doc = await handle.doc();
console.log(doc);
console.log(doc.firstname);
