import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import {afterAll, beforeAll, describe, expect, it} from "vitest"

describe('Search Gym (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able search gyms by name', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'gym name',
      description: 'some description',
      phone: '123456789',
      latitude: -26.915317678467627,
      longitude: -49.06231187043944,
    })
    
    await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'wont appear',
      description: 'some description',
      phone: '123456789',
      latitude: -26.915317678467627,
      longitude: -49.06231187043944,
    })

    await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'i wont be find',
      description: 'some description',
      phone: '123456789',
      latitude: -26.915317678467627,
      longitude: -49.06231187043944,
    })
    
    const searchGymReponse = await request(app.server)
    .get('/gyms/search')
    .query({
      q: 'gym na'
    })
    .set('Authorization', `Bearer ${token}`)
    .send()
    
    expect(searchGymReponse.status).toBe(200)
    expect(searchGymReponse.body.gyms).toHaveLength(1)
    expect(searchGymReponse.body.gyms).toEqual([
      expect.objectContaining({
        name: 'gym name'
      }),
    ])
  })
})