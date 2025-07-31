export const openApiDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Todo API',
    version: '1.0.0',
    description: 'TodoアプリケーションのAPI'
  },
  paths: {
    '/todos': {
      get: {
        summary: 'TodoListを全件取得',
        description: 'すべてのTodoを取得します',
        responses: {
          '200': {
            description: '成功',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      title: { type: 'string' },
                      status: { type: 'string', enum: ['todo', 'doing', 'done'] },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' }
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'サーバーエラー'
          }
        }
      }
    },
    '/doing': {
      get: {
        summary: 'DoingListを全件取得',
        description: 'ステータスが「doing」のTodoを取得します',
        responses: {
          '200': {
            description: '成功',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      title: { type: 'string' },
                      status: { type: 'string', enum: ['todo', 'doing', 'done'] },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' }
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'サーバーエラー'
          }
        }
      }
    },
    '/done': {
      get: {
        summary: 'DoneListを全件取得',
        description: 'ステータスが「done」のTodoを取得します',
        responses: {
          '200': {
            description: '成功',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      title: { type: 'string' },
                      status: { type: 'string', enum: ['todo', 'doing', 'done'] },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' }
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'サーバーエラー'
          }
        }
      }
    },
    '/todos/{id}': {
      post: {
        summary: 'Todoアイテムを更新',
        description: '指定されたIDのTodoアイテムを更新します',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: '更新するTodoのID',
            schema: {
              type: 'integer'
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    description: 'Todoのタイトル'
                  },
                  status: {
                    type: 'string',
                    enum: ['todo', 'doing', 'done'],
                    description: 'Todoのステータス'
                  }
                },
                anyOf: [
                  { required: ['title'] },
                  { required: ['status'] }
                ],
                description: 'titleまたはstatusのいずれかは必須です'
              }
            }
          }
        },
        responses: {
          '200': {
            description: '更新成功',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    data: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        title: { type: 'string' },
                        status: { type: 'string', enum: ['todo', 'doing', 'done'] },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                      }
                    },
                    timestamp: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'バリデーションエラー',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                    details: { type: 'string' },
                    timestamp: { type: 'string', format: 'date-time' },
                    endpoint: { type: 'string' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Todoが見つかりません',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                    details: { type: 'string' },
                    timestamp: { type: 'string', format: 'date-time' },
                    endpoint: { type: 'string' }
                  }
                }
              }
            }
          },
          '500': {
            description: 'サーバーエラー',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                    details: { type: 'string' },
                    timestamp: { type: 'string', format: 'date-time' },
                    endpoint: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      },
      delete: {
        summary: 'Todoアイテムを削除',
        description: '指定されたIDのTodoアイテムを削除します',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: '削除するTodoのID',
            schema: {
              type: 'integer'
            }
          }
        ],
        responses: {
          '200': {
            description: '削除成功',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    data: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        title: { type: 'string' },
                        status: { type: 'string', enum: ['todo', 'doing', 'done'] },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                      }
                    },
                    timestamp: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'バリデーションエラー',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                    details: { type: 'string' },
                    timestamp: { type: 'string', format: 'date-time' },
                    endpoint: { type: 'string' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Todoが見つかりません',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                    details: { type: 'string' },
                    timestamp: { type: 'string', format: 'date-time' },
                    endpoint: { type: 'string' }
                  }
                }
              }
            }
          },
          '500': {
            description: 'サーバーエラー',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                    details: { type: 'string' },
                    timestamp: { type: 'string', format: 'date-time' },
                    endpoint: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/todos/deleted': {
      get: {
        summary: '削除されたTodoアイテムを取得',
        description: '論理削除されたTodoアイテムの一覧を取得します',
        responses: {
          '200': {
            description: '成功',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          title: { type: 'string' },
                          status: { type: 'string', enum: ['todo', 'doing', 'done'] },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                          deletedAt: { type: 'string', format: 'date-time' },
                          isDeleted: { type: 'boolean' }
                        }
                      }
                    },
                    count: { type: 'integer' },
                    timestamp: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          },
          '500': {
            description: 'サーバーエラー'
          }
        }
      }
    },
    '/todos/recent-updates': {
      get: {
        summary: '最近更新されたTodoアイテムを取得',
        description: '指定された日数以内に更新されたTodoアイテムを取得します',
        parameters: [
          {
            name: 'limit',
            in: 'query',
            required: false,
            description: '取得件数（デフォルト: 10）',
            schema: {
              type: 'integer',
              default: 10
            }
          },
          {
            name: 'days',
            in: 'query',
            required: false,
            description: '何日以内の更新を対象とするか（デフォルト: 7）',
            schema: {
              type: 'integer',
              default: 7
            }
          }
        ],
        responses: {
          '200': {
            description: '成功',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          title: { type: 'string' },
                          status: { type: 'string', enum: ['todo', 'doing', 'done'] },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                          deletedAt: { type: 'string', format: 'date-time' },
                          isDeleted: { type: 'boolean' }
                        }
                      }
                    },
                    count: { type: 'integer' },
                    limit: { type: 'integer' },
                    days: { type: 'integer' },
                    timestamp: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          },
          '500': {
            description: 'サーバーエラー'
          }
        }
      }
    }
  }
}; 