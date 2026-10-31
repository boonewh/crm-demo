// src/lib/calendarUtils.ts
import type { Interaction } from "@/types";

function escapeCalendarText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\r\n|\r|\n/g, "\\n").replace(/[,;]/g, "\\$&");
}

function foldCalendarLine(line: string): string {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let part = "", bytes = 0;
  for (const character of line) {
    const length = encoder.encode(character).length;
    if (bytes + length > 75) { parts.push(part); part = " "; bytes = 1; }
    part += character; bytes += length;
  }
  return [...parts, part].join("\r\n");
}

export function generateIcsDownloadUrl(interaction: Pick<Interaction, 'follow_up' | 'summary' | 'notes' | 'outcome'> & { id: string | number }): string | undefined {
  if (!interaction.follow_up) return undefined;
  const start = new Date(interaction.follow_up);
  if (!Number.isFinite(start.getTime())) return undefined;
  const stamp = (date: Date) => date.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//PathSix//CRM Demo//EN", "BEGIN:VEVENT",
    `UID:interaction-${escapeCalendarText(String(interaction.id))}@pathsix-crm-demo`, `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`, `DTEND:${stamp(new Date(start.getTime() + 30 * 60000))}`,
    `SUMMARY:${escapeCalendarText(interaction.summary || "Follow-up")}`,
    `DESCRIPTION:${escapeCalendarText([interaction.notes, interaction.outcome].filter(Boolean).join("\n"))}`,
    "END:VEVENT", "END:VCALENDAR", "",
  ];
  return "data:text/calendar;charset=utf-8," + encodeURIComponent(lines.map(foldCalendarLine).join("\r\n"));
}

export function generateGoogleCalendarUrl(i: Interaction): string {
  const title = encodeURIComponent(`Follow-up: ${i.client_name || i.lead_name || "Unknown"}`);
  const details = encodeURIComponent(`Notes: ${i.notes || ""}\nOutcome: ${i.outcome || ""}`);
  const start = new Date(i.follow_up!).toISOString().replace(/[-:]|\.\d{3}/g, "");
  const end = start;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}`;
}

export function generateOutlookComUrl(interaction: Interaction): string {
  if (!interaction.follow_up) return "";

  const title = encodeURIComponent(interaction.summary || "Follow-up");
  const body = encodeURIComponent(interaction.notes || "");
  const start = new Date(interaction.follow_up).toISOString();
  const end = new Date(new Date(interaction.follow_up).getTime() + 30 * 60 * 1000).toISOString(); // +30 mins

  return `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&subject=${title}&body=${body}&startdt=${start}&enddt=${end}`;
}
