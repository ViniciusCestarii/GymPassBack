import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import {afterAll, beforeAll, describe, expect, it} from "vitest"

describe('Get User Check-in History (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able fetch a user check-in history', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const createGymResponse = await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'gym name',
      description: 'some description',
      phone: '123456789',
      latitude: -26.915317678467627,
      longitude: -49.06231187043944,
    })

    const createCheckInReponse1 = await request(app.server)
    .post(`/gyms/${createGymResponse.body.id}/check-ins`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      latitude: -26.915317678467627,
      longitude: -49.06231187043944,
    })

    const historyReponse = await request(app.server)
    .get('/check-ins/history')
    .query({
      page: 1,
    })
    .set('Authorization', `Bearer ${token}`)
    .send()
    
    expect(historyReponse.status).toBe(200)
    expect(historyReponse.body.checkIns).toHaveLength(1)
    expect(historyReponse.body.checkIns).toEqual([
      expect.objectContaining({
        id: createCheckInReponse1.body.id,
      }),
    ])
  })
})