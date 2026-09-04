export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-ink-800">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-6 px-12 py-24">
        <div className="col-span-12 lg:col-span-3">
          <h2 id="about-heading" className="label">
            02 &nbsp;/&nbsp; ABOUT
          </h2>
          <div className="mt-5 h-0.5 w-11 bg-gold" />
        </div>

        <div className="col-span-12 lg:col-span-9">
          <p className="max-w-[48ch] font-read text-[clamp(1.35rem,2.2vw,1.75rem)] font-light leading-[1.45] text-paper">
            Senior frontend engineer. Hand me an unfamiliar codebase and a
            loosely-defined problem and I turn it into shipped, tested, monitored code.
          </p>

          <p className="mt-6.5 max-w-[64ch] font-read text-[17px] font-light leading-[1.7] text-paper-mute">
            What I care about is the seam between design and engineering — design
            systems, component libraries, the shared vocabulary that stops a product
            drifting apart. Most of the last four years went into a ~300-component Vue
            application: building features, co-leading its Vue&nbsp;3 migration, and
            rebuilding the deployment and observability infrastructure underneath it.
          </p>

          <p className="mt-5 max-w-[64ch] font-read text-[17px] font-light leading-[1.7] text-paper-mute">
            Sixteen of those years were full-stack .NET, which is mostly why I have
            opinions about the API my components have to consume. The work I am proudest
            of is invisible: the form that survives a dropped connection, the table that
            stays readable at 200% zoom, the test suite that runs in half the time it
            used to.
          </p>
        </div>
      </div>
    </section>
  );
}
