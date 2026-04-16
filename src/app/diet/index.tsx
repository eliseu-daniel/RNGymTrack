import Button from "@/components/Button/Button";
import Menu from "@/components/Menu/Menu";
import Sidebar from "@/components/Sidebar/Sidebar";
import DietService from "@/service/DietService";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "../../styles/pages/diet/styles";

export default function Diet() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [meals, setMeals] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function loadMeals() {
            try {
                setLoading(true);
                const dietItemsByMeal = await DietService.getDietItems();
                const availableMeals = Object.keys(dietItemsByMeal);
                setMeals(availableMeals);
            } catch (error) {
                console.error("Erro ao carregar refeições:", error);
                setMeals([]);
            } finally {
                setLoading(false);
            }
        }

        loadMeals();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleNavigation = (meal: string) => {
        router.push({ pathname: "/dietSelected", params: { meal } });
    };

    return (
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <Menu toggleSidebar={toggleSidebar} />
            </View>

            {isSidebarOpen && (
                <View style={styles.sidebar}>
                    <Sidebar />
                </View>
            )}

            <View style={styles.header}>
                <Text style={styles.text}>DIETA</Text>
            </View>

            <View style={styles.sections}>
                {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
                ) : meals.length === 0 ? (
                    <Text style={{ textAlign: "center", marginTop: 40, color: "#666", fontSize: 16 }}>
                        Nenhuma refeição cadastrada no momento
                    </Text>
                ) : (
                    meals.map((mealName) => (
                        <Button
                            key={mealName}
                            title={mealName}
                            onPress={() => handleNavigation(mealName)}
                            style={styles.button}
                            textStyle={styles.btnText}
                            textColor={colors.text}
                        />
                    ))
                )}
            </View>
        </View>
    );
}