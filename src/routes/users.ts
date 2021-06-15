import { Router } from 'https://deno.land/x/oak@v7.5.0/mod.ts'
import { signIn, signOut } from '../modules/auth/auth.lib.ts'
import { createUser, emailExists } from '../modules/user/user.lib.ts'
import { User } from '../modules/user/user.model.ts'
import { failError, succeed } from '../utils/api.ts'

const router = new Router()

router.get('/', ({ response }) => {
  // TODO 작업필요...

  response.body = { result: 10 }
})

// Create
router.post('/', async ({ request, response }) => {
  try {
    const data = await request.body().value

    const user = await createUser(data)
    const userData: Pick<User, 'id' | 'email' | 'name'> = {
      id: user?.id as number,
      email: user?.email as string,
      name: user?.name as string,
    }

    succeed(response, { userData })
  } catch (err) {
    failError(response, err)
  }
  //
})

// Check
router.post('/check-email', async ({ request, response }) => {
  try {
    const { email } = await request.body().value

    const exist = await emailExists(email)

    // const user = new User()
    // await user.save()
    succeed(response, { exist })
  } catch (err) {
    failError(response, err, 200)
  }
})

router.post('/signin', async ({ request, response }) => {
  try {
    const { email, pw } = await request.body().value

    const result = await signIn(email, pw)

    succeed(response, { ...result })
  } catch (err) {
    failError(response, err, 200)
  }
})

router.post('/signout', async ({ request, response }) => {
  try {
    // 로그아웃을 위한 처리 (사실은 이 프로젝트에서는 의미 없음)
    // const { email, pw } = await request.body().value

    // console.log('signout ::', request.headers.get('Authorization'))

    await signOut()

    succeed(response)
  } catch (err) {
    failError(response, err, 200)
  }
})

export default router
