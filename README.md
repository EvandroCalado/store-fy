# Store-FY

Uma aplicação de e-commerce moderna construída com Next.js 15, React 19 e TypeScript.

## 🚀 Tecnologias Principais

- **Next.js 15** - Framework React para renderização híbrida
- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Prisma** - ORM para banco de dados
- **Tailwind CSS** - Framework CSS utilitário
- **NextAuth.js** - Autenticação completa
- **Stripe** - Processamento de pagamentos
- **PayPal** - Integração com PayPal
- **UploadThing** - Upload de arquivos

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (gerenciador de pacotes)
- Banco de dados PostgreSQL

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/EvandroCalado/store-fy.git
cd store-fy
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
DATABASE_URL="sua_url_do_banco_de_dados"
NEXTAUTH_SECRET="seu_secret_para_autenticação"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sua_chave_secreta_do_stripe"
STRIPE_WEBHOOK_SECRET="seu_webhook_secret_do_stripe"
UPLOADTHING_SECRET="seu_secret_do_uploadthing"
UPLOADTHING_APP_ID="seu_app_id_do_uploadthing"
```

4. Execute as migrações do banco de dados:
```bash
pnpm prisma migrate dev
```

## 🚀 Executando o Projeto

Para desenvolvimento:
```bash
pnpm dev
```

Para produção:
```bash
pnpm build
pnpm start
```

## 🧪 Testes

Para executar os testes:
```bash
pnpm test
```

Para executar os testes em modo watch:
```bash
pnpm test:watch
```

## 📦 Estrutura do Projeto

```
src/
├── actions/     # Ações do servidor
├── app/         # Rotas e páginas
├── components/  # Componentes React
├── db/          # Configuração do banco de dados
├── hooks/       # Hooks personalizados
├── lib/         # Utilitários e configurações
├── schemas/     # Schemas de validação
├── styles/      # Estilos globais
├── tests/       # Testes
├── types/       # Definições de tipos
└── utils/       # Funções utilitárias
```

## 🔒 Autenticação

O projeto utiliza NextAuth.js para autenticação, suportando:
- Autenticação por email/senha
- Autenticação social (Google, GitHub, etc.)

## 💳 Pagamentos

Integração com:
- Stripe para pagamentos com cartão de crédito
- PayPal para pagamentos alternativos

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia o guia de contribuição antes de enviar um pull request.
