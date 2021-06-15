import {
  Database,
  SQLite3Connector,
} from 'https://deno.land/x/denodb@v1.0.38/mod.ts'
import { ContactModel } from './modules/contact/contact.model.ts'
import { UserModel } from './modules/user/user.model.ts'

export async function InitDatabase() {
  const conn = new SQLite3Connector({
    filepath: './data.db',
  })

  const db = new Database(conn)

  db.link([ContactModel, UserModel])
  await db.sync()

  console.log('Database Connected!')

  return db
}
