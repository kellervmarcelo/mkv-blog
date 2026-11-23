import Link from "next/link";

export default function Hero() {
  return (
    <div className="bg-ink text-paper rounded-[20px] flex">
      <div className="py-14 flex-[1_1_420px] px-12 flex flex-col gap-5 justify-center">
        <small className="py-1 px-3 rounded-full self-start bg-lime font-semibold text-ink text-xs">
          Destaque
        </small>
        <h1 className="font-title text-[56px] leading-[1.02] tracking-tighter font-bold">
          Tudo em um só lugar. <br /> Do tênis ao notebook.
        </h1>
        <p className="text-[#D4D4D8] max-w-115">
          Calçados, roupas, acessórios, eletrônicos e perfumes, com desconto em
          boa parte do catálogo.
        </p>

        <div className="flex gap-3">
          <Link
            prefetch={false}
            className="h-12 px-5.5 bg-lime rounded-sm text-ink font-semibold text-[15px] flex items-center"
            href="#"
          >
            Ver produtos
          </Link>
          <Link
            prefetch={false}
            className="h-12 px-5.5 bg-transparent rounded-sm text-paper border border-[#52525B] font-semibold text-[15px] flex items-center"
            href="#"
          >
            Maiores descontos
          </Link>
        </div>
      </div>

      <div className="bg-[#1C1C21] flex flex-[1_1_360px] flex-col justify-end items-center p-7 gap-1.5 rounded-r-[20px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="476"
          height="275.6333312988281"
          viewBox="736 127 476 275.6333312988281"
        >
          <defs />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g id="span1">
            <g>
              <rect
                width="476"
                height="275.6333312988281"
                x="736"
                y="127"
                fill="rgb(38, 38, 43)"
                rx="14"
                ry="14"
              />
            </g>
            <text
              color="rgb(161, 161, 170)"
              dominant-baseline="text-after-edge"
              font-family="Inter, sans-serif"
              font-size="12px"
              font-size-adjust="none"
              font-stretch="100%"
              font-style="normal"
              font-variant="normal"
              font-weight="400"
              direction="ltr"
              letter-spacing="0.96px"
              text-decoration="none"
              text-anchor="start"
              text-rendering="auto"
              unicode-bidi="normal"
              word-spacing="0px"
              writing-mode="horizontal-tb"
              user-select="text"
              fill="rgb(161, 161, 170)"
            >
              <tspan
                xmlSpace="preserve"
                x="899.6500244140625"
                y="272.316650390625"
                textLength="148.70001220703125"
                lengthAdjust="spacingAndGlyphs"
              >
                Imagem do produto
              </tspan>
            </text>
          </g>
        </svg>
        <div>
          <small className="text-[13px] text-[#A1A1AA]">
            Apple · Notebooks
          </small>
          <p className="text-xl font-semibold">
            Apple MacBook Pro 14 Inch Space Grey
          </p>
          <div className="flex items-center gap-2">
            <p className="font-title text-[22px] text-lime font-bold">
              US$ 1.906,19
            </p>
            <span className="text-sm line-through text-[#A1A1AA]">
              US$ 1.999,99
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
