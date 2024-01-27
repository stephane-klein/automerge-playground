import { Repo } from "@automerge/automerge-repo"
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket"
import { NodeFSStorageAdapter } from "@automerge/automerge-repo-storage-nodefs"
import { next as Automerge } from "@automerge/automerge"

const network = new BrowserWebSocketClientAdapter("ws://localhost:8080");
const repo = new Repo({
    storage: new NodeFSStorageAdapter("./client1_db"),
    network: [network]
})

let doc1 = Automerge.init();
console.log("doc1", doc1);
doc1 = Automerge.change(
    doc1,
    d => {
        d.ideas = "Stéphane";
    }
);
console.log("doc1", doc1);
console.log("doc1.ideas", doc1.ideas)

const handle = repo.create()
handle.change(
    d => {
        d.counter = new Automerge.Counter(8);
        console.log("d", d);
        d.firstname = "Stéphane";
    }
);
console.log(handle.url);
handle.docSync();
// network.disconnect();
