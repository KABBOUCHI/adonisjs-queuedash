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

// http://127.0.0.1:3333/queuedash
Route.queuedash('/queuedash', {
	queues: [
		{
			queue: new Queue('report-queue'),
			displayName: 'Reports',
			type: 'bullmq' as const, // bullmq, bull, bee
		},
	],
}).middleware(['auth']);
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

// http://127.0.0.1:3333/queues
Route.queuedash('/queues', {
	queues,
});
```
## Troubleshooting Build Errors

If you encounter an error during the build process, it may be resolved by installing TypeScript version 5. You can do this using either npm or yarn as follows:

For npm:

```bash
npm install typescript@5
```

For yarn:

```bash
yarn add typescript@5
```

This specifies the installation of TypeScript version 5 as a development dependency, which should align with your project's requirements.

## License

Published under [MIT License](./LICENSE.md).