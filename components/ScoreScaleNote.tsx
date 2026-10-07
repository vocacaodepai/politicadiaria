const SCALE = [
  { range: "Até 6,9", label: "Leitura com ressalva", text: "Tem valor, mas um ponto fraco real (viés, datação, texto arrastado) pesa na decisão." },
  { range: "7,0 a 7,9", label: "Bom, vale a leitura", text: "Sem defeito grave; é a faixa onde cai a maioria das indicações daqui." },
  { range: "8,0 a 8,9", label: "Muito bom", text: "Se destaca de verdade dentro do próprio tema, por rigor, clareza ou originalidade." },
  { range: "9,0 a 10", label: "Essencial", text: "Poucos livros chegam aqui; referência no assunto, recomendada sem ressalva." },
];

/**
 * Explica a régua de nota 0-10 das resenhas de livros. A nota "quebrada"
 * (ex.: 7,8) é intencional, não erro de arredondamento: mostra a diferença
 * real entre dois livros que, em estrelas inteiras, pareceriam empatados.
 */
export function ScoreScaleNote() {
  return (
    <section aria-labelledby="como-funciona-a-nota" className="mt-6 rounded-xl border border-border bg-surface p-5 sm:p-6">
      <p className="label-mono text-muted">Como ler a nota</p>
      <h2 id="como-funciona-a-nota" className="mt-1 font-display text-lg font-bold tracking-tight sm:text-xl">
        Nota de 0 a 10, com casa decimal de propósito
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
        A nota não é a avaliação de estrelas da Amazon: é a nossa análise editorial do livro, considerando
        clareza, profundidade, rigor das fontes, atualidade e fluidez de leitura. A casa decimal (ex.: 7,8) é
        proposital: mostra a diferença entre dois livros que, arredondados, pareceriam iguais. A nota avalia a
        qualidade da obra, nunca concorda ou discorda da posição política do autor.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SCALE.map((s) => (
          <div key={s.range} className="rounded-lg border border-border bg-background p-3.5">
            <p className="font-mono text-xs font-semibold text-accent">{s.range}</p>
            <p className="mt-1 font-display text-sm font-semibold">{s.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
