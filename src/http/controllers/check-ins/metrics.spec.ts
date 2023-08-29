import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import {afterAll, beforeAll, describe, expect, it} from "vitest"

describe('Get User Check-in Metrics (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the total number of check-ins', async () => {
    const { token, userId } = await createAndAuthenticateUser(app, true)

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

    await prisma.checkIn.createMany({
      data: [
        {
          gymId: createGymResponse.body.id,
          userId: userId,
        },
        {
          gymId: createGymResponse.body.id,
          userId: userId,
        }
      ]
    })

    const historyReponse = await request(app.server)
    .get('/check-in/metrics')
    .set('Authorization', `Bearer ${token}`)
    .send()
    
    expect(historyReponse.status).toBe(200)
    expect(historyReponse.body.checkInsCount).toEqual(2)
  })
})