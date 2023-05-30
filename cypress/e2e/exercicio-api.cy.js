import contrato from '../contracts/usuarios.contracts'

describe('Testes da Funcionalidade Usuários', () => {

    it('Deve validar contrato de usuários', () => {
        cy.request('usuarios').then((response) => {
            return contrato.validateAsync(response.body)
        })
    });

    it('Deve listar usuários cadastrados', () => {
        cy.request('usuarios').then((response) => {
            expect(response.status).to.equal(200)
        })
    });

    it('Deve cadastrar um usuário com sucesso', () => {

        let usuario = `Usuario Teste ${Math.floor(Math.random() * 1000)}`
        let email = `email_teste${Math.floor(Math.random() * 1000)}@ebac.com`

        cy.cadastrarUsuario(usuario, email, "teste1", "false").then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });

    it('Deve validar um usuário com email inválido', () => {
        let usuario = `Usuario Teste ${Math.floor(Math.random() * 50)}`

        cy.cadastrarUsuario(usuario, "marcelo_teste@ebac.com", "teste1", "false").then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal('Este email já está sendo usado')
        })
    });

    it('Deve editar um usuário previamente cadastrado', () => {
        let produto = `Usuario Teste ${Math.floor(Math.random() * 50)}`
        let email = `email_teste${Math.floor(Math.random() * 1000)}@ebac.com`
        let senha = `teste${Math.floor(Math.random() * 50)}`

        cy.cadastrarUsuario(produto, email, senha, "false").then((response) => {
            let id = response.body._id
            let email = `email_teste${Math.floor(Math.random() * 1000)}@ebac.com`

            cy.request({
                method: 'PUT',
                url: `usuarios/${id}`,
                body: {
                    "nome": produto,
                    "email": email,
                    "password": senha,
                    "administrador": "false"
                }
            }).then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal('Registro alterado com sucesso')
            })
        })
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
        let produto = `Usuario Teste ${Math.floor(Math.random() * 50)}`
        let email = `email_teste${Math.floor(Math.random() * 1000)}@ebac.com`
        let senha = `teste${Math.floor(Math.random() * 50)}`

        cy.cadastrarUsuario(produto, email, senha, "false").then((response) => {
            let id = response.body._id

            cy.request({
                method: 'DELETE',
                url: `usuarios/${id}`
            }).then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal('Registro excluído com sucesso')
            })
        })
    });


});