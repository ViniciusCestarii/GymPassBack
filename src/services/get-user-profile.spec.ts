import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"
import { GetUserProfileService } from "./get-user-profile"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

// Unit test

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(inMemoryUsersRepository) //system under test
  })

  it('should be able get user profile', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong user id', async () => {
    await expect(() => sut.execute({
      userId: 'non-existing-user-id',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)

  })
})