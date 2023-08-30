# Set up

docker compose up -d

# App

Server of a GymPass style app.

## Functional requirement Rfs (Requsito funcionais) (funcionalidade)

- [x] Hable to register

- [x] Hable to authenticate

- [x] Hable to get user perfil

- [x] Hable to get the number of check-ins of the user

- [x] Hable to user get user check-ins historic

- [x] Hable to user search for near gyms

- [x] Hable to user search gyms for name

- [x] Hable to user check-in in a gym

- [x] Hable to validate user gym check-in

- [x] Hable to register gyms

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