// deno-lint-ignore-file no-explicit-any
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts'
import { User, UserModel } from './user.model.ts'

export async function emailExists(email: string): Promise<boolean> {
  return await UserModel.where('email', email).count() > 0
}

export async function createUser(data: User): Promise<UserModel | null> {
  const user = new UserModel()
  ;(['email', 'pw', 'name', 'tel'] as Array<keyof User>).forEach(
    (key) => {
      user[key] = data[key] as any
    },
  )
  const email = user.email as string
  if (await emailExists(email)) return null

  user.pw = await passwordToHash(user.pw as string)

  await user.save()

  return await findUserByEmail(email)
}

export async function findUserByEmail(email: string): Promise<UserModel> {
  return await UserModel.where('email', email).first()
}

export async function matchPassword(
  pw: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(pw, hash)
}

export async function passwordToHash(
  pw: string,
): Promise<string> {
  return await bcrypt.hash(pw)
}
