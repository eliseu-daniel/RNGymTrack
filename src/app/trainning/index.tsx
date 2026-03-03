import Button from "@/components/Button/Button";
import Menu from "@/components/Menu/Menu";
import Sidebar from "@/components/Sidebar/Sidebar";
import httpWorkout from "@/service/WorkoutService";
import { colors } from "@/styles/colors";
import { buildWeekFromItems, WeekDayKey } from "@/utils/dataTraining";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "./styles";

export default function Training() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const [week, setWeek] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const handleNavigation = (day: string) => {
        router.push({ pathname: '/trainingSelected', params: { day } });
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const items = await httpWorkout.getWorkoutItems();
                const built = buildWeekFromItems(items, { onlyActive: true });
                setWeek(built);
            } catch (e) {
                console.log("Erro carregando dias de treino:", e);
                setWeek([]);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    const availableDays = useMemo(() => {
        if (!week || week.length === 0) return [] as WeekDayKey[];
        const w = week[0];
        return (Object.keys(w) as WeekDayKey[]).filter((d) => (w[d]?.exercises?.length ?? 0) > 0);
    }, [week]);

    const dayLabels: Record<WeekDayKey, string> = {
        segunda: "Segunda",
        "terça": "Terça",
        quarta: "Quarta",
        quinta: "Quinta",
        sexta: "Sexta",
        sabado: "Sábado",
        domingo: "Domingo",
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
                {/* trazer o nome da pagina a partir do navigation */}
                <Text style={styles.text}>TREINOS</Text>
            </View>
            <View style={styles.sections}>
                {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} />
                ) : availableDays.length === 0 ? (
                    <Text style={{ textAlign: "center", marginTop: 40, color: "#666", fontSize: 16 }}>
                        Nenhum dia de treino disponível
                    </Text>
                ) : (
                    availableDays.map((day) => (
                        <Button
                            key={day}
                            title={dayLabels[day] ?? (day.charAt(0).toUpperCase() + day.slice(1))}
                            onPress={() => handleNavigation(day)}
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