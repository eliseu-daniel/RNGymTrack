import HttpService from './HttpService';

export interface DietData {
    diet_id: number;
    id: number;
    patient_id: number;
    diet_type: string;
    goal_weight: string;
    objective: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
    start_date: string;
    end_date: string;
    finalized_at?: string;
}

export interface DietItem {
    diet_item_id: number;
    id: number;
    food_id: number;
    meal_id: number;
    meals_name: string;
    quantityItem: number;
    measure: string;
    others: string | null;
    send_notification: number;
    is_active: number;
    created_at: string;
    updated_at: string;
    food_name: string;
}

export type DietItemsByMeal = Record<string, DietItem[]>;
class DietService {
    async getDiets() {
        const res = await HttpService.request<{ diets?: DietData[] }>('/patients/diets');
        return res?.diets ?? [];
    }

    async getDietItems(): Promise<DietItemsByMeal> {
        const res = await HttpService.request<{ status: boolean; DietItemData?: DietItemsByMeal }>(
            '/patients/diet-items'
        );
        return res?.DietItemData ?? {};
    }
}

export default new DietService();
