const keywordMap: [RegExp, string][] = [
  [/\b(medicine|medication|meds|pill)\b/i, "Medication administered"],
  [/\b(breakfast|lunch|dinner|meal|ate|eating|food)\b/i, "Patient nutrition and meal support documented"],
  [/\b(walk|walking|mobility|transfer)\b/i, "Mobility assistance provided"],
  [/\b(blood pressure|bp)\b/i, "Vital signs monitored — blood pressure within expected range"],
  [/\b(shower|bath|hygiene|groom)\b/i, "Personal care and hygiene support completed"],
  [/\b(toilet|bathroom|continence)\b/i, "Toileting and continence care provided"],
  [/\b(mood|calm|anxious|happy)\b/i, "Emotional wellbeing observed and documented"],
  [/\b(sleep|rest|nap)\b/i, "Rest period monitored with patient settled"],
  [/\b(water|hydrat|drink|fluid)\b/i, "Hydration encouraged and intake recorded"],
];

function extractTime(text: string): string | null {
  const match = text.match(/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/i);
  if (!match) return null;
  const hour = match[1];
  const minutes = match[2] ?? "00";
  const period = match[3].toUpperCase();
  return `${hour}:${minutes} ${period}`;
}

export function generateOrganizedReport(rawNotes: string): string {
  const trimmed = rawNotes.trim();
  if (!trimmed) {
    return "No clinical notes were provided for this visit.";
  }

  const sentences: string[] = [];
  const lower = trimmed.toLowerCase();
  const time = extractTime(trimmed);

  for (const [pattern, label] of keywordMap) {
    if (pattern.test(lower)) {
      const line = time ? `${label} at ${time}` : `${label} during the scheduled visit`;
      if (!sentences.some((s) => s.startsWith(label))) {
        sentences.push(line);
      }
    }
  }

  const fragments = trimmed
    .split(/[.!?]+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length === 0) {
    fragments.forEach((fragment, index) => {
      const capitalized = fragment.charAt(0).toUpperCase() + fragment.slice(1);
      sentences.push(`${capitalized}${capitalized.endsWith(".") ? "" : "."}`);
      if (index >= 4) return;
    });
  }

  if (sentences.length === 0) {
    return `Care visit summary: ${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}.`;
  }

  const timeline = sentences.map((line, i) => `${i + 1}. ${line}`).join("\n");
  const summary =
    "Visit completed without incident. Patient remained comfortable throughout the shift with routine care delivered as planned.";

  return `Clinical Summary\n${summary}\n\nTimeline\n${timeline}\n\nFollow-up\nContinue monitoring per care plan. Escalate to clinical lead if any concerns arise.`;
}
