import readline from "node:readline/promises";
import { Repo } from "@automerge/automerge-repo"
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket"
import { NodeFSStorageAdapter } from "@automerge/automerge-repo-storage-nodefs"
import { next as Automerge } from "@automerge/automerge"

const network = new BrowserWebSocketClientAdapter("ws://localhost:3030");
const repo = new Repo({
    peerId: "client2",
    storage: new NodeFSStorageAdapter("./client3_db"),
    network: [network]
})
// console.log(network);

const handle = repo.find("automerge:8abacf54-d9a4-4561-b4c9-84c605b0f07e");
await handle.whenReady();
console.log(handle);
let doc = await handle.doc();
console.log(doc);
console.log(doc.firstname);
handle.on("change", ({doc}) => {
    console.log("doc");
    console.log(doc);
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let answer;
while (true) {
    answer = await rl.question(`What's your name?`);
    console.log(answer);
    if (answer == "quit") {
        setTimeout(() => process.exit(), 200);
        break;
    } else {
        handle.change(
            d => {
                d.firstname = answer;
            }
        );
        handle.docSync();
    }
}
