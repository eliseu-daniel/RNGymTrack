import HttpService from './HttpService';

export interface ExerciseData {
  exercise_id: number;
  id: number;
  muscle_group_id: number;
  exercise: string;
  link_exercise: string;
  created_at: string;
  muscle_group_name: string;
}

class ExerciseService {
  async getExercises(id: number) {
    const res = await HttpService.request<{ exercises?: ExerciseData[] }>(`/patients/exercises/${id}`);
    return res?.exercises ?? [];
  }
}

export default new ExerciseService();