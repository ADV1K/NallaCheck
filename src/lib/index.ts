const regex = /(\d{2})\/(\d{2})\/(\d{2}), (\d{2}):(\d{2}) - ([^:]*): (.*)/;
const messageCount: { [key: string]: number } = {};

export async function nallaCheck(event: Event) {
	const data = await readText(event);
	const lines = data.split('\n');

	for (const line of lines) {
		const match = line.match(regex);
		if (match) {
			const [_, day, month, year, hour, minute, sender, message] = match;

			// increment the message count for the sender
			const current = messageCount[sender] || 0;
			messageCount[sender] = current + 1;
		}
	}

	// sort the message count object by the number of messages
	const sorted = Object.entries(messageCount).sort((a, b) => b[1] - a[1]);
	console.log('Messages sent by each person\n-----------------------------');
	let i = 1;
	for (const [sender, count] of sorted) {
		console.log(`(${i++}): ${count}\t${sender}`);
	}
}

async function readText(event: Event) {
	const file = (event.target as HTMLInputElement)?.files?.[0];
	if (!file) {
		return '';
	}

	const text = await file.text();
	return text;
}
