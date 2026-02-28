import type { DietData, DietItemData } from "@/service/DietService";

export type DietFood = {
  id: string;
  name: string;
  measure: string;
  others?: string | null;
  send_notification?: boolean;
};

export type DietMeal = {
  diet_id: number;
  meal_id: number;
  meal_name: string;
  meal_time: string;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
  foods: DietFood[];
};

export type DietPlan = {
  start_date: string;
  end_date: string;
  finalized_at?: string;
  goal_weight?: string;
  objective?: string;
  diet_type?: string;
  meals: DietMeal[];
};

export function buildDietPlan(
  diets: DietData[],
  items: DietItemData[],
  opts?: { onlyActive?: boolean; dietId?: number; sortFoodsByName?: boolean }
): DietPlan[] {

  const itemsByDietId = new Map<number, DietItemData[]>();

  for (const it of items) {
    if (opts?.onlyActive && it.is_active !== 1) continue;
    if (!itemsByDietId.has(it.diet_id)) itemsByDietId.set(it.diet_id, []);
    itemsByDietId.get(it.diet_id)!.push(it);
  }

  const filteredDiets = diets.filter((d) => (opts?.dietId ? d.id === opts.dietId || d.diet_id === opts.dietId : true));

  const plans: DietPlan[] = filteredDiets.map((d) => {
    const its = itemsByDietId.get(d.id) ?? itemsByDietId.get(d.diet_id) ?? [];

    const foods: DietFood[] = its.map((it) => ({
      id: String(it.diet_item_id ?? it.id),
      name: it.food_name,
      measure: it.measure,
      others: it.others,
      send_notification: it.send_notification === 1,
    }));

    if (opts?.sortFoodsByName) {
      foods.sort((a, b) => a.name.localeCompare(b.name));
    }

    const meal: DietMeal = {
      diet_id: d.diet_id ?? d.id,
      meal_id: d.meal_id ?? d.meals_id,
      meal_name: d.meals_name,
      meal_time: d.meal_time,
      calories: d.calories,
      proteins: d.proteins,
      carbohydrates: d.carbohydrates,
      fats: d.fats,
      foods,
    };

    return {
      start_date: d.start_date,
      end_date: d.end_date,
      finalized_at: d.finalized_at,
      goal_weight: d.goal_weight,
      objective: d.objective,
      diet_type: d.diet_type,
      meals: [meal],
    };
  });

  return plans;
}