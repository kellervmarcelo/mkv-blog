<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# mkv store: guia para agentes

## Objetivo do projeto

E-commerce de **estudos** para o autor praticar React.js e Next.js e usar o resultado no currículo. O produto final é tanto a loja quanto o **registro mensurável** de quanto cada boa prática melhora os Core Web Vitals.

O método é:

1. Implementar a loja de forma propositalmente **naive**.
2. Medir e documentar essa versão como baseline.
3. Aplicar uma boa prática por vez.
4. Medir de novo e documentar a diferença.

## Regras para agentes

- **Não otimize por iniciativa própria.** Código naive é intencional. Não troque `<img>` por `next/image`, não mova fetch para o servidor, não remova `"use client"` e não adicione cache, a menos que a etapa atual peça isso.
- **Não "corrija" o aviso `@next/next/no-img-element`** durante a fase naive. Ele faz parte do baseline.
- **Uma otimização por etapa.** Misturar mudanças impede saber qual delas causou o ganho.
- **Nunca invente métricas.** Só registre valores vindos de uma medição real, seguindo o protocolo abaixo.
- **Mudanças funcionais e de performance ficam separadas**, em commits diferentes.
- **Ao concluir uma etapa**, atualize a tabela de resultados do `README.md` e o status do roadmap nos dois documentos.
- **Explique o porquê.** O autor está aprendendo, então descreva o problema que cada mudança resolve.
- Consulte `node_modules/next/dist/docs/` antes de usar qualquer API do Next.
- Escreva a documentação e as mensagens ao usuário em pt-BR. Identificadores de código ficam em inglês.
- Siga o `.editorconfig`: 2 espaços, UTF-8, **CRLF** e linha final.

## Stack

