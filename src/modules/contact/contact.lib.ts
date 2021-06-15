// deno-lint-ignore-file no-explicit-any
import { Contact, ContactModel } from './contact.model.ts'

export async function countAll(): Promise<number> {
  return await ContactModel.count()
}

export async function list(page: number, limit = 10): Promise<Contact[]> {
  const offset = (page - 1) * limit
  const _list = await ContactModel.offset(offset).limit(limit).orderBy(
    'id',
    'desc',
  ).all()

  return _list.map((v) => {
    return {
      id: v.id as number,
      name: v.name as string,
      email: v.email as string,
      tel: v.tel as string,
      ip: v.ip as string,
      // createdAt: v.createdAt as string,
      dtCreated: Date.parse(v.createdAt as string),
    }
  })
}

export async function createContact(
  data: Contact,
): Promise<ContactModel | null> {
  const result = await ContactModel.create(data as any)

  if (!result.lastInsertId) {
    return null
  }

  return await ContactModel.find(result.lastInsertId as string)
}
