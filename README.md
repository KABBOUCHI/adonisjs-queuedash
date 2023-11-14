<div align="center">
  <h1><b>AdonisJS QueueDash</b></h1>

  AdonisJS adapter for [queuedash](https://github.com/alexbudure/queuedash)
</div>

<p align="center">
  <a href="https://www.queuedash.com" target="_blank" rel="noopener">
    <img src="https://res.cloudinary.com/driverseat/image/upload/v1677406730/queuedash/queuedash-social.png" alt="QueueDash">
  </a>
</p>

## Getting Started

This package is available in the npm registry.

```bash
npm install adonisjs-queuedash
```

Next, configure the package by running the following command.

```bash
node ace configure adonisjs-queuedash
```

## Usage

basic usage

```ts
// start/routes.ts

import { Queue } from 'bullmq';

Route.queuedash('/queues', {
	queues: [
		{
			queue: new Queue('report-queue'),
			displayName: 'Reports',
			type: 'bullmq' as const, // bullmq, bull, bee
		},
	],
});
```

using [@rlanz/bull-queue](https://github.com/RomainLanz/adonis-bull-queue)

```ts
// start/routes.ts

import { Queue as BullmqQueue } from 'bullmq';
import { queueNames, config } from 'Config/queue';

const queues = queueNames.map((queueName) => ({
	queue: new BullmqQueue(queueName, {
		connection: config.connection,
	}),
	displayName: queueName,
	type: 'bullmq' as const,
}));

Route.queuedash('/queues', {
	queues,
});
```
