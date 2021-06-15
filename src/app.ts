import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts'
import { Application } from 'https://deno.land/x/oak@v7.5.0/mod.ts'
import { initRouter } from './routes/index.ts'
import { InitDatabase } from './database.ts'

const port = 4000

const app = new Application()

initRouter(app)

// Enable CORS for All Routes
app.use(oakCors())

// DB
await InitDatabase()

console.log(`Server up on http://localhost:${port}!`)
await app.listen({ port })
