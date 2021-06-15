import { Router } from 'https://deno.land/x/oak@v7.5.0/mod.ts'
import {
  countAll,
  createContact,
  list,
} from '../modules/contact/contact.lib.ts'
import { Contact } from '../modules/contact/contact.model.ts'
import { failError, succeed } from '../utils/api.ts'

const router = new Router()

// Get List
router.get('/', async ({ request, response }) => {
  try {
    const params = request.url.searchParams
    const page = parseInt(params.get('page') ?? '1', 10)
    const limit = parseInt(params.get('limit') ?? '15', 10)

    const count = await countAll()
    const contacts = count ? await list(page, limit) : []
    succeed(response, { list: contacts, count })
  } catch (err) {
    failError(response, err)
  }
})

// Create
router.post('/', async ({ request, response }) => {
  try {
    const data = await request.body().value as Contact
    data.ip = request.ip

    const contact = await createContact(data)
    const contactData: Pick<Contact, 'id' | 'email' | 'name'> = {
      id: contact?.id as number,
      name: contact?.name as string,
      email: contact?.email as string,
    }

    succeed(response, { contact: contactData })
  } catch (err) {
    failError(response, err)
  }
  //
})

export default router
