import Button from "@/components/Button/Button";
import ListDiet from "@/components/ListDiet/ListDiet";
import DietService from "@/service/DietService";
import { colors } from "@/styles/colors";
import { normalizeMealName } from "@/utils/stringUtils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "./style";

export default function DietSelected() {
    const router = useRouter();
    const { meal } = useLocalSearchParams<{ meal: string }>();

    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadItems() {
            if (!meal) return;

            try {
                setLoading(true);
                const dietItemsByMeal = await DietService.getDietItems();

                const normalizedMeal = normalizeMealName(meal);

                const apiMealKey = Object.keys(dietItemsByMeal).find(key =>
                    normalizeMealName(key) === normalizedMeal
                );

                const mealItems = apiMealKey ? dietItemsByMeal[apiMealKey] : [];
                setItems(mealItems);
            } catch (error) {
                console.error("Erro ao carregar itens da dieta:", error);
                setItems([]);
            } finally {
                setLoading(false);
            }
        }

        loadItems();
    }, [meal]);

    const handleBack = () => {
        router.back();
    };

    const displayTitle = meal || "Refeição";

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                    <Button
                        title="←"
                        onPress={handleBack}
                        style={{ ...styles.button, width: "auto", paddingHorizontal: 16 }}
                        textStyle={styles.btnText}
                        textColor={colors.text}
                    />
                    <Text style={[styles.text, { flex: 1, textAlign: "center", fontSize: 22 }]}>
                        {displayTitle}
                    </Text>
                </View>

                <View style={styles.table}>
                    {loading ? (
                        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
                    ) : (
                        <ListDiet items={items} mealName={displayTitle} />
                    )}
                </View>
            </View>
        </View>
    );
}