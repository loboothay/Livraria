import { SwaggerOptions } from 'swagger-ui-express';

export const swaggerDocument: SwaggerOptions = {
  openapi: '3.0.0',
  info: {
    title: 'API da Livraria',
    description: 'Documentação da API do sistema de Livraria',
    version: '1.0.0',
    contact: {
      email: 'contato@livraria.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor de Desenvolvimento'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Loan: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid'
          },
          user: {
            $ref: '#/components/schemas/UserProfile'
          },
          book: {
            $ref: '#/components/schemas/Book'
          },
          loanDate: {
            type: 'string',
            format: 'date-time'
          },
          expectedReturnDate: {
            type: 'string',
            format: 'date-time'
          },
          actualReturnDate: {
            type: 'string',
            format: 'date-time',
            nullable: true
          },
          isReturned: {
            type: 'boolean',
            default: false
          },
          isOverdue: {
            type: 'boolean',
            default: false
          },
          reminderSent: {
            type: 'boolean',
            default: false
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          },
          isActive: {
            type: 'boolean',
            default: true
          }
        }
      },
      LoanCreate: {
        type: 'object',
        properties: {
          bookId: {
            type: 'string',
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000'
          },
          expectedReturnDate: {
            type: 'string',
            format: 'date-time',
            example: '2024-02-01T00:00:00.000Z'
          }
        },
        required: ['bookId', 'expectedReturnDate']
      },
      Book: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid'
          },
          title: {
            type: 'string',
            example: 'O Senhor dos Anéis'
          },
          author: {
            type: 'string',
            example: 'J.R.R. Tolkien'
          },
          isbn: {
            type: 'string',
            example: '9788533613379'
          },
          description: {
            type: 'string',
            example: 'Uma jornada épica através da Terra-média'
          },
          imageUrl: {
            type: 'string',
            format: 'uri',
            example: 'https://exemplo.com/imagem.jpg'
          },
          quantity: {
            type: 'integer',
            example: 10
          },
          availableQuantity: {
            type: 'integer',
            example: 8
          },
          category: {
            $ref: '#/components/schemas/Category'
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      },
      BookCreate: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            example: 'O Senhor dos Anéis'
          },
          author: {
            type: 'string',
            example: 'J.R.R. Tolkien'
          },
          isbn: {
            type: 'string',
            example: '9788533613379'
          },
          description: {
            type: 'string',
            example: 'Uma jornada épica através da Terra-média'
          },
          imageUrl: {
            type: 'string',
            format: 'uri',
            example: 'https://exemplo.com/imagem.jpg'
          },
          quantity: {
            type: 'integer',
            example: 10
          },
          categoryId: {
            type: 'string',
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000'
          }
        },
        required: ['title', 'author', 'isbn', 'quantity', 'categoryId']
      },
      BookUpdate: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            example: 'O Senhor dos Anéis - Edição Atualizada'
          },
          author: {
            type: 'string',
            example: 'J.R.R. Tolkien'
          },
          description: {
            type: 'string',
            example: 'Descrição atualizada do livro'
          },
          imageUrl: {
            type: 'string',
            format: 'uri',
            example: 'https://exemplo.com/nova-imagem.jpg'
          },
          quantity: {
            type: 'integer',
            example: 15
          },
          categoryId: {
            type: 'string',
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000'
          }
        }
      },
      Category: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid'
          },
          name: {
            type: 'string',
            example: 'Ficção Científica'
          },
          description: {
            type: 'string',
            example: 'Livros do gênero de ficção científica'
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      },
      CategoryCreate: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Ficção Científica'
          },
          description: {
            type: 'string',
            example: 'Livros do gênero de ficção científica'
          }
        },
        required: ['name']
      },
      CategoryUpdate: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Ficção Científica Atualizada'
          },
          description: {
            type: 'string',
            example: 'Descrição atualizada da categoria'
          }
        }
      },
      UserRegister: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'João Silva'
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'joao@email.com'
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'senha123'
          }
        },
        required: ['name', 'email', 'password']
      },
      UserLogin: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'joao@email.com'
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'senha123'
          }
        },
        required: ['email', 'password']
      },
      UserProfile: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid'
          },
          name: {
            type: 'string'
          },
          email: {
            type: 'string',
            format: 'email'
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      },
      UserUpdate: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'João Silva Atualizado'
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'novaSenha123'
          }
        }
      },
      Review: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid'
          },
          content: {
            type: 'string',
            example: 'Excelente livro! A narrativa é envolvente.'
          },
          rating: {
            type: 'integer',
            minimum: 1,
            maximum: 5,
            example: 5
          },
          user: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                format: 'uuid'
              },
              name: {
                type: 'string'
              }
            }
          },
          book: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                format: 'uuid'
              },
              title: {
                type: 'string'
              }
            }
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          },
          isActive: {
            type: 'boolean'
          }
        }
      },
      ReviewCreate: {
        type: 'object',
        properties: {
          bookId: {
            type: 'string',
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000'
          },
          content: {
            type: 'string',
            example: 'Excelente livro! A narrativa é envolvente.'
          },
          rating: {
            type: 'integer',
            minimum: 1,
            maximum: 5,
            example: 5
          }
        },
        required: ['bookId', 'content', 'rating']
      },
      ReviewUpdate: {
        type: 'object',
        properties: {
          content: {
            type: 'string',
            example: 'Atualizando minha avaliação: o livro é ainda melhor após uma segunda leitura!'
          },
          rating: {
            type: 'integer',
            minimum: 1,
            maximum: 5,
            example: 5
          }
        }
      }
    }
  },
  paths: {
    '/loans': {
      post: {
        tags: ['Empréstimos'],
        summary: 'Criar novo empréstimo',
        description: 'Cria um novo empréstimo de livro',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoanCreate'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Empréstimo criado com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Loan'
                }
              }
            }
          },
          '400': {
            description: 'Dados inválidos'
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          },
          '404': {
            description: 'Livro não encontrado'
          }
        }
      },
      get: {
        tags: ['Empréstimos'],
        summary: 'Listar empréstimos',
        description: 'Retorna a lista de todos os empréstimos ativos',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Lista de empréstimos',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Loan'
                  }
                }
              }
            }
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          }
        }
      }
    },
    '/reviews': {
      post: {
        tags: ['Avaliações'],
        summary: 'Criar nova avaliação',
        description: 'Cria uma nova avaliação para um livro',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ReviewCreate'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Avaliação criada com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Review'
                }
              }
            }
          },
          '400': {
            description: 'Dados inválidos'
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          }
        }
      },
      get: {
        tags: ['Avaliações'],
        summary: 'Listar avaliações',
        description: 'Retorna a lista de todas as avaliações ativas',
        parameters: [
          {
            name: 'bookId',
            in: 'query',
            description: 'ID do livro para filtrar avaliações',
            required: false,
            schema: {
              type: 'string',
              format: 'uuid'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Lista de avaliações',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Review'
                  }
                }
              }
            }
          },
          '400': {
            description: 'Erro ao listar avaliações'
          }
        }
      }
    },
    '/reviews/user': {
      get: {
        tags: ['Avaliações'],
        summary: 'Listar avaliações do usuário',
        description: 'Retorna todas as avaliações feitas pelo usuário autenticado',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Lista de avaliações do usuário',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Review'
                  }
                }
              }
            }
          },
          '400': {
            description: 'Erro ao buscar avaliações'
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          }
        }
      }
    },
    '/reviews/{id}': {
      put: {
        tags: ['Avaliações'],
        summary: 'Atualizar avaliação',
        description: 'Atualiza uma avaliação específica do usuário',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID da avaliação',
            schema: {
              type: 'string',
              format: 'uuid'
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ReviewUpdate'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Avaliação atualizada com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Review'
                }
              }
            }
          },
          '400': {
            description: 'Dados inválidos'
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          },
          '404': {
            description: 'Avaliação não encontrada ou não pertence ao usuário'
          }
        }
      },
      delete: {
        tags: ['Avaliações'],
        summary: 'Excluir avaliação',
        description: 'Marca como inativa uma avaliação específica do usuário',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID da avaliação',
            schema: {
              type: 'string',
              format: 'uuid'
            }
          }
        ],
        responses: {
          '204': {
            description: 'Avaliação excluída com sucesso'
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          },
          '404': {
            description: 'Avaliação não encontrada ou não pertence ao usuário'
          }
        }
      }
    },
    '/books': {
      post: {
        tags: ['Livros'],
        summary: 'Criar novo livro',
        description: 'Cria um novo livro no sistema',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BookCreate'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Livro criado com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Book'
                }
              }
            }
          },
          '400': {
            description: 'Dados inválidos ou ISBN já cadastrado'
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          }
        }
      },
      get: {
        tags: ['Livros'],
        summary: 'Listar livros',
        description: 'Retorna a lista de todos os livros ativos',
        parameters: [
          {
            name: 'search',
            in: 'query',
            description: 'Termo para buscar por título',
            required: false,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'category',
            in: 'query',
            description: 'ID da categoria para filtrar',
            required: false,
            schema: {
              type: 'string',
              format: 'uuid'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Lista de livros',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Book'
                  }
                }
              }
            }
          },
          '400': {
            description: 'Erro ao listar livros'
          }
        }
      }
    },
    '/books/{id}': {
      get: {
        tags: ['Livros'],
        summary: 'Obter livro por ID',
        description: 'Retorna os detalhes de um livro específico',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID do livro',
            schema: {
              type: 'string',
              format: 'uuid'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Detalhes do livro',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Book'
                }
              }
            }
          },
          '404': {
            description: 'Livro não encontrado'
          }
        }
      },
      put: {
        tags: ['Livros'],
        summary: 'Atualizar livro',
        description: 'Atualiza os dados de um livro específico',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID do livro',
            schema: {
              type: 'string',
              format: 'uuid'
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BookUpdate'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Livro atualizado com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Book'
                }
              }
            }
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          },
          '404': {
            description: 'Livro não encontrado'
          }
        }
      },
      delete: {
        tags: ['Livros'],
        summary: 'Excluir livro',
        description: 'Marca um livro como inativo no sistema',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID do livro',
            schema: {
              type: 'string',
              format: 'uuid'
            }
          }
        ],
        responses: {
          '204': {
            description: 'Livro excluído com sucesso'
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          },
          '404': {
            description: 'Livro não encontrado'
          }
        }
      }
    },
    '/health': {
      get: {
        tags: ['Sistema'],
        summary: 'Verificar status da API',
        description: 'Endpoint para verificar se a API está funcionando corretamente',
        responses: {
          '200': {
            description: 'API funcionando normalmente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'API está funcionando!'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/users/register': {
      post: {
        tags: ['Usuários'],
        summary: 'Registrar novo usuário',
        description: 'Cria uma nova conta de usuário no sistema',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserRegister'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Usuário criado com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserProfile'
                }
              }
            }
          },
          '400': {
            description: 'Dados inválidos ou e-mail já cadastrado'
          }
        }
      }
    },
    '/users/login': {
      post: {
        tags: ['Usuários'],
        summary: 'Login de usuário',
        description: 'Autenticação de usuário para obter token de acesso',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserLogin'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Login realizado com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: {
                      type: 'string',
                      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                    },
                    user: {
                      $ref: '#/components/schemas/UserProfile'
                    }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Credenciais inválidas'
          }
        }
      }
    },
    '/users/profile': {
      get: {
        tags: ['Usuários'],
        summary: 'Obter perfil do usuário',
        description: 'Retorna os dados do perfil do usuário autenticado',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Dados do perfil',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserProfile'
                }
              }
            }
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          }
        }
      },
      put: {
        tags: ['Usuários'],
        summary: 'Atualizar perfil do usuário',
        description: 'Atualiza os dados do perfil do usuário autenticado',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserUpdate'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Perfil atualizado com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserProfile'
                }
              }
            }
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          }
        }
      },
      delete: {
        tags: ['Usuários'],
        summary: 'Excluir conta do usuário',
        description: 'Remove permanentemente a conta do usuário autenticado',
        security: [{ bearerAuth: [] }],
        responses: {
          '204': {
            description: 'Conta excluída com sucesso'
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          }
        }
      }
    },
    '/users/favorites': {
      post: {
        tags: ['Usuários'],
        summary: 'Adicionar livro aos favoritos',
        description: 'Adiciona um livro à lista de favoritos do usuário',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  bookId: {
                    type: 'string',
                    format: 'uuid',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                  }
                },
                required: ['bookId']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Livro adicionado aos favoritos com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Livro adicionado aos favoritos'
                    }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          },
          '404': {
            description: 'Livro não encontrado'
          }
        }
      }
    },
    '/users/favorites/{bookId}': {
      delete: {
        tags: ['Usuários'],
        summary: 'Remover livro dos favoritos',
        description: 'Remove um livro da lista de favoritos do usuário',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'bookId',
            in: 'path',
            required: true,
            description: 'ID do livro a ser removido dos favoritos',
            schema: {
              type: 'string',
              format: 'uuid'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Livro removido dos favoritos com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Livro removido dos favoritos'
                    }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          },
          '404': {
            description: 'Livro não encontrado nos favoritos'
          }
        }
      }
    },
    '/categories': {
      post: {
        tags: ['Categorias'],
        summary: 'Criar nova categoria',
        description: 'Cria uma nova categoria de livros no sistema',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CategoryCreate'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Categoria criada com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Category'
                }
              }
            }
          },
          '400': {
            description: 'Dados inválidos'
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          }
        }
      },
      get: {
        tags: ['Categorias'],
        summary: 'Listar todas as categorias',
        description: 'Retorna a lista de todas as categorias cadastradas',
        responses: {
          '200': {
            description: 'Lista de categorias recuperada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Category'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/categories/{id}': {
      get: {
        tags: ['Categorias'],
        summary: 'Buscar categoria por ID',
        description: 'Retorna os dados de uma categoria específica',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID da categoria',
            schema: {
              type: 'string',
              format: 'uuid'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Categoria encontrada com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Category'
                }
              }
            }
          },
          '404': {
            description: 'Categoria não encontrada'
          }
        }
      },
      put: {
        tags: ['Categorias'],
        summary: 'Atualizar categoria',
        description: 'Atualiza os dados de uma categoria específica',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID da categoria',
            schema: {
              type: 'string',
              format: 'uuid'
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CategoryUpdate'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Categoria atualizada com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Category'
                }
              }
            }
          },
          '400': {
            description: 'Dados inválidos'
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          },
          '404': {
            description: 'Categoria não encontrada'
          }
        }
      },
      delete: {
        tags: ['Categorias'],
        summary: 'Excluir categoria',
        description: 'Remove uma categoria do sistema',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID da categoria',
            schema: {
              type: 'string',
              format: 'uuid'
            }
          }
        ],
        responses: {
          '204': {
            description: 'Categoria excluída com sucesso'
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          },
          '404': {
            description: 'Categoria não encontrada'
          }
        }
      }
    },

    '/loans/{id}': {
      get: {
        tags: ['Empréstimos'],
        summary: 'Obter empréstimo por ID',
        description: 'Retorna os detalhes de um empréstimo específico',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID do empréstimo',
            schema: {
              type: 'string',
              format: 'uuid'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Detalhes do empréstimo',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Loan'
                }
              }
            }
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          },
          '404': {
            description: 'Empréstimo não encontrado'
          }
        }
      },
      patch: {
        tags: ['Empréstimos'],
        summary: 'Devolver livro',
        description: 'Registra a devolução de um livro emprestado',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID do empréstimo',
            schema: {
              type: 'string',
              format: 'uuid'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Livro devolvido com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Loan'
                }
              }
            }
          },
          '401': {
            description: 'Não autorizado - Token inválido ou expirado'
          },
          '404': {
            description: 'Empréstimo não encontrado'
          },
          '400': {
            description: 'Livro já devolvido ou operação inválida'
          }
        }
      }
    }
  }
};