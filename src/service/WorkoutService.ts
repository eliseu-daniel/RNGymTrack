import HttpService from './HttpService';

interface WorkoutData {
    id: number;
    workout_type_id: number;
    patient_id: number;
    start_date: string;
    end_date: string;
    finalized_at?: string;
    name: string;
    workout_type_name: string;
}

interface ItemWorkoutData {
    workout_item_id: number;
    id: number;
    workout_id: number;
    exercise_id: number;
    day_of_week: string;
    series: number;
    repetitions: number;
    weight_load: number;
    rest_time: string | null;
    is_active: number;
    exercise_name: string;
}

class WorkoutService {
    async getWorkouts() {
        const res = await HttpService.request<{ WorkoutData?: WorkoutData[] }>('/patients/workouts');
        return res?.WorkoutData ?? [];
    }

    async getWorkoutItems() {
        const res = await HttpService.request<{ ItemWorkoutData?: ItemWorkoutData[] }>('/patients/workout-items');
        return res?.ItemWorkoutData ?? [];
    }
}

export default new WorkoutService();
