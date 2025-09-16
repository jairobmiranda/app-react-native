// install prettierrc
npm install @reduxjs/toolkit react-redux
npm install -D @types/react-redux
expo install react-native-safe-area-context

---

# 📱 Projeto React Native com Expo, TypeScript e Redux Toolkit

Este projeto utiliza **React Native** com **Expo**, tipagem com **TypeScript** e gerenciamento de estado global com **Redux Toolkit**.  
A organização segue **boas práticas de mercado**, pensando em escalabilidade e facilidade de manutenção.

---

## 🚀 Tecnologias Utilizadas

- Expo – Framework para desenvolvimento React Native
- React Navigation – Sistema de navegação (Stack, Tabs)
- Redux Toolkit – Gerenciamento de estado
- TypeScript – Tipagem estática
- AsyncStorage – Armazenamento local

---

## 📂 Estrutura de Pastas

```bash
src/
├── api/                # Chamadas de API
│   └── authApi.ts
│
├── assets/             # Imagens, fontes, ícones
│
├── components/         # Componentes reutilizáveis (botões, inputs, etc.)
│   ├── Button.tsx
│   ├── Input.tsx
│   └── TabBarIcon.tsx
│
├── features/           # "Fatias" do Redux (slices) agrupadas por domínio
│   ├── auth/
│   │   ├── authSlice.ts    # Slice do Redux (estado + reducers)
│   │   ├── authThunks.ts   # Funções assíncronas (login, logout)
│   │   └── authTypes.ts    # Tipos específicos de auth
│   │
│   └── user/
│       ├── userSlice.ts
│       ├── userThunks.ts
│       └── userTypes.ts
│
├── hooks/              # Hooks customizados
│   └── useAuth.ts
│
├── navigation/         # Configuração das rotas
│   ├── AuthStack.tsx       # Rotas públicas (Login, Cadastro)
│   ├── AppTabs.tsx         # Rotas privadas com menu inferior
│   └── RootNavigator.tsx   # Decide entre AuthStack e AppTabs
│
├── screens/            # Telas principais
│   ├── LoginScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ProfileScreen.tsx
│   └── SettingsScreen.tsx
│
├── store/              # Configuração do Redux
│   ├── store.ts            # Cria e exporta store
│   └── rootReducer.ts      # Combina slices
│
├── types/              # Tipos globais
│   ├── models/             # Modelos de dados
│   │   └── User.ts
│   └── index.ts            # Reexport centralizado
│
├── utils/              # Helpers/utilitários
│   └── storage.ts          # Funções para AsyncStorage
│
└── theme/              # Estilos globais (opcional)
    └── colors.ts
```

---

## 📌 Padrões Adotados

### 🔹 Redux Toolkit

- Cada **feature** possui sua própria pasta (`src/features/auth`, `src/features/user`, etc.)
- Dentro da pasta ficam:
  - `slice` (estado e reducers)
  - `thunks` (ações assíncronas, como chamadas à API)
  - `types` (tipos específicos da feature)

### 🔹 TypeScript

- **`interface`** → usada para modelos de dados (ex: `User`, `AuthResponse`)
- **`type`** → usada para combinações e utilitários (ex: `Status = "idle" | "loading" | "error"`)
- **Modelos globais** ficam em `src/types/models/`
- **Tipos específicos** ficam dentro de cada feature (`authTypes.ts`, `userTypes.ts`)

### 🔹 Navegação

- `AuthStack` → telas públicas (Login, Cadastro)
- `AppTabs` → telas privadas (Home, Perfil, Configurações)
- `RootNavigator` → decide qual rota carregar com base no estado de autenticação

### 🔹 Componentes

- Componentes **reutilizáveis** ficam em `src/components/`
- Exemplo: botões, inputs, ícones da TabBar

### 🔹 Helpers / Utils

- Funções utilitárias ficam em `src/utils/`
- Exemplo: `storage.ts` para gerenciar dados com `AsyncStorage`

---

## 🔑 Fluxo de Autenticação

1. Usuário acessa o app → vai para o **AuthStack** (tela de login).
2. Após login → Redux guarda os dados do usuário → navegação muda para **AppTabs**.
3. Ao deslogar → Redux limpa os dados → volta para **AuthStack**.
4. Dados podem ser persistidos com **AsyncStorage**.

---

## 📖 Comandos principais

- **Rodar o app**

```bash
npx expo start
```

- **Instalar dependências**

```bash
npm install
```

ou

```bash
yarn install
```

- **Build do app**

```bash
eas build
```

---

## ✅ Boas práticas recomendadas

- **Organizar por features** (não por tipo de arquivo) → facilita escalabilidade.
- **Usar Redux Toolkit** em vez de Redux puro → menos boilerplate, mais legibilidade.
- **Separar models globais** (`src/types/models`) dos **tipos locais de cada feature**.
- **Criar hooks customizados** (`src/hooks`) para abstrair lógicas repetidas.
- **Centralizar navegação** em `src/navigation/`.
- **Utilizar componentes genéricos** (`src/components`) para evitar duplicação.
