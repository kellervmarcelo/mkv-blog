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
| Qualidade | ESLint 9 com `eslint-config-next` (`core-web-vitals` e `typescript`), Prettier 3 (configuração padrão em `.prettierrc.json`) |

Não há suíte de testes configurada.

## Comandos

```bash
npm install          # instala as dependências
npm run dev          # desenvolvimento em http://localhost:3000
npm run build        # build de produção
npm run start        # serve o build de produção
npm run lint         # ESLint
npm run format       # formata com o Prettier
npx tsc --noEmit     # checagem de tipos
npx next analyze     # analisador de bundle em http://localhost:4000
```

## Estrutura

```text
src/
  app/                  rotas (App Router), layout raiz e globals.css
    page.tsx            home: Hero + lista de produtos
    cart/               carrinho (só visual)
    products/           listagem (só visual)
    products/[id]/      detalhe do produto (só visual)
    not-found.tsx       página 404
  components/           componentes da loja, um por pasta (Nome/index.tsx)
    ui/                 componentes gerados pelo shadcn
  lib/utils.ts          reexporta `cn`
  mocks/                dados de exemplo das telas
  models/               tipos de domínio (produto e carrinho)
```

O alias `@/*` aponta para `src/*`. Os tokens de design ficam em `src/app/globals.css`, como variáveis do shadcn mais `brand`, `success`, `destructive-soft` e `image`. As fontes são `font-sans` e `font-display`.

## Estado atual do baseline

### Práticas naive já presentes (manter até a etapa correspondente)

| Prática | Onde | Métrica mais afetada |
| --- | --- | --- |
| `<img>` sem `width`/`height`, `sizes` ou lazy loading | `ProductCard`, `Hero`, `ProductDetail`, `cart/page.tsx` | LCP, CLS |
| Fetch no cliente com `useEffect`, sem loading, erro ou cache | `src/app/page.tsx` | LCP, CLS |
| Home inteira como Client Component | `src/app/page.tsx` | TBT, INP |
| `"use client"` sem necessidade | `Logo`, `products/page.tsx`, `products/[id]/page.tsx` | TBT, INP |
| Listas e imagens sem espaço reservado (o design pede altura fixa, adiada para a Etapa 7) | `ProductCard`, `Hero`, `ProductDetail` | CLS |
| Google Fonts via `<link>` bloqueante, com vários eixos | `src/app/layout.tsx` | FCP, LCP, CLS |
| Fontes sem `next/font`, servidas por terceiros | `src/app/layout.tsx` | FCP, LCP, CLS |
| `cacheComponents` e `partialPrefetching` desativados | `next.config.ts` | TTFB, navegação |
| `prefetch={false}` em todos os `next/link` | Todos os componentes e páginas | Navegação |
| Todos os 30 produtos da API, com todos os campos, para exibir 8 | `src/app/page.tsx` | LCP |

### Limitações do baseline

O autor decidiu desativar as otimizações do Next antes da primeira medição. Estas ressalvas continuam valendo:

- `next/link` foi mantido com `prefetch={false}`, então a navegação ainda é client-side.
- `lucide-react` é otimizado automaticamente pelo Next, sem opção para desligar. O import nomeado atual não demonstra o custo de importar uma lib completa.
- Nenhuma biblioteca pesada é importada por inteiro hoje. Esse cenário ainda precisa ser criado, caso faça parte do baseline.

### Pendências funcionais (não são otimizações)

As telas são **só visuais**. O autor vai implementar a lógica em React para praticar, então **não implemente lógica sem ele pedir**.

- Listagem, produto e carrinho usam dados fixos de `src/mocks`. A Home mantém o fetch original, e suas seções só fatiam a lista.
- Busca, filtros, ordenação, paginação, galeria, quantidade, adicionar, remover, cupom e checkout não têm comportamento.
- Preço com desconto, contador do carrinho e totais são valores fixos ou brutos da API. O preço antigo do `ProductCard` segue fixo em `US$ 899,99`.
- Todo card aponta para `/products/88`, e `/products/[id]` sempre mostra o mesmo produto.
- "Ofertas" aponta para `/products`, e a rota `/offers` não existe.
- Os estados do canvas (vazio, erro, esgotado, estoque baixo, avisos, micro-interações de carrinho) ainda não foram implementados.
- Os favicons do design ainda não foram exportados.
- `layout.tsx` ainda usa o título e a descrição padrão do create-next-app (Etapa 8).
- O build avisa sobre um `package-lock.json` solto em `C:Usersmarce`.

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
