export type GanttWeekDay = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";

export type GanttConfig = {
  workingDay: object;
  workingDays: GanttWeekDay[];
  firstDayOfWeek: GanttWeekDay;
  epics: GanttEpicDto[];
};

export type GanttEpicDto = {
  id: number;
  type: "Epic";
  title: string;
  description?: string;
  start: "auto" | Date;
  duration: "auto" | number;
  priority: number;
};

export function createEmptyGanttConfig(): GanttConfig {
  return {
    workingDay: {},
    workingDays: ["Mo", "Tu", "We", "Th", "Fr"],
    firstDayOfWeek: "Mo",
    epics: [],
  };
}

export function isGanttWeekDay(value: string): value is GanttWeekDay {
  return value === "Mo"
    || value === "Tu"
    || value === "We"
    || value === "Th"
    || value === "Fr"
    || value === "Sa"
    || value === "Su";
}
