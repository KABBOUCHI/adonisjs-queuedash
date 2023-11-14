import { Context } from "@queuedash/api";

declare module '@ioc:Adonis/Core/Route' {
	interface RouterContract {
		queuedash(baseUrl: string, contenxt: Context): RouteGroupContract
	}
}