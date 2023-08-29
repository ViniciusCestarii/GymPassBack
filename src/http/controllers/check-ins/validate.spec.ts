import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import {afterAll, beforeAll, describe, expect, it} from "vitest"

describe('Validate Check-in (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able validate a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

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

    const createCheckInReponse = await request(app.server)
    .post(`/gyms/${createGymResponse.body.id}/check-ins`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      latitude: -26.915317678467627,
      longitude: -49.06231187043944,
    })

    const validateCheckInReponse = await request(app.server)
      .patch(`/check-in/${createCheckInReponse.body.id}/validate`)
      .set('Authorization', `Bearer ${token}`)

      const checkIn = await prisma.checkIn.findUniqueOrThrow({
        where: {
          id: createCheckInReponse.body.id
        }
      })
    
    expect(validateCheckInReponse.status).toBe(204)
    expect(checkIn.validatedAt).toEqual(expect.any(Date))
  })
})