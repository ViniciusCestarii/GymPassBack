import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import {afterAll, beforeAll, describe, expect, it} from "vitest"

describe('Fetch Nearby Gyms (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able fetch nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'first nearby gym',
      description: 'some description',
      phone: '123456789',
      latitude: -27.078174940553247,
      longitude: -48.93295612147477,
    })

    await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'second nearby gym',
      description: 'some description',
      phone: '123456789',
      latitude: -27.078174940553246,
      longitude: -48.93295612147472,
    })

    await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'far gym',
      description: 'some description',
      phone: '123456789',
      latitude: -24.078174940553246,
      longitude: -49.93295612147472,
    })

    const profileResponse = await request(app.server)
    .get('/gyms/nearby')
    .query({
      latitude: -27.078174940553247, 
      longitude: -48.93295612147477
    })
    .set('Authorization', `Bearer ${token}`)
    .send()
    
    expect(profileResponse.status).toBe(200)
    expect(profileResponse.body.gymsWithDistance).toHaveLength(2)
    expect(profileResponse.body.gymsWithDistance).toEqual([
      expect.objectContaining({ gym: expect.objectContaining({ name: 'first nearby gym' })}),
      expect.objectContaining({ gym: expect.objectContaining({ name: 'second nearby gym' })}),
    ])
  })

})