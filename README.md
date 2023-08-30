# Set up

docker compose up -d

# App

Server of a GymPass style app.

## Functional requirement Rfs (Requsito funcionais) (funcionalidade)

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