| Área | Tecnologia |
| --- | --- |
| Framework | Next.js 16.4.6 (App Router, Turbopack) |
| UI | React 19.3.0 |
| Linguagem | TypeScript 5 (`strict`) |
| Estilo | Tailwind CSS 4.3.3, `tw-animate-css` |
| Componentes | shadcn (estilo `base-rhea`) sobre `@base-ui/react` |
| Utilitários de classe | `class-variance-authority`, `cn` |
| Ícones | `lucide-react` |
| Dados | API pública [DummyJSON](https://dummyjson.com/docs/products) |
| Qualidade | ESLint 9 com `eslint-config-next` (`core-web-vitals` e `typescript`) |

Não há suíte de testes configurada.

## Comandos

```bash
npm install          # instala as dependências
npm run dev          # desenvolvimento em http://localhost:3000
npm run build        # build de produção
npm run start        # serve o build de produção
npm run lint         # ESLint
npx tsc --noEmit     # checagem de tipos
npx next analyze     # analisador de bundle em http://localhost:4000
```

## Estrutura

```text
src/
  app/                  rotas (App Router), layout raiz e globals.css
    page.tsx            home: Hero + lista de produtos
    cart/               carrinho (placeholder)
    products/           listagem (placeholder)
    products/[id]/      detalhe do produto (placeholder)
  components/           componentes da loja, um por pasta (Nome/index.tsx)
    ui/                 componentes gerados pelo shadcn
  lib/utils.ts          reexporta `cn`
  models/               tipos de domínio (produto e carrinho)
```

O alias `@/*` aponta para `src/*`. Os tokens de design ficam em `src/app/globals.css`: `ink`, `paper`, `lime`, `grafite` e as fontes `font-title` e `font-text`.

## Estado atual do baseline

### Práticas naive já presentes (manter até a etapa correspondente)

| Prática | Onde | Métrica mais afetada |
| --- | --- | --- |
| `<img>` sem `width`/`height`, `sizes` ou lazy loading | `src/components/ProductCard/index.tsx` | LCP, CLS |
| Fetch no cliente com `useEffect`, sem loading, erro ou cache | `src/app/page.tsx` | LCP, CLS |
| Home inteira como Client Component | `src/app/page.tsx` | TBT, INP |
| `"use client"` sem necessidade | `Logo`, `products/page.tsx`, `products/[id]/page.tsx` | TBT, INP |
| Lista carregada sem espaço reservado | `src/app/page.tsx` | CLS |
| Google Fonts via `<link>` bloqueante, com vários eixos | `src/app/layout.tsx` | FCP, LCP, CLS |
| Fontes sem `next/font`, servidas por terceiros | `src/app/layout.tsx` | FCP, LCP, CLS |
| `cacheComponents` e `partialPrefetching` desativados | `next.config.ts` | TTFB, navegação |
| `prefetch={false}` em todos os `next/link` | `Header`, `Footer`, `Hero`, `ProductCard` | Navegação |
| Todos os 30 produtos da API, com todos os campos | `src/app/page.tsx` | LCP |

### Limitações do baseline

O autor decidiu desativar as otimizações do Next antes da primeira medição. Estas ressalvas continuam valendo:

- `next/link` foi mantido com `prefetch={false}`, então a navegação ainda é client-side.
- `lucide-react` é otimizado automaticamente pelo Next, sem opção para desligar. O import nomeado atual não demonstra o custo de importar uma lib completa.
- Nenhuma biblioteca pesada é importada por inteiro hoje. Esse cenário ainda precisa ser criado, caso faça parte do baseline.

### Pendências funcionais (não são otimizações)

- `/offers` é linkada no Header e no Footer, mas a rota não existe.
- As páginas de carrinho, listagem e detalhe são placeholders.
- `src/components/ProductCategory/index.tsx` está vazio.
- `ProductCard` aponta para `/` e exibe o preço antigo fixo `US$ 899,99`.
- O produto do `Hero` é fixo, e seus links usam `href="#"`.
- O contador do carrinho no `Header` é fixo em `4`.
- `Footer` usa a tag `<header>`.
- `Logo` renderiza um `<h1>`, então a home tem três `<h1>`.
- `Header` tem a classe inválida `border-[##E4E4E7]`.
- `layout.tsx` ainda usa o título e a descrição padrão do create-next-app.
- O build avisa sobre um `package-lock.json` solto em `C:\Users\marce`.

## Protocolo de medição

Para os resultados serem comparáveis, toda medição segue as mesmas condições:

1. Medir sempre o **build de produção**, nunca `npm run dev`.
2. Usar a mesma máquina e a mesma rede, com outros apps pesados fechados.
3. Medir as mesmas rotas. Enquanto as outras forem placeholders, a rota principal é `/`.
4. Rodar o Lighthouse **5 vezes em perfil mobile** e registrar a **mediana**.
5. Salvar os relatórios em `docs/performance/etapa-N/`.
6. Registrar commit, data, versão do Lighthouse e tamanho do bundle.

```bash
npm run build
npm run start
npx lighthouse http://localhost:3000 --only-categories=performance --output=json --output=html --output-path=./docs/performance/etapa-0/home-1
npx next analyze --output --snapshot etapa-0
```

O Lighthouse exige Node 22.19 ou superior e um Chrome instalado.

**INP não é medido pelo Lighthouse em navegação**, pois depende de interação real. Use o TBT como indicador de laboratório e meça INP com `useReportWebVitals` ou com o painel Performance do DevTools. Não apresente TBT como se fosse INP.

Limites de "bom" dos Core Web Vitals: **LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1**.

## Roadmap

| Etapa | Foco | Status |
| --- | --- | --- |
| 0 | Concluir a loja naive e medir o baseline | Em andamento |
| 1 | Imagens com `next/image` | Pendente |
| 2 | Fontes com `next/font`, sem `<link>` externo | Pendente |
| 3 | Dados no servidor com Server Components | Pendente |
| 4 | Reativar `cacheComponents` e prefetch; cache e streaming (`use cache`, `Suspense`) | Pendente |
| 5 | Redução de JavaScript no cliente | Pendente |
| 6 | Code splitting e imports otimizados | Pendente |
| 7 | Estabilidade de layout e skeletons | Pendente |
| 8 | Metadata, SEO e acessibilidade | Pendente |

A ordem pode mudar conforme o que o baseline revelar. Cada etapa termina com medição, atualização da documentação e um commit próprio.
