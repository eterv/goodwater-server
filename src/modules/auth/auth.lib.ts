// deno-lint-ignore-file no-explicit-any
import {
  create,
  getNumericDate,
  verify,
} from 'https://deno.land/x/djwt@v2.2/mod.ts'
import { Cookies, Response } from 'https://deno.land/x/oak@v7.5.0/mod.ts'
import { findUserByEmail, matchPassword } from '../user/user.lib.ts'
import { JwtUser, User, UserModel } from '../user/user.model.ts'

const AUTH_TOKEN = 'at01'
export const MAX_AGE = 60 * 60 * 6 // 6 hours

export const jwtSecret =
  'e044cce8ab8f67a4b098f2a411ad7fe944def4607de51015a3bab047808910fc'

export async function checkAuth(
  email: string,
  pw: string,
): Promise<User | null> {
  const user = await findUserByEmail(email)
  if (!user) return null

  const isPwMatched = await matchPassword(pw, user.pw as string)
  if (!isPwMatched) return null

  return { ...user } as any
}

export async function checkAuthToken(
  cookies: Cookies,
): Promise<JwtUser | null> {
  const token = cookies.get(AUTH_TOKEN)
  if (!token) return null

  try {
    return await verify(token, jwtSecret, 'HS256') as any
  } catch {
    return null
  }
}

export async function generateAuthToken(user: User): Promise<string> {
  return await create({
    alg: 'HS256',
    typ: 'JWT',
  }, {
    exp: getNumericDate(MAX_AGE),

    id: user.id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
  }, jwtSecret)
}

export async function getCurrentUser(
  cookies: Cookies,
): Promise<User | null> {
  const jwtUser = await checkAuthToken(cookies)
  if (!jwtUser) return null

  return {
    id: jwtUser.id,
    email: jwtUser.email,
    name: jwtUser.name,
    isAdmin: jwtUser.isAdmin,
  }
}

export function removeAuthTokenCookie(cookies: Cookies): void {
  cookies.delete(AUTH_TOKEN)
}

export function setAuthTokenCookie(cookies: Cookies, token: string): void {
  cookies.set(AUTH_TOKEN, token, {
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    maxAge: MAX_AGE,
    sameSite: 'lax',
  })
}

export async function signIn(email: string, pw: string) {
  // 아이디, 비밀번호가 일치하는 유저를 찾는다
  const user = await checkAuth(email, pw)

  // N 회사 예시 :: 가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.
  if (!user) throw new Error('잘못된 아이디 또는 비밀번호입니다')

  // JWT 토큰 생성
  const token = await generateAuthToken(user)
  // setAuthTokenCookie(cookies, token)

  return {
    token,
    user: {
      email: user.email,
      isAdmin: user.isAdmin,
    },
  }
}

export async function signOut(): Promise<boolean> {
  return await true
}
