// deno-lint-ignore-file no-explicit-any
import { Response } from 'https://deno.land/x/oak/mod.ts'

export function fail(
  res: Response,
  errorData: Record<string, any>,
  status = 500,
) {
  res.body = {
    result: false,
    ...errorData,
  }
  res.status = status
}

export function failError(res: Response, error: Error, status = 500) {
  res.body = {
    result: false,
    error: error.message,
  }
  res.status = status
}

export function succeed(res: Response, data?: Record<string, any>) {
  res.body = {
    result: true,
    ...data,
  }
}
