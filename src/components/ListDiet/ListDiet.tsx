import dietService from "@/service/DietService";
import { colors } from "@/styles/colors";
import { buildDietPlan, DietFood } from "@/utils/dataDiets";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { styles } from "./style";

export default function ListDiet() {

    const [foods, setFoods] = useState<DietFood[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDiet() {
            try {
                setLoading(true);
                const diets = await dietService.getDiets();
                const items = await dietService.getDietItems();
                const plans = buildDietPlan(diets, items, {
                    onlyActive: true,
                });
                const firstMeal = plans?.[0]?.meals?.[0];
                setFoods(firstMeal?.foods ?? []);
            } catch (error) {
                console.log("Erro carregando dieta:", error);
            } finally {
                setLoading(false);
            }
        }
        loadDiet();
    }, []);

    if (loading) {
        return (
            <View>
                <ActivityIndicator color={colors.secondary} size="large" />
            </View>
        );
    }

    return (
        <FlatList
            data={foods}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.row}>
                    <Text style={styles.cell}>
                        {item.name}
                    </Text>
                    <Text style={styles.cell}>
                        {item.measure}
                        {item.others ? ` - ${item.others}` : ""}
                    </Text>
                </View>
            )}
            ListEmptyComponent={
                <Text style={{ marginTop: 10 }}>
                    Nenhum alimento encontrado
                </Text>
            }
        />
    );
}

// import { Text, View } from "react-native";
// import { styles } from "./style";

// export default function ListDiet(){
//     return (
//         <View>
//             <View style={styles.row}>
//                 <Text style={styles.cell}>Abacaxi</Text>
//                 <Text style={styles.cell}> 2 fatias médias</Text>
//             </View>
//             <View style={styles.row}>
//                 <Text style={styles.cell}>Suco de Laranja</Text>
//                 <Text style={styles.cell}> 200ml</Text>
//             </View>
//             <View style={styles.row}>
//                 <Text style={styles.cell}>Pão de forma</Text>
//                 <Text style={styles.cell}> 2 fatias</Text>
//             </View>
//         </View>
//     );
// }