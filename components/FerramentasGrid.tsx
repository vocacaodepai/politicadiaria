import Link from "next/link";
import { getResultados } from "@/lib/eleicoes";
import { getPropostas } from "@/lib/promessas";
import { checagens } from "@/lib/checagens";
import { historia } from "@/lib/historia";
import { formatInt } from "@/lib/congress";

export type Ferramenta = {
  href: string;
  label: string;
  stat: string;
  statLabel: string;
  desc: string;
  tone: string;
};

export function getFerramentas(): Ferramenta[] {
  const promessas = getPropostas("lula").length + getPropostas("flavio").length;
  const candidatos = getResultados().presidente.turno1.candidatos.length;
  return [
    { href: "/congresso", label: "Congresso por dentro", stat: formatInt(594), statLabel: "parlamentares", desc: "Votos, ausências, gastos e salário de cada deputado e senador, com mapa do plenário.", tone: "bg-[#1E3A8A]" },
    { href: "/eleicoes", label: "Eleições 2026", stat: String(candidatos), statLabel: "candidatos à Presidência", desc: "Resultados do TSE, pesquisas e ranking de acerto dos institutos.", tone: "bg-[#0F766E]" },
    { href: "/promessas", label: "Promessas", stat: formatInt(promessas), statLabel: "propostas acompanhadas", desc: "O que foi prometido nos planos de governo e o que os indicadores oficiais mostram.", tone: "bg-[#A16207]" },
    { href: "/checagem", label: "Checagem", stat: String(checagens.length), statLabel: "boatos verificados", desc: "Veredito, fontes numeradas e a mesma régua para qualquer campo político.", tone: "bg-[#9F1239]" },
    { href: "/historia", label: "História", stat: String(historia.length), statLabel: "artigos, da eleição mais recente para a mais antiga", desc: "Eleições e períodos do Brasil, da mais recente para a mais antiga.", tone: "bg-[#44403C]" },
    { href: "/artigos", label: "Livros", stat: "0–10", statLabel: "nota por resenha", desc: "Resenhas de livros de política com nota, críticas e onde comprar.", tone: "bg-[#334155]" },
  ];
}

/** Grade de cartões coloridos, uma ferramenta por cartão, com um número em destaque. */
export function FerramentasGrid({ limit }: { limit?: number }) {
  const items = getFerramentas().slice(0, limit);
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {items.map((f) => (
        <li key={f.href}>
          <Link
            href={f.href}
            className={`group flex h-full min-h-44 flex-col justify-between p-4 text-white transition hover:-translate-y-0.5 hover:shadow-lg sm:p-5 ${f.tone}`}
          >
            <p className="label-mono text-white/80">{f.label}</p>
            <div>
              <p className="font-display text-4xl font-extrabold leading-none sm:text-5xl">{f.stat}</p>
              <p className="mt-1 text-xs text-white/80">{f.statLabel}</p>
              <p className="mt-3 hidden text-sm leading-snug text-white/90 sm:block">{f.desc}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-wider">Abrir →</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
