import HttpService from './HttpService';

export interface DietData {
    diet_id: number;
    id: number;
    patient_id: number;
    meals_id: number;
    meal_time: string;
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
    meal_id: number;
    meals_name: string;
}

export interface DietItemData {
    diet_item_id: number;
    id: number;
    diet_id: number;
    food_id: number;
    measure: string;
    others: string | null;
    send_notification: number;
    is_active: number;
    food_name: string;
}
class DietService {
    async getDiets() {
        const res = await HttpService.request<{ diets?: DietData[] }>('/patients/diets');
        return res?.diets ?? [];
    }

    async getDietItems() {
        const res = await HttpService.request<{ DietItemData?: DietItemData[] }>('/patients/diet-items');
        return res?.DietItemData ?? [];
    }
}

export default new DietService();
