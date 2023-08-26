const fs = require("fs");

const regex = /(\d{2})\/(\d{2})\/(\d{2}), (\d{2}):(\d{2}) - ([^:]*): (.*)/;
const messageCount = {};

const data = fs.readFileSync("chat.txt", "utf8");
const lines = data.split("\n");

lines.forEach((line, index) => {
  const match = line.match(regex);
  if (match) {
    const [_, day, month, year, hour, minute, sender, message] = match;

    // increment the message count for the sender
    const current = messageCount[sender] || 0;
    messageCount[sender] = current + 1;
  }
});

// sort the message count object by the number of messages
const sorted = Object.entries(messageCount).sort((a, b) => b[1] - a[1]);
console.log("Messages sent by each person\n-----------------------------");
let i = 1;
for (const [sender, count] of sorted) {
  console.log(`(${i++}): ${count}\t${sender}`);
}
