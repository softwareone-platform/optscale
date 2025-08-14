# NGUI Server

## Development

To start the development server with automatic restart and codegen:

```bash
pnpm dev
```

This will start nodemon, which automatically:

1. **Build**: Compile TypeScript and run codegen
2. **Start Server**: Launch the development server
3. **Watch & Rebuild**: Monitor source files and automatically rebuild + restart on changes

### Development Scripts

- `pnpm dev` - **Recommended**: Start nodemon with automatic build, watch, and restart
- `pnpm build` - Build project (compile TypeScript + run codegen)
- `pnpm compile` - Compile TypeScript only
- `pnpm codegen` - Run GraphQL codegen only
- `pnpm serve` - Start the server (requires built files)
- `pnpm start` - Build and start server (production mode)

### File Watching

Nodemon watches all source files and triggers rebuild + restart:

- **TypeScript Files**: `**/*.ts`
- **GraphQL Schemas**: `graphql/schemas/**/*.graphql`
- **API Files**: `api/**/*.ts`
- **GraphQL Resolvers**: `graphql/resolvers/**/*.ts`
- **Environment**: `.env`

### Workflow

When you change any watched file:

1. **File change detected** → Nodemon triggers restart
2. **Build process** → Compile TypeScript + codegen
3. **Server start** → `node --env-file=.env ./dist/server.js`
