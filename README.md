
# Clean Architecture Firebase App

Este projeto é uma aplicação React utilizando Firebase para autenticação do Google e mensagens em tempo real, seguindo os princípios da **Clean Architecture**.

## Arquitetura Limpa (Clean Architecture)

A **Clean Architecture** promove a separação de responsabilidades e modularidade, permitindo que cada camada tenha uma função específica. As camadas principais são:

- **Camada de Aplicação (Application)**: Contém a lógica de negócio.
- **Camada de Domínio (Domain)**: Define os modelos e contratos (interfaces).
- **Camada de Infraestrutura (Infrastructure)**: Implementa os detalhes de integração com serviços externos.
- **Camada de Apresentação (Presentation)**: Contém a interface do usuário (UI).

### Estrutura do Projeto

```bash
/src
  ├── /application
  │     ├── /auth
  │     │     └── useAuth.ts
  │     └── /messages
  │           └── useMessages.ts
  ├── /domain
  │     ├── /models
  │     │     ├── Message.ts
  │     │     └── User.ts
  │     └── /repositories
  │           ├── AuthRepository.ts
  │           └── MessagesRepository.ts
  ├── /infrastructure
  │     ├── /firebase
  │     │     └── firebase.config.ts
  │     └── /repositories
  │           ├── FirebaseAuthRepository.ts
  │           └── FirebaseMessagesRepository.ts
  ├── /presentation
  │     ├── /components
  │     │     ├── Login.tsx
  │     │     └── Messages.tsx
  │     ├── /routes
  │     │     └── PrivateRoute.tsx
  │     ├── /hooks
  │     │     └── useAuth.ts
  │     └── /context
  │           └── AuthContext.tsx
  └── App.tsx
README.md
```

### Explicação Detalhada dos Arquivos

### 1. /src/application/auth/useAuth.ts
Este arquivo contém a lógica de autenticação, coordenando a interação entre a camada de apresentação (UI) e a camada de infraestrutura (Firebase). Ele encapsula os métodos de login e logout.

**Princípio:** Separation of Concerns, separando a lógica de autenticação da interface do usuário.

### 2. /src/application/messages/useMessages.ts
Contém a lógica relacionada ao envio e recebimento de mensagens. Este arquivo gerencia a comunicação entre o repositório de mensagens (infraestrutura) e a apresentação (UI).

**Princípio:** SRP (Single Responsibility Principle) — isola a lógica de mensagens da interface.

### 3. /src/domain/models/User.ts
Define o modelo de dados para o usuário, garantindo que a estrutura de dados permaneça consistente em toda a aplicação.

**Princípio:** Entities encapsulam os dados fundamentais da aplicação.

### 4. /src/domain/models/Message.ts
Define o modelo de dados para mensagens, mantendo o formato uniforme e válido para a aplicação.

**Princípio:** Entities que representam os dados centrais, isolando o comportamento de negócio.

### 5. /src/domain/repositories/AuthRepository.ts
Interface para a autenticação. Define os métodos necessários para login e logout, independentemente de como serão implementados na infraestrutura.

**Princípio:** Dependency Inversion, onde a lógica depende de abstrações e não de implementações.

### 6. /src/domain/repositories/MessagesRepository.ts
Interface para gerenciamento de mensagens, permitindo que a aplicação envie e receba mensagens independentemente da implementação concreta.

**Princípio:** Dependency Inversion, desacoplando a lógica de negócios da infraestrutura.

### 7. /src/infrastructure/firebase/firebase.config.ts
Contém a configuração e inicialização do Firebase, incluindo Firestore e Google Auth Provider.

**Princípio:** Infrastructure as Detail, isolando a dependência do Firebase em uma camada de infraestrutura.

### 8. /src/infrastructure/repositories/FirebaseAuthRepository.ts
Implementação concreta da interface AuthRepository. Interage com o Firebase para login e logout.

**Princípio:** Dependency Inversion, permitindo que o Firebase seja substituído sem modificar a lógica de negócios.

### 9. /src/infrastructure/repositories/FirebaseMessagesRepository.ts
Implementa a interface MessagesRepository para enviar e receber mensagens do Firestore.

**Princípio:** Dependency Inversion, mantendo a independência da lógica de negócio.

### 10. /src/presentation/components/Login.tsx
Componente de UI que gerencia a autenticação do usuário. Exibe o botão de login e interage com o AuthContext.

**Princípio:** Single Responsibility Principle (SRP) — gerencia apenas a UI de autenticação.

### 11. /src/presentation/components/Messages.tsx
Componente de UI responsável por exibir e enviar mensagens. Ele interage com a lógica de mensagens na camada de aplicação.

**Princípio:** SRP, gerenciando apenas a exibição e envio de mensagens.

### 12. /src/presentation/routes/PrivateRoute.tsx
Protege as rotas que exigem autenticação. Redireciona o usuário para a página de login se ele não estiver autenticado.

**Princípio:** Encapsulamento, isola a lógica de proteção de rotas em um único componente.

### 13. /src/presentation/hooks/useAuth.ts
Um hook personalizado para acessar o contexto de autenticação dentro de qualquer componente da interface.

**Princípio:** Reutilização de código, encapsulando o acesso ao contexto de autenticação.

### 14. /src/presentation/context/AuthContext.tsx
Gerencia o estado de autenticação e disponibiliza métodos de login/logout e o estado atual do usuário para a aplicação inteira.

**Princípio:** Inversion of Control, onde a gestão do estado de autenticação é feita no contexto.

### 15. /src/App.tsx
Componente principal da aplicação. Organiza o roteamento e o layout geral, utilizando o AuthProvider para fornecer o estado de autenticação aos componentes filhos.

**Princípio:** Composition over Inheritance, compondo os diferentes blocos da aplicação de maneira modular.


## Conclusão

Este projeto demonstra como usar a **Clean Architecture** para construir uma aplicação React modular e escalável, garantindo que cada camada tenha uma responsabilidade clara e que mudanças em uma parte da aplicação não afetem as outras. A infraestrutura (Firebase) é isolada, e a lógica de aplicação não depende de detalhes de implementação, mas sim de abstrações definidas na camada de domínio.