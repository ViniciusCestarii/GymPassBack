import { expect, describe, it } from "vitest"
import { RegisterService } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

// Unit test

describe('Register Service', () => {
  it('should be able to register', async () => {
    const nMemoryUsersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(nMemoryUsersRepository)

    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const nMemoryUsersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(nMemoryUsersRepository)

    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.passwordHash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const nMemoryUsersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(nMemoryUsersRepository)

    const email = 'johndoe@example.com'

    await registerService.execute({
      name: 'John Doe',
      email: email,
      password: '123456',
    })

    await expect(async () => {
      await registerService.execute({
        name: 'John Doe',
        email: email,
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)

  })
})