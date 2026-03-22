import HttpService from "./HttpService";

export interface SendWorkoutFeedbackPayload {
    workout_item_id: number;
    comment: string;
    send_notification?: number;
}

export interface SendDietFeedbackPayload {
    diet_id: number;
    comment: string;
    send_notification?: number;
}

export interface FeedbackResponse<T = any> {
    status: boolean;
    message?: string;
    data?: T;
    DataFeedback?: T;
}

class FeedbackService {
    async sendWorkoutFeedback(
        payload: SendWorkoutFeedbackPayload
    ): Promise<FeedbackResponse> {
        return await HttpService.request<FeedbackResponse>(
            "/patients/workout-feedbacks",
            "POST",
            {
                body: {
                    workout_item_id: payload.workout_item_id,
                    comment: payload.comment,
                    send_notification: payload.send_notification ?? 1,
                },
            }
        );
    }

    async sendDietFeedback(
        payload: SendDietFeedbackPayload
    ): Promise<FeedbackResponse> {
        return await HttpService.request<FeedbackResponse>(
            "/patients/diet-feedbacks",
            "POST",
            {
                body: {
                    diet_id: payload.diet_id,
                    comment: payload.comment,
                    send_notification: payload.send_notification ?? 1,
                },
            }
        );
    }
}

export default new FeedbackService();