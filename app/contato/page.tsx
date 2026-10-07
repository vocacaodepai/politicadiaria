import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { InstitutionalPage, institutionalMetadata } from "@/components/InstitutionalPage";
import { site } from "@/lib/articles";
import { author } from "@/lib/author";

const PATH = "/contato";
const TITLE = "Contato";
const DESCRIPTION =
  "Fale com a redação da Política Diária: correções, sugestões de pauta, dados de parlamentares incorretos, parcerias, imprensa e pedidos sobre dados pessoais (LGPD). Resposta em até 5 dias úteis. Não damos opinião jurídica nem orientação de voto.";

const REASONS = [
  {
    id: "correcoes",
    subject: "Correção",
    title: "Correções",
    text: "Achou um dado errado, um link quebrado ou uma afirmação que não se sustenta? Mande o link da página e o trecho. Erros confirmados são corrigidos e o texto ganha a marcação de atualização.",
  },
  {
    id: "dados-de-parlamentares",
    subject: "Dado de parlamentar incorreto",
    title: "Dados de parlamentares incorretos",
    text: "Viu um voto, uma ausência, um gasto, uma foto ou uma informação de deputado ou senador que parece errada no Congresso por dentro? Mande o link da página, o dado e, se possível, o link da fonte oficial. Conferimos com a Câmara ou o Senado e corrigimos. Se o erro estiver na própria fonte, indicamos isso na página.",
  },
  {
    id: "sugestoes-de-pauta",
    subject: "Sugestão de pauta",
    title: "Sugestões de pauta",
    text: "Um assunto da política que ninguém explica direito, uma votação que merece contexto, um livro que merece resenha, um dado do Congresso que faltou. Quanto mais específico o pedido, maior a chance de virar pauta. Indique a fonte, se tiver, e não envie dados pessoais.",
  },
  {
    id: "parcerias",
    subject: "Parceria",
    title: "Parcerias e publicidade",
    text: "Propostas de anúncio, afiliação ou conteúdo em conjunto. Vale ler antes as regras em publicidade e afiliados: conteúdo pago nunca é publicado como notícia ou resenha.",
  },
  {
    id: "imprensa",
    subject: "Imprensa",
    title: "Imprensa",
    text: "Pedidos de entrevista, comentário ou uso de trechos do site em outras publicações. Informe o veículo e o prazo.",
  },
  {
    id: "dados-pessoais-lgpd",
    subject: "Dados pessoais (LGPD)",
    title: "Dados pessoais (LGPD)",
    text: "Pedidos de acesso, correção, exclusão ou informação sobre dados pessoais, como prevê a Lei Geral de Proteção de Dados. O encarregado é a própria redação e a resposta sai em até 15 dias.",
  },
] as const;

function ContactCard() {
  return (
    <section aria-labelledby="canal-de-contato" className="rounded-xl border border-border bg-surface p-5">
      <h2 id="canal-de-contato" className="label-mono text-muted">
        Ou por e-mail
      </h2>
      <a
        href={`mailto:${author.email}`}
        className="mt-3 block break-all font-display text-lg font-bold tracking-tight text-accent hover:underline"
      >
        {author.email}
      </a>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="label-mono text-muted">Quem responde</dt>
          <dd className="mt-1">
            <Link href={author.url} className="font-medium hover:text-accent">
              {author.name}
            </Link>
            , redação do site
          </dd>
        </div>
        <div>
          <dt className="label-mono text-muted">Prazo</dt>
          <dd className="mt-1">Até 5 dias úteis (pedidos LGPD: até 15 dias)</dd>
        </div>
        <div>
          <dt className="label-mono text-muted">Idioma</dt>
          <dd className="mt-1">Português</dd>
        </div>
      </dl>
    </section>
  );
}

export const metadata: Metadata = institutionalMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function ContatoPage() {
  return (
    <InstitutionalPage
      label="Institucional"
      title={TITLE}
      lead="A Política Diária não tem central de atendimento: tem um e-mail, lido pela redação. Preencha o formulário ao lado e você recebe resposta em até 5 dias úteis."
      path={PATH}
      type="ContactPage"
      aside={
        <div className="space-y-6">
          <section aria-labelledby="formulario-de-contato" className="rounded-xl border border-border bg-surface p-5">
            <h2 id="formulario-de-contato" className="label-mono text-muted">
              Fale com a gente
            </h2>
            <div className="mt-3">
              <ContactForm />
            </div>
          </section>
          <ContactCard />
        </div>
      }
    >
      <p>
        O canal oficial de contato do site é o formulário ao lado, que chega direto na caixa de
        entrada da redação, ou o e-mail{" "}
        <a href={`mailto:${author.email}`}>
          <strong>{author.email}</strong>
        </a>
        . Não há telefone, WhatsApp nem perfis em redes sociais oficiais do {site.name}. Se alguém
        falar em nome do site por outro canal, desconfie.
      </p>
      <p>
        Respondemos em até 5 dias úteis. Mensagens de correção e pedidos sobre dados pessoais têm
        prioridade.
      </p>

      <h2 id="para-que-serve">Para que serve este canal</h2>
      {REASONS.map((r) => (
        <section key={r.id} aria-labelledby={r.id}>
          <h3 id={r.id}>{r.title}</h3>
          <p>{r.text}</p>
        </section>
      ))}

      <h2 id="o-que-nao-e-respondido">O que não é respondido</h2>
      <p>
        Por favor, não envie documentos, dados bancários ou senhas pelo formulário ou por e-mail.
      </p>
      <ul>
        <li>Pedidos de troca de links ou de publicação de guest post genérico.</li>
        <li>Ofertas de &quot;conteúdo patrocinado sem aviso&quot; ou de nota comprada em resenha de livro.</li>
        <li>
          <strong>Opinião jurídica e orientação de voto</strong>: não damos opinião jurídica nem
          orientação de voto ou de campanha. Para questões legais, procure um advogado; para
          questões eleitorais, o TSE e a Justiça Eleitoral.
        </li>
        <li>
          <strong>Contato com parlamentares</strong>: não somos canal de nenhum gabinete. Para falar
          com um deputado ou senador, use os canais oficiais da Câmara e do Senado.
        </li>
        <li>Suporte de pedidos ou entregas da Amazon e de outras lojas: cada uma tem o seu atendimento.</li>
      </ul>

      <h2 id="antes-de-escrever">Antes de escrever</h2>
      <p>
        Muitas dúvidas já estão respondidas em <Link href="/sobre">sobre o site</Link>, na{" "}
        <Link href="/politica-editorial">política editorial</Link>, em{" "}
        <Link href="/publicidade-e-afiliados">publicidade e afiliados</Link> e na{" "}
        <Link href="/politica-de-privacidade">política de privacidade</Link>. Para achar um artigo
        específico, use a <Link href="/busca">busca</Link>.
      </p>
    </InstitutionalPage>
  );
}
