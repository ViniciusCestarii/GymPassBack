import { app } from "@/app";
import request from "supertest";
import {afterAll, beforeAll, describe, expect, it} from "vitest"

describe('Refresh (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a user token', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
      })

      const authResponse = await request(app.server)
      .post('/sessions')
      .send({
        email: 'johndoe@example.com',
        password: '123456'
      })

      const cookies = authResponse.get('set-cookie')

      const refreshReponse = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

      expect(refreshReponse.status).toBe(200)
      expect(refreshReponse.body.token).toEqual(expect.any(String))
      expect(refreshReponse.get('Set-Cookie')).toEqual([
        expect.stringContaining('refreshToken='),
      ])
  })

})