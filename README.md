# API de Gerenciamento de Estoque e Vendas

Esta é uma API RESTful desenvolvida para gerenciar operações básicas em um sistema de estoque e sales, utilizando o banco de dados MySQL para a gestão de dados. Através desta API, é possível realizar operações de Criação, Leitura, Atualização e Exclusão (CRUD) tanto para produtos em estoque quanto para vendas.
## Funcionalidades

- **Produtos:**
    - Adicionar um novo produto
    - Ler detalhes de um produto
    - Atualizar informações de um produto
    - Excluir um produto

- **Vendas:**
    - Registrar uma nova venda
    - Ler detalhes de uma venda
    - Atualizar informações de uma venda
    - Excluir uma venda

## Requisitos e Padrões

- Todos os endpoints devem seguir as práticas RESTful.
- Recursos não encontrados devem retornar o status HTTP adequado com a mensagem `{ message: '<recurso> não encontrado' }`.
- Erros devem ser tratados de forma consistente, retornando o status HTTP apropriado e um objeto `{ err: { message: <mensagem de erro>, code: <código do erro> } }`.
- O código de erro deve ser consistente em toda a aplicação e seguir um padrão estabelecido (exemplo: 'not_found', 'invalid_data').
- Para erros que requerem dados adicionais, utilizar a propriedade `data` dentro do objeto `err`.
- Utilizar middlewares e objetos de erro personalizados para evitar repetição de lógica de tratamento de erro.
- Utilizar bibliotecas como Joi ou Express Validator para validação de dados.
- Consultar sites como httpstatuses.com ou a documentação MDN para determinar os status HTTP adequados.

## Endpoints

### Produtos

#### GET /products/:id
Retorna detalhes de um produto específico.

##### Parâmetros
- `id` (string): ID único do produto a ser recuperado.

##### Respostas
- 200 OK: Produto encontrado. Corpo da resposta contém detalhes do produto.
- 404 Not Found: Produto não encontrado. Corpo da resposta contém `{ message: 'Produto não encontrado' }`.
- Outros códigos de erro: Ver seção de Requisitos e Padrões.

#### POST /products
Adiciona um novo produto ao estoque.

##### Corpo da Requisição
```json
{
    "nome": "Nome do Produto",
    "descricao": "Descrição do Produto",
    "preco": 9.99,
    "quantidade": 10
}
```

##### Respostas
- 201 Created: Produto criado com sucesso. Corpo da resposta contém detalhes do produto criado.
- Outros códigos de erro: Ver seção de Requisitos e Padrões.

#### PUT /products/:id
Atualiza as informações de um produto existente.

##### Parâmetros
- `id` (string): ID único do produto a ser atualizado.

##### Corpo da Requisição
```json
{
    "nome": "Novo Nome do Produto",
    "descricao": "Nova Descrição do Produto",
    "preco": 19.99,
    "quantidade": 20
}
```

##### Respostas
- 200 OK: Produto atualizado com sucesso. Corpo da resposta contém detalhes do produto atualizado.
- 404 Not Found: Produto não encontrado. Corpo da resposta contém `{ message: 'Produto não encontrado' }`.
- Outros códigos de erro: Ver seção de Requisitos e Padrões.

#### DELETE /products/:id
Exclui um produto do estoque.

##### Parâmetros
- `id` (string): ID único do produto a ser excluído.

##### Respostas
- 204 No Content: Produto excluído com sucesso.
- 404 Not Found: Produto não encontrado. Corpo da resposta contém `{ message: 'Produto não encontrado' }`.
- Outros códigos de erro: Ver seção de Requisitos e Padrões.

### Vendas

#### GET /sales/:id
Retorna detalhes de uma venda específica.

##### Parâmetros
- `id` (string): ID único da venda a ser recuperada.

##### Respostas
- 200 OK: Venda encontrada. Corpo da resposta contém detalhes da venda.
- 404 Not Found: Venda não encontrada. Corpo da resposta contém `{ message: 'Venda não encontrada' }`.
- Outros códigos de erro: Ver seção de Requisitos e Padrões.

#### POST /sales
Registra uma nova venda.

##### Corpo da Requisição
```json
{
    "produto_id": "ID do Produto",
    "quantidade": 2
}
```

##### Respostas
- 201 Created: Venda registrada com sucesso. Corpo da resposta contém detalhes da venda registrada.
- Outros códigos de erro: Ver seção de Requisitos e Padrões.

#### PUT /sales/:id
Atualiza as informações de uma venda existente.

##### Parâmetros
- `id` (string): ID único da venda a ser atualizada.

##### Corpo da Requisição
```json
{
    "quantidade": 3
}
```

##### Respostas
- 200 OK: Venda atualizada com sucesso. Corpo da resposta contém detalhes da venda atualizada.
- 404 Not Found: Venda não encontrada. Corpo da resposta contém `{ message: 'Venda não encontrada' }`.
- Outros códigos de erro: Ver seção de Requisitos e Padrões.

#### DELETE /sales/:id
Exclui uma venda registrada.

##### Parâmetros
- `id` (string): ID único da venda a ser excluída.

##### Respostas
- 204 No Content: Venda excluída com sucesso.
- 404 Not Found: Venda não encontrada. Corpo da resposta contém `{ message: 'Venda não encontrada' }`.
- Outros códigos de erro: Ver seção de Requisitos e Padrões.

## Considerações Finais

Esta documentação fornece uma visão geral dos endpoints disponíveis e das funcionalidades da API. Certifique-se de consultar as respostas e parâmetros específicos de cada endpoint para utilização correta da API. Para mais informações sobre como utilizar a API, consulte a documentação detalhada ou contate o desenvolvedor.

##LUCAS DIELLO!
