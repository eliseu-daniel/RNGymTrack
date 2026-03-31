import HttpService from "./HttpService";

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
  async getExercise(id: number): Promise<ExerciseData> {
    const res = await HttpService.request<{
      status: boolean;
      "Exercise:": ExerciseData;
    }>(`/patients/exercises/${id}`);
    return res["Exercise:"];
  }
}

export default new ExerciseService();
