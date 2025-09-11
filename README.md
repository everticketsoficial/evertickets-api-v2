# Evertickets

## Random JWT

```yml
$ node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Extensões sugeridas

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)

## Supabase

```sh
# Gerar backup
$ npx supabase db dump --data-only --db-url "postgresql://postgres.abrfqxcgebxchtzydclu:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres" > supabase/seed.sql

# Subir migrations
$ npx supabase migration up --db-url "postgresql://postgres.abrfqxcgebxchtzydclu:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
```

## API Docs

Acesse o endpoint `/docs`
