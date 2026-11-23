# mkv store

E-commerce de estudos feito com Next.js e React para responder, com números, a uma pergunta: **quanto cada boa prática de performance realmente melhora a experiência do usuário?**

> **Status:** Etapa 0. A parte visual da loja está pronta, a lógica ainda será implementada, e as métricas não foram coletadas.

## A ideia

Muitos projetos já nascem otimizados, o que esconde o impacto de cada decisão. Aqui o caminho é o inverso:

1. **Construir de forma naive**, sem os principais recursos do Next.js e sem priorizar boas práticas.
2. **Medir os Core Web Vitals** e documentar esse ponto de partida.
3. **Aplicar uma boa prática por vez.**
4. **Medir novamente** e registrar a diferença causada por aquela mudança.

### O que fica desativado no baseline

- `next/image`: as imagens usam `<img>` comum.
- `next/font`: as fontes vêm de um `<link>` para o Google Fonts.
- Cache Components e Partial Prefetching.
- Prefetch dos links.
- Skeletons, estados de erro da API e espaço reservado para imagens, que entram na Etapa 7.

O `lucide-react` é a exceção, porque o Next o otimiza automaticamente e não oferece opção para desligar.

## Tecnologias

| Área | Tecnologia |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16.4.6 (App Router, Turbopack) |
| UI | [React](https://react.dev) 19.3.0 |
| Linguagem | [TypeScript](https://www.typescriptlang.org) 5 |
| Estilo | [Tailwind CSS](https://tailwindcss.com) 4.3.3 |
| Componentes | [shadcn](https://ui.shadcn.com) com [Base UI](https://base-ui.com) |
| Ícones | [Lucide](https://lucide.dev) |
| Dados | [DummyJSON](https://dummyjson.com/docs/products) |
| Qualidade | ESLint 9 com as regras `core-web-vitals` do Next |

## Como rodar

Pré-requisitos: Node.js e npm. O projeto foi validado com Node 24.11.1 e npm 11.6.2.

```bash
npm install
```

```bash
npm run dev
```

Depois, abra [http://localhost:3000](http://localhost:3000).

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Serve o build de produção |
| `npm run lint` | Executa o ESLint |
| `npx tsc --noEmit` | Verifica os tipos |
| `npx next analyze` | Abre o analisador de bundle em `http://localhost:4000` |

## Estrutura

```text
src/
  app/          rotas, layout raiz e estilos globais
  components/   componentes da loja
    ui/         componentes gerados pelo shadcn
  lib/          utilitários
  mocks/        dados de exemplo das telas
  models/       tipos de domínio
```

## Como a performance é medida

| Métrica | O que representa | Bom |
| --- | --- | --- |
| **LCP** (Largest Contentful Paint) | Quando o maior conteúdo visível aparece | ≤ 2,5 s |
| **INP** (Interaction to Next Paint) | Quão rápido a página responde a interações | ≤ 200 ms |
| **CLS** (Cumulative Layout Shift) | Quanto o layout se move sozinho | ≤ 0,1 |

Para manter as comparações justas, toda medição:

- usa o **build de produção**, nunca o modo de desenvolvimento;
- roda na mesma máquina e na mesma rede;
- executa o Lighthouse **5 vezes em perfil mobile** e registra a **mediana**;
- guarda os relatórios em `docs/performance/etapa-N/`.

O Lighthouse não mede INP em um carregamento de página, porque essa métrica depende de interação real. Por isso, o **TBT** aparece como indicador de laboratório, e o INP é medido separadamente.

```bash
npm run build
```

```bash
npm run start
```

Com o servidor rodando, em outro terminal:

```bash
npx lighthouse http://localhost:3000 --only-categories=performance --output=json --output=html --output-path=./docs/performance/etapa-0/home-1
```

## Roadmap

- [ ] **Etapa 0:** concluir a loja naive e medir o baseline
- [ ] **Etapa 1:** imagens com `next/image`
- [ ] **Etapa 2:** fontes com `next/font`, sem `<link>` externo
- [ ] **Etapa 3:** dados no servidor com Server Components
- [ ] **Etapa 4:** reativar Cache Components e prefetch, com cache e streaming via `use cache` e `Suspense`
- [ ] **Etapa 5:** redução de JavaScript no cliente
- [ ] **Etapa 6:** code splitting e imports otimizados
- [ ] **Etapa 7:** estabilidade de layout e skeletons
- [ ] **Etapa 8:** metadata, SEO e acessibilidade

## Resultados

Valores em mediana de 5 execuções. A tabela é preenchida ao final de cada etapa.

| Etapa | Commit | Score | LCP | TBT | CLS | INP | JS (bundle) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0. Baseline naive | a medir | a medir | a medir | a medir | a medir | a medir | a medir |

## Aprendizados

Esta seção será preenchida a cada etapa com o problema encontrado, a solução aplicada e o impacto medido.
