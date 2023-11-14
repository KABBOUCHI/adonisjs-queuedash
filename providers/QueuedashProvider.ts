import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { appRouter } from "@queuedash/api";
import { resolveHTTPResponse } from '@trpc/server/http';

export default class QueuedashProvider {
  constructor(protected app: ApplicationContract) { }

  public async boot() {
    this.app.container.withBindings(['Adonis/Core/Route'], (Route) => {
      Route.queuedash = (baseUrl, { queues }) => {
        baseUrl = baseUrl.startsWith("/") ? baseUrl : "/" + baseUrl
        baseUrl = baseUrl.replace(/\/$/, "")

        return Route.group(() => {
          Route.get(baseUrl, async ({ response }) => {
            response.header("Content-Type", "text/html");

            return /* HTML */ `
            <!DOCTYPE html>
                  <html lang="en">
                    <head>
                      <meta charset="UTF-8" />
                      <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                      />
                      <title>QueueDash App</title>
                    </head>
                    <body>
                      <div id="root"></div>
                      <script>
                        window.__INITIAL_STATE__ = {
                          apiUrl: "${baseUrl}/trpc",
                          basename: "${baseUrl}",
                        };
                      </script>
                      <link
                        rel="stylesheet"
                        href="https://unpkg.com/@queuedash/ui@1.0.1/dist/styles.css"
                      />
                      <script
                        type="module"
                        src="https://unpkg.com/@queuedash/client@1.0.1/dist/main.mjs"
                      ></script>
                    </body>
                  </html>`
          })

          Route.any(`${baseUrl}/trpc/*`, async ({ request, response }) => {
            const path = request.url().split("/trpc/")[1]
            const url = new URL(request.completeUrl(true));

            const { body, status, headers } = await resolveHTTPResponse({
              createContext: async () => ({
                queues,
              }),
              router: appRouter,
              path,
              req: {
                query: url.searchParams,
                method: request.method(),
                headers: request.headers(),
                body: request.body(),
              },
            });
            if (headers) {
              Object.keys(headers).forEach((key) => {
                const value = headers[key];
                if (value) response.header(key, value);
              });
            }
            response.status(status);
            response.send(body);
          })

          Route.get(`${baseUrl}/*`, async ({ response }) => {
            response.header("Content-Type", "text/html");
            return /* HTML */ `<!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>QueueDash App</title>
                </head>
                <body>
                  <div id="root"></div>
                  <script>
                    window.__INITIAL_STATE__ = {
                      apiUrl: "${baseUrl}/trpc",
                      basename: "${baseUrl}",
                    };
                  </script>
                  <link
                    rel="stylesheet"
                    href="https://unpkg.com/@queuedash/ui@1.0.1/dist/styles.css"
                  />
                  <script
                    type="module"
                    src="https://unpkg.com/@queuedash/client@1.0.1/dist/main.mjs"
                  ></script>
                </body>
              </html>`
          })
        })
      }
    })
  }
}
