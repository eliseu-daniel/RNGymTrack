import HttpService from './HttpService';

class WorkoutService {
    async getWorkouts() {
        const res = await HttpService.raw<{ WorkoutData?: any[] }>('/workouts');
        return res?.WorkoutData ?? [];
    }

    async getWorkoutItems() {
        const res = await HttpService.raw<{ ItemWorkoutData?: any[] }>('/workout-items');
        return res?.ItemWorkoutData ?? [];
    }
}

export default new WorkoutService();
