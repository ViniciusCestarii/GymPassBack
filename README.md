# Gym Pass 🏋️

## ❓ What's Gym Pass

 Gym Pass is an application that enables users to conveniently check in to registered gyms using their mobile phones. The check-in process is validated by the respective gym to ensure accuracy and security. Furthermore, users have the option to search for nearby gyms, view the number of check-ins to stay motivated. Gyms interested in joining the platform simply need to sign up.

This project is the Server Side of Gym Pass containing:

- API for all the entities of the application
- End to end and unitary tests
- Auth using JWT token
- SOLID principles
- Business rules

## 👨‍💻 What makes up Gym Pass

FindAFriend Back was made using:

- **Node.js:** JavaScript runtime for server-side execution.
- **Fastify:** Lightweight web framework for efficient API development.
- **Vite:** Used for end-to-end (e2e) and unit testing in the project.
- **Prisma:** Node.js and TypeScript ORM for simplified database interaction.
- **Docker:** Container platform for streamlined application packaging and deployment.

## 💻 How to install in your machine

Required to install and setup:
- Git
- Node.js
- Docker

1. install the above dependecies
2. clone this repository in your machine using: `git clone https://github.com/ViniciusCestarii/GymPassBack.git`
3. in root of the project run: `npm i`
4. in root of the project create a .env file and add this:
   ```
   DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"
   NODE_ENV=dev
   JWT_SECRET=supersecret
   ```
5. install bitnami/postgresql image and create new container using:
   ```
   docker run --name apisolid -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
   ```
   or using:
   ```
   docker compose up -d
   ```
7. in root of the project run: `npm run prisma migrate dev`
8. in root of the project run: `npm run dev`
9. now your server is running on default port 3333, just acess localhost: http://localhost:3333 and enjoy!

### For development i made some extra commands:
- test end to end
`npm run test:e2e`

- unitary test
`npm run test`

5123r52we3rfwq 
## ✅ Requirements and Business Rules met

- [x] Able to register

- [x] Able to authenticate

- [x] Able to get user perfil

- [x] Able to get the number of check-ins of the user

- [x] Able to user get user check-ins historic

- [x] Able to user search for near gyms

- [x] Able to user search gyms for name

- [x] Able to user check-in in a gym

- [x] Able to validate user gym check-in

- [x] Able to register gyms

## Business rules RNs (Regras de negócio) (condições ao requisito funcional)

- [x] User can't be hable to register with a duplicated e-mail

- [x] User can't be able to check-in twice in the same day

- [x] User can't be able to check-in if they aren't near a gym (100m)

- [x] User check-in can only be validated until 20 minutes after it had been created

- [x] User check-in can only be validated by admin

- [x] Gyms can only be registered in by admin

## Non-functional requirement RNFs (Requisitos não-funcionais) (técnico)

- [x] User password needs to be encrypted

- [x] Application data needs to be in a PostgreSQL bank

- [x] All the data lists need to be paginated with 20 itens per page

- [x] User needs to be indentified by a JWT
