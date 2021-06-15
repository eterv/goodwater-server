import { Application, Router } from 'https://deno.land/x/oak@v7.5.0/mod.ts'
import contactsRoutes from './contacts.ts'
import usersRoutes from './users.ts'

export function initRouter(app: Application) {
  const router = new Router()

  router.get('/', (ctx) => {
    ctx.response.body = 'Hello 안녕!~'
  })

  router.use('/api/contacts', contactsRoutes.routes())
  router.use('/api/users', usersRoutes.routes())

  app.use(router.routes())
  app.use(router.allowedMethods())
}
