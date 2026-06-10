# TaskFlow - Frontend Dashboard

Interface reativa e moderna para gerenciamento de entregáveis corporativos e marcos estratégicos, desenvolvida em **React.js** com **Vite**.

##  Engenharia e Tecnologias
- **React.js (Vite):** Estrutura modular e SPA (Single Page Application) de alta performance.
- **CSS Modules:** Estilização isolada com escopo localizado (`App.module.css`), evitando vazamento de escopo global.
- **Hooks Core (`useState`, `useEffect`):** Engenharia de sincronização de estados locais e consumo assíncrono de APIs RESTful.

---

##  Design System & Visual
- **Paleta Consulting Blue:** Interface sóbria inspirada em dashboards executivos (Navy Blue, Slate e Emerald Green).
- **Métricas em Tempo Real:** Contador dinâmico de tarefas totais versus marcos concluídos.
- **Micro-interações:** Feedback imediato no clique (status e texto riscado condicionalmente via operador ternário no JSX).

---

##  Como Executar Localmente

### Pré-requisitos
- Node.js instalado.

### Instalação
```bash
# Entre na pasta do projeto
cd taskflow-frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento do Vite
npm run dev
