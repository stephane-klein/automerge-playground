import readline from "node:readline/promises";
import { Repo } from "@automerge/automerge-repo"
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket"
import { NodeFSStorageAdapter } from "@automerge/automerge-repo-storage-nodefs"
import { next as Automerge } from "@automerge/automerge"

const network = new BrowserWebSocketClientAdapter("ws://localhost:3030");
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
        d.lastname = "Klein";
    }
);
console.log(handle.url);
handle.docSync();

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
