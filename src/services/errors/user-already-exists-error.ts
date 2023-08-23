export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User with same e-mail already exists');
  }
}