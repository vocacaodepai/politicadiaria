import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { UF_NAMES, formatBRL, formatBRLShort, formatInt, formatPct, getMeta, getRemuneracao, getSummary, partySlug, pct } from "@/lib/congress";
import { BarList, StackedBar } from "./Bars";
import { Card, StatTile } from "./Stat";

const PATH = "/congresso";
const TITLE = "Congresso Nacional: quem são os 513 deputados e 81 senadores";
const DESC =
  "Quem está hoje na Câmara e no Senado: composição por partido, estado, gênero e idade, quanto cada parlamentar usa de cota, como votou e quanto custa. Dados oficiais.";

export const congressOverviewMetadata = (): Metadata => listingMetadata({ title: TITLE, description: DESC, path: PATH });

const dateBR = (iso: string) => new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR");

export function OverviewPage() {
  const s = getSummary();
  const meta = getMeta();
  const rem = getRemuneracao();
  const updated = dateBR(meta.atualizadoEm);
  const cam = s.camara;
  const sen = s.senado;
  const women = (a: typeof cam) => a.porSexo.find((x) => x.rotulo === "Mulheres")?.n ?? 0;
  const parties = s.partidosCongresso;
  const ufRows = Object.keys(UF_NAMES)
    .map((uf) => ({ uf, dep: cam.porUf.find((x) => x.uf === uf)?.n ?? 0, sen: sen.porUf.find((x) => x.uf === uf)?.n ?? 0 }))
    .sort((a, b) => b.dep - a.dep || a.uf.localeCompare(b.uf));
  const maxUf = Math.max(1, ...ufRows.map((r) => r.dep));
  const spendTotal = cam.despesas.total + sen.despesas.total;

  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESC,
    url: absoluteUrl(PATH),
    inLanguage: "pt-BR",
    dateModified: meta.atualizadoEm,
    hasPart: [
      { "@type": "CollectionPage", name: "Deputados federais", url: absoluteUrl("/congresso/deputados") },
      { "@type": "CollectionPage", name: "Senadores", url: absoluteUrl("/congresso/senadores") },
    ],
  };

  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Congresso Nacional", path: PATH }])} />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Congresso Nacional" }]} className="mb-6" />
        <ListingHeader
          label="Congresso Nacional"
          title="Quem está no Congresso hoje"
          description="Diretório dos 513 deputados federais e dos 81 senadores em exercício na 57ª legislatura (2023 a 2027), montado com os dados abertos da Câmara e do Senado. Cada parlamentar tem uma página com votos, gastos, proposições e contato."
          count={`${formatInt(s.totalParlamentares)} parlamentares · dados oficiais, atualizados em ${updated}`}
        />

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatTile label="Deputados federais" value={formatInt(cam.total)} hint={`${formatPct(pct(women(cam), cam.total))} mulheres`} />
          <StatTile label="Senadores" value={formatInt(sen.total)} hint={`${formatPct(pct(women(sen), sen.total))} mulheres`} />
          <StatTile label="Partidos representados" value={formatInt(parties.length)} hint="somando as duas Casas" />
          <StatTile label="Cota usada na legislatura" value={formatBRLShort(spendTotal)} hint="CEAP e CEAPS, desde fev/2023" />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/congresso/deputados" className="card-hover rounded-xl border border-border bg-surface p-5">
            <p className="label-mono text-accent">Câmara dos Deputados</p>
            <p className="mt-1 font-display text-xl font-bold">Ver os 513 deputados federais →</p>
            <p className="mt-1 text-sm text-muted">Busque por nome, partido ou estado.</p>
          </Link>
          <Link href="/congresso/senadores" className="card-hover rounded-xl border border-border bg-surface p-5">
            <p className="label-mono text-accent">Senado Federal</p>
            <p className="mt-1 font-display text-xl font-bold">Ver os 81 senadores →</p>
            <p className="mt-1 text-sm text-muted">Três senadores por estado e pelo Distrito Federal.</p>
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card id="partidos-camara" title="Bancadas na Câmara, por partido" note="Cada barra é o número de deputados que está no partido hoje. Clique na sigla para ver os integrantes.">
            <BarList
              labelWidth="6.5rem"
              items={cam.porPartido.map((p) => ({ label: p.sigla, value: p.n, href: `/congresso/partidos/${partySlug(p.sigla)}`, display: `${p.n} · ${formatPct(pct(p.n, cam.total), 1)}` }))}
            />
          </Card>
          <Card id="partidos-senado" title="Bancadas no Senado, por partido" note="Número de senadores em exercício por partido.">
            <BarList
              labelWidth="6.5rem"
              items={sen.porPartido.map((p) => ({ label: p.sigla, value: p.n, href: `/congresso/partidos/${partySlug(p.sigla)}`, display: `${p.n} · ${formatPct(pct(p.n, sen.total), 1)}` }))}
            />
            {sen.porBloco && sen.porBloco.length > 0 && (
              <>
                <h3 className="mt-6 label-mono text-muted">Blocos parlamentares</h3>
                <BarList className="mt-2" labelWidth="11rem" items={sen.porBloco.map((b) => ({ label: b.rotulo, value: b.n }))} />
              </>
            )}
          </Card>
        </div>

        <Card id="estados" title="Representação por estado" className="mt-6" note="Cada estado e o Distrito Federal elegem 3 senadores. O número de deputados vai de 8 a 70, conforme a população.">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="text-left">
                  <th className="pb-2 label-mono text-muted" scope="col">Estado</th>
                  <th className="pb-2 label-mono text-muted" scope="col">Deputados</th>
                  <th className="pb-2 text-right label-mono text-muted" scope="col">Senadores</th>
                </tr>
              </thead>
              <tbody>
                {ufRows.map((r) => (
                  <tr key={r.uf} className="border-t border-border">
                    <th scope="row" className="w-48 py-1.5 pr-3 text-left font-medium">
                      {UF_NAMES[r.uf]} <span className="font-mono text-xs font-normal text-muted">{r.uf}</span>
                    </th>
                    <td className="py-1.5 pr-3">
                      <span className="flex items-center gap-2">
                        <span className="h-3 flex-1 overflow-hidden rounded-sm bg-surface-2" aria-hidden="true">
                          <span className="block h-full rounded-sm bg-accent" style={{ width: `${(r.dep / maxUf) * 100}%` }} />
                        </span>
                        <span className="w-8 text-right font-mono text-xs tabular-nums">{r.dep}</span>
                      </span>
                    </td>
                    <td className="py-1.5 text-right font-mono text-xs tabular-nums">{r.sen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card id="genero" title="Gênero">
            {[
              ["Câmara", cam],
              ["Senado", sen],
            ].map(([name, agg]) => {
              const a = agg as typeof cam;
              return (
                <div key={name as string} className="mb-4 last:mb-0">
                  <p className="mb-1.5 text-sm font-semibold">{name as string}</p>
                  <StackedBar
                    ariaLabel={`Composição por gênero: ${name as string}`}
                    segments={a.porSexo.map((x, i) => ({ label: x.rotulo, value: x.n, tone: i === 0 ? "a" : i === 1 ? "b" : "e" }))}
                  />
                </div>
              );
            })}
            <p className="mt-3 text-xs text-muted">Classificação conforme o cadastro oficial de cada Casa (masculino/feminino).</p>
          </Card>
          <Card id="idade" title="Faixa etária" note={`Idade média: ${cam.idadeMedia.toLocaleString("pt-BR")} anos na Câmara e ${sen.idadeMedia.toLocaleString("pt-BR")} anos no Senado.`}>
            <p className="mb-1 text-sm font-semibold">Câmara</p>
            <BarList labelWidth="6rem" items={cam.faixasEtarias.map((f) => ({ label: f.rotulo, value: f.n, display: `${f.n} · ${formatPct(pct(f.n, cam.total), 0)}` }))} />
            <p className="mb-1 mt-4 text-sm font-semibold">Senado</p>
            <BarList labelWidth="6rem" items={sen.faixasEtarias.map((f) => ({ label: f.rotulo, value: f.n, display: `${f.n} · ${formatPct(pct(f.n, sen.total), 0)}` }))} />
          </Card>
        </div>

        {cam.escolaridade && (
          <Card id="escolaridade" title="Escolaridade dos deputados" className="mt-6" note="Autodeclarada à Câmara. O Senado não publica escolaridade nos dados abertos de senadores.">
            <BarList labelWidth="14rem" items={cam.escolaridade.map((e) => ({ label: e.rotulo, value: e.n, display: `${e.n} · ${formatPct(pct(e.n, cam.total), 0)}` }))} />
          </Card>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card id="gastos-camara" title="Cota parlamentar na Câmara" note="Valores líquidos reembolsados aos 513 deputados atuais desde fevereiro de 2023 (2026 em andamento).">
            <p className="text-sm text-muted">
              Total: <strong className="text-foreground">{formatBRL(cam.despesas.total)}</strong>
            </p>
            <h3 className="mt-3 label-mono text-muted">Por ano</h3>
            <BarList className="mt-2" labelWidth="3rem" items={cam.despesas.porAno.map((y) => ({ label: String(y.ano), value: y.total, display: formatBRLShort(y.total) }))} />
            <h3 className="mt-4 label-mono text-muted">Maiores categorias</h3>
            <BarList
              className="mt-2"
              labelWidth="minmax(8rem,12rem)"
              items={cam.despesas.porCategoria.slice(0, 6).map((c) => ({ label: c.categoria.charAt(0) + c.categoria.slice(1).toLocaleLowerCase("pt-BR"), value: c.total, display: formatBRLShort(c.total) }))}
            />
          </Card>
          <Card id="gastos-senado" title="CEAPS no Senado" note="Valores reembolsados aos 81 senadores atuais desde fevereiro de 2023 (2026 em andamento).">
            <p className="text-sm text-muted">
              Total: <strong className="text-foreground">{formatBRL(sen.despesas.total)}</strong>
            </p>
            <h3 className="mt-3 label-mono text-muted">Por ano</h3>
            <BarList className="mt-2" labelWidth="3rem" items={sen.despesas.porAno.map((y) => ({ label: String(y.ano), value: y.total, display: formatBRLShort(y.total) }))} />
            <h3 className="mt-4 label-mono text-muted">Maiores categorias</h3>
            <BarList
              className="mt-2"
              labelWidth="minmax(8rem,12rem)"
              items={sen.despesas.porCategoria.slice(0, 6).map((c) => ({ label: c.categoria, value: c.total, display: formatBRLShort(c.total) }))}
            />
          </Card>
        </div>

        <Card id="custo" title="Quanto custa cada parlamentar" className="mt-6" note={`Valores brutos mensais verificados em ${dateBR(rem.verificadoEm)}. ${rem.aviso}`}>
          <ul className="grid gap-3 text-sm sm:grid-cols-2">
            <li>
              <strong>Subsídio:</strong> {formatBRL(rem.subsidio.valor)} por mês, igual para deputados e senadores.{" "}
              <a className="text-accent underline" href={rem.subsidio.fonte.url} target="_blank" rel="noopener noreferrer">
                Fonte
              </a>
            </li>
            <li>
              <strong>Verba de gabinete (Câmara):</strong> até {formatBRL(rem.camara.verbaGabinete.tetoMensal)} por mês para até {rem.camara.verbaGabinete.maxSecretarios} secretários.
            </li>
            <li>
              <strong>Cota (CEAP, Câmara):</strong> de {formatBRL(rem.camara.cota.minimoMensal)} ({rem.camara.cota.minimoUf}) a {formatBRL(rem.camara.cota.maximoMensal)} ({rem.camara.cota.maximoUf}) por mês, conforme o estado.
            </li>
            <li>
              <strong>Auxílio-moradia (Câmara):</strong> {formatBRL(rem.camara.auxilioMoradia.valorMensal)} por mês, para quem não usa apartamento funcional.
            </li>
          </ul>
        </Card>

        <section aria-labelledby="metodologia" className="mt-6 rounded-xl border border-border bg-surface-2/50 p-5 text-sm leading-relaxed text-muted">
          <h2 id="metodologia" className="font-display text-base font-bold text-foreground">
            Fontes e metodologia
          </h2>
          <p className="mt-2">
            Todos os números vêm dos dados abertos oficiais: <a className="text-accent underline" href="https://dadosabertos.camara.leg.br" target="_blank" rel="noopener noreferrer">Câmara dos Deputados</a> e{" "}
            <a className="text-accent underline" href="https://www12.senado.leg.br/dados-abertos" target="_blank" rel="noopener noreferrer">Senado Federal</a>, coletados e atualizados em {updated}. Mostramos só quem está em exercício agora; suplentes que já deixaram o cargo não entram. Os gráficos são descritivos: não ordenam parlamentares por mérito e não usam cores de partido.
          </p>
          <p className="mt-2">
            Votos &quot;sem registro&quot; em votações nominais não equivalem a falta em sessão: não consideram licenças, missões oficiais, trabalho em comissões nem justificativas. A cada perfil explicamos o cálculo. Pode haver divergência entre o momento da coleta e a página oficial; em caso de dúvida, vale a Câmara ou o Senado.
          </p>
          <p className="mt-2">
            Veja também a <Link className="text-accent underline" href="/politica-editorial">política editorial</Link>.
          </p>
        </section>
      </Container>
    </>
  );
}
