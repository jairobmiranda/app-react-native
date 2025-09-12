# Features - "Fatias" do Redux (slices) agrupadas por domínio

### 💡 Então por que authTypes.ts fica dentro de features/auth/?

Porque ele define os tipos usados exclusivamente na lógica de autenticação — por exemplo:

payloads específicos do login

a resposta que o backend envia após o login

tipos internos do slice da auth

Esses tipos não fazem sentido fora do contexto de auth, então mantê-los dentro de features/auth mantém o código mais modular e organizado.

### 🔁 Se você colocar todos os tipos em src/types/models, corre o risco de:

Criar um tipo de acoplamento (tipos globais que só servem localmente)

Poluir o diretório com tipos muito específicos

Perder o benefício de modularidade
