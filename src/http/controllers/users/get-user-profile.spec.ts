import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import {afterAll, beforeAll, describe, expect, it} from "vitest"

describe('Get User Profile (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able get any user profile by id', async () => {

      const { token, userId } = await createAndAuthenticateUser(app)

    const getUserProfileResponse = await request(app.server)
    .get(`/user/${userId}`)
    .set('Authorization', `Bearer ${token}`)
    .send()

    expect(getUserProfileResponse.status).toBe(200)
    expect(getUserProfileResponse.body).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com'
      })
    )
  })

})