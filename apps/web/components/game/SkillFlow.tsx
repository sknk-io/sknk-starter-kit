const FLOW = [
  {
    name: "sknk-game-specification",
    description: "Write the game brief and confirm that the idea fits SKNK before code changes begin.",
  },
  {
    name: "sknk-contract-creation",
    description: "Turn the brief into contracts, validate the Foundry workspace, and emit the frontend handoff files.",
  },
  {
    name: "sknk-frontend-creation",
    description: "Use the validated contract outputs to build the web app.",
  },
];

export function SkillFlow() {
  return (
    <section className="section">
      <h2>Skill Flow</h2>
      <ol className="flow-stepper">
        {FLOW.map((step, index) => (
          <li className="flow-step" key={step.name}>
            <div className="flow-step__rail" aria-hidden="true">
              <span className="flow-step__marker">{index + 1}</span>
            </div>
            <div className="flow-step__content">
              <div className="flow-step__name">{step.name}</div>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
