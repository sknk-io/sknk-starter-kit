import { GameAppShell } from "../components/layout/GameAppShell";
import { getWorkspaceStatus } from "../lib/sknk/workspace-status";

export default function HomePage() {
  return <GameAppShell status={getWorkspaceStatus()} />;
}
