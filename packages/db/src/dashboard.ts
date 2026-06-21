import type { DashboardSummary, ParticipantSessionRecord } from "@diamom/contracts";

export function buildDashboardSummary(
  totalRespondents: number,
  sessions: ParticipantSessionRecord[],
): DashboardSummary {
  if (sessions.length === 0) {
    return {
      averageDelta: 0,
      averageVasAfter: 0,
      averageVasBefore: 0,
      totalRespondents,
      trendCounts: {
        decrease: 0,
        increase: 0,
        stable: 0,
      },
    };
  }

  let beforeTotal = 0;
  let afterTotal = 0;
  let deltaTotal = 0;
  let decrease = 0;
  let increase = 0;
  let stable = 0;

  for (const session of sessions) {
    const delta = session.beforeScore - session.afterScore;
    beforeTotal += session.beforeScore;
    afterTotal += session.afterScore;
    deltaTotal += delta;

    if (delta > 0) {
      decrease += 1;
    } else if (delta < 0) {
      increase += 1;
    } else {
      stable += 1;
    }
  }

  return {
    averageDelta: roundToTwo(deltaTotal / sessions.length),
    averageVasAfter: roundToTwo(afterTotal / sessions.length),
    averageVasBefore: roundToTwo(beforeTotal / sessions.length),
    totalRespondents,
    trendCounts: {
      decrease,
      increase,
      stable,
    },
  };
}

function roundToTwo(value: number): number {
  return Number(value.toFixed(2));
}
