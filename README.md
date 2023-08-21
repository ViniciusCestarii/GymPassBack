# App

GymPass style app.

## Rfs (Requsito funcionais) (funcionalidade)

- [ ] Hable to sign in

- [ ] Hable to log in

- [ ] Hable to get user perfil

- [ ] Hable to get the number of check-ins of the user

- [ ] Hable to user get theit check-ins historic

- [ ] Hable to user search for near gyms

- [ ] Hable to user search gyms for name

- [ ] Hable to user check-in in a gym

- [ ] Hable to validate user gym check-in

- [ ] Hable to sign in gyms

## RNs (Regras de negócio) (condições ao requisito funcional)

- [ ] User can't be hable to sign in with a duplicated e-mail

- [ ] User can't be able to check-in 2 times in the same day

- [ ] User can't be able to check-in if they aren't near a gym (100m)

- [ ] User check-in can only be validated 20 minutes later it had been created

- [ ] User check-in can only be validated by admin

- [ ] Gyms can only be signed in by admin

## RNFs (Requisitos não-funcionais) (técnico)

- [ ] User password needs to be encrypted

- [ ] Application data needs to be in a PostgreSQL bank

- [ ] All the data lists need to be paginated with 20 itens per page

- [ ] User needs to be indentified by a JWT