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
    name: "sknk-frontend-builder",
    description: "Use the validated contract outputs to build the actual player-facing app in apps/web.",
  },
];

export function SkillFlow() {
  return (
    <section className="section">
      <h2>Skill Flow</h2>
      <ol className="flow-list">
        {FLOW.map((step) => (
          <li key={step.name}>
            <div className="flow-list__name">{step.name}</div>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
