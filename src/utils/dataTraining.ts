export type Exercise = {
  id: string;
  title: string;
  series: number;
  rep: number;
  kg: number;
  rest_time?: number | null;
  duration_time?: number | null;
  anterior?: string | null;
  send_notification?: boolean;
};

export type WeekDayKey = | "segunda" | "terça" | "quarta" | "quinta" | "sexta" | "sabado" | "domingo";
export type Week = Record<WeekDayKey, { exercises: Exercise[] }>;
export type DateWeek = Week[];

const dayMap: Record<string, WeekDayKey> = {
  // Short string forms
  seg: "segunda",
  ter: "terça",
  qua: "quarta",
  qui: "quinta",
  sex: "sexta",
  sab: "sabado",
  dom: "domingo",
  // Numeric string forms returned by some APIs (1 = Monday)
  "1": "segunda",
  "2": "terça",
  "3": "quarta",
  "4": "quinta",
  "5": "sexta",
  "6": "sabado",
  "7": "domingo",
};

type ItemWorkout = {
  workout_item_id: number;
  id: number;
  workout_id: number;
  exercise_id: number;
  day_of_week: string;
  series: number;
  repetitions: number;
  weight_load: number | null;
  duration_time: number | null;
  rest_time: number | null;
  send_notification: number;
  is_active: number;
  exercise_name: string;
};

function createEmptyWeek(): Week {
  return {
    segunda: { exercises: [] },
    terça: { exercises: [] },
    quarta: { exercises: [] },
    quinta: { exercises: [] },
    sexta: { exercises: [] },
    sabado: { exercises: [] },
    domingo: { exercises: [] },
  };
}

export function buildWeekFromItems(
  items: ItemWorkout[],
  opts?: { onlyActive?: boolean; workoutId?: number; sortByName?: boolean }
): DateWeek {

  const week = createEmptyWeek();

  const filtered = items
    .filter((it) => (opts?.onlyActive ? it.is_active === 1 : true))
    .filter((it) => (opts?.workoutId ? it.workout_id === opts.workoutId : true));

  for (const it of filtered) {
    const key = dayMap[it.day_of_week];
    if (!key) continue;

    const ex: Exercise = {
      id: String(it.workout_item_id ?? it.id),
      title: it.exercise_name,
      series: it.series,
      rep: it.repetitions,
      kg: it.weight_load ?? 0,
      rest_time: it.rest_time ?? null,
      duration_time: it.duration_time ?? null,
      anterior: null,
      send_notification: it.send_notification === 1,
    };

    week[key].exercises.push(ex);
  }

  if (opts?.sortByName) {
    (Object.keys(week) as WeekDayKey[]).forEach((k) => {
      week[k].exercises.sort((a, b) => a.title.localeCompare(b.title));
    });
  }

  return [week];
}