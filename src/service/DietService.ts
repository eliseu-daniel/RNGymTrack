import HttpService from './HttpService';

class DietService {
    async getDiets() {
        const res = await HttpService.raw<{ diets?: any[] }>('/diets');
        return res?.diets ?? [];
    }

    async getDietItems() {
        const res = await HttpService.raw<{ DietItemData?: any[] }>('/diet-items');
        return res?.DietItemData ?? [];
    }
}

export default new DietService();
