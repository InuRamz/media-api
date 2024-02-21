const swaggerJsdoc = require('swagger-jsdoc');

exports.swaggerSpec = swaggerJsdoc({
	definition: {
		openapi: '3.0.0',
    info: {
			title: "Media API",
			version: "1.0.0",
			description: "Manage media content to users by roles & permissions",
			contact: {
				name: "API Support",
				email: "inuram@gmail.com"
			}
		},
		server: {
			url: "http://localhost:3000",
			description: "Development"
		},
		components: {
			schemas: {
				Login: {
					type: "object",
					properties: {
						userName: {
							type: "string"
						},
						password: {
							type: "string"
						}
					}
				},
				Category: {
					type: "object",
					properties: {
						name: {
							type: "string"
						},
						type: {
							type: "string"
						},
						ext: {
							type: "string"
						}
					}
				},
				Thematic: {
					type: "object",
					properties: {
						name: {
							type: "string"
						},
						category: {
							type: "string",
							format: "uuid"
						},
						front: {
							type: "string",
							format: "binary"
						}
					}
				},
				PostFile: {
					type: "object",
					properties: {
						title: {
							type: "string"
						},
						thematicId: {
							type: "string",
							format: "uuid"
						},
						file: {
							type: "string",
							format: "binary"
						},
					}
				},
				PostText: {
					type: "object",
					properties: {
						title: {
							type: "string"
						},
						thematicId: {
							type: "string",
							format: "uuid"
						},
						file: {
							type: "string"
						},
					}
				},
				UserPermission: {
					type: "object",
					properties: {
						slug: {
							type: "string"
						}
					}
				},
				UserRole: {
					type: "object",
					properties: {
						name: {
							type: "string"
						},
						permissions: {
							type: "array",
							items: {
								type: "string",
								format: "uuid"
							}
						}
					}
				},
				User: {
					type: "object",
					properties: {
						userName: {
							type: "string"
						},
						email: {
							type: "string"
						},
						password: {
							type: "string"
						},
						role: {
							type: "string",
							format: "uuid"
						}
					}
				}
			},
			securitySchemes: {
				ApiKeyAuth: {
					type: "apiKey",
					in: "header",
					name: "Authorization"
				}
			}
		}
  },
  apis: ['./controllers/*.js'], // files containing annotations as above
});