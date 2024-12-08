import { test, assert } from 'vitest'
import { sendEmail } from './email-client'

test.skip('Test sendEmail', async () => {
  const r = await sendEmail({
    from: 'noreply@devcamper.io',
    to: 'aswin@gmail.com',
    subject: 'test',
    text: 'example email',
  })

  assert.equal(r.accepted.length, 1)
})
