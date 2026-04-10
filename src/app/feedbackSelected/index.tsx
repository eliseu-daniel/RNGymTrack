import Button from "@/components/Button/Button";
import DietService from "@/service/DietService";
import FeedbackService from "@/service/FeedbackService";
import WorkoutService from "@/service/WorkoutService";
import { buildWeekFromItems, WeekDayKey } from "@/utils/dataTraining";
import { colors } from "@/styles/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { styles } from "./styles";

type OptionItem = {
    id: number;
    label: string;
    diet_id?: number;
};

export default function FeedbackSelected() {
    const router = useRouter();
    const { choice } = useLocalSearchParams<{ choice: string }>();

    const [openSelect, setOpenSelect] = useState(false);
    const [selectedItem, setSelectedItem] = useState<OptionItem | null>(null);
    const [comment, setComment] = useState("");
    const [options, setOptions] = useState<OptionItem[]>([]);
    const [loadingOptions, setLoadingOptions] = useState(true);

    const title = useMemo(() => {
        if (!choice) return "";
        return choice.charAt(0).toUpperCase() + choice.slice(1);
    }, [choice]);

    const orderedOptions = useMemo(() => {
        if (!selectedItem) return options;

        const selected = options.find((item) => item.id === selectedItem.id);
        const others = options.filter((item) => item.id !== selectedItem.id);

        return selected ? [selected, ...others] : options;
    }, [options, selectedItem]);

    const handleNavigation = () => {
        router.back();
    };

    const toggleSubmit = async () => {
        try {
            if (!selectedItem) {
                console.log("Selecione uma opção antes de enviar.");
                return;
            }

            if (!comment.trim()) {
                console.log("Digite um comentário antes de enviar.");
                return;
            }

            if (choice === "treino") {
                await FeedbackService.sendWorkoutFeedback({
                    workout_item_id: selectedItem.id,
                    comment: comment.trim(),
                    send_notification: 1,
                });
            }

            if (choice === "dieta") {
                if (!selectedItem.diet_id) {
                    console.log("Dieta não encontrada para a opção selecionada.");
                    return;
                }

                await FeedbackService.sendDietFeedback({
                    diet_id: selectedItem.diet_id,
                    comment: comment.trim(),
                    send_notification: 1,
                });
            }

            console.log("Feedback enviado com sucesso.");
            router.back();
        } catch (error: any) {
            Alert.alert("Não foi possível enviar o feedback. Tente novamente.");
        }
    };

    const handleSelectItem = (item: OptionItem) => {
        setSelectedItem(item);
        setOpenSelect(false);
    };

    useEffect(() => {
        async function loadOptions() {
            try {
                setLoadingOptions(true);

                if (choice === "treino") {
                    const workoutItems = await WorkoutService.getWorkoutItems();

                    const normalizedItems = workoutItems.map((item) => ({
                        ...item,
                        rest_time: item.rest_time ? Number(item.rest_time) : null,
                        duration_time: null,
                        send_notification: 0,
                    }));

                    const built = buildWeekFromItems(normalizedItems, { onlyActive: true });

                    const dayLabels: Record<WeekDayKey, string> = {
                        segunda: "Segunda",
                        "terça": "Terça",
                        quarta: "Quarta",
                        quinta: "Quinta",
                        sexta: "Sexta",
                        sabado: "Sábado",
                        domingo: "Domingo",
                    };

                    const week = built[0];

                    const availableDays: OptionItem[] = week
                        ? (Object.keys(week) as WeekDayKey[])
                              .filter((day) => (week[day]?.exercises?.length ?? 0) > 0)
                              .map((day) => ({
                                  id: Number(week[day].exercises[0].id),
                                  label: dayLabels[day] ?? (day.charAt(0).toUpperCase() + day.slice(1)),
                              }))
                        : [];

                    setOptions(availableDays);

                    if (availableDays.length > 0) {
                        setSelectedItem(availableDays[0]);
                    }
                }

                if (choice === "dieta") {
                    const dietItemsByMeal = await DietService.getDietItems();

                    const meals: OptionItem[] = Object.entries(dietItemsByMeal).map(([mealName, items]) => {
                        const firstItem = items[0];

                        return {
                            id: Number(firstItem?.id ?? Math.random()),
                            label: mealName,
                            diet_id: firstItem?.diet_id,
                        };
                    });

                    setOptions(meals);

                    if (meals.length > 0) {
                        setSelectedItem(meals[0]);
                    }
                }
            } catch (error) {
                console.error("Erro ao carregar opções do feedback:", error);
            } finally {
                setLoadingOptions(false);
            }
        }

        loadOptions();
    }, [choice]);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Button
                        title="←"
                        onPress={handleNavigation}
                        style={styles.button}
                        textStyle={styles.btnText}
                        textColor={colors.text}
                    />
                </View>

                <View style={styles.title}>
                    <Text style={styles.text}>{title}</Text>
                </View>

                <View style={styles.formArea}>
                    {loadingOptions ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color={colors.text} />
                        </View>
                    ) : (
                        <>
                            <View style={styles.selectWrapper}>
                                <Pressable
                                    onPress={() => setOpenSelect((prev) => !prev)}
                                    style={[
                                        styles.selectButton,
                                        openSelect && styles.selectButtonOpen,
                                    ]}
                                >
                                    <Text style={styles.selectButtonText}>
                                        {selectedItem?.label ?? "Escolha uma opção"}
                                    </Text>

                                    <Text style={styles.selectArrow}>
                                        {openSelect ? "▲" : "▼"}
                                    </Text>
                                </Pressable>

                                {openSelect && (
                                    <View style={styles.selectDropdown}>
                                        <ScrollView
                                            style={styles.selectScroll}
                                            nestedScrollEnabled
                                            showsVerticalScrollIndicator
                                        >
                                            {orderedOptions.map((item) => (
                                                <Pressable
                                                    key={item.id}
                                                    onPress={() => handleSelectItem(item)}
                                                    style={styles.optionItem}
                                                >
                                                    <Text style={styles.optionText}>{item.label}</Text>
                                                </Pressable>
                                            ))}
                                        </ScrollView>
                                    </View>
                                )}
                            </View>

                            {!openSelect && (
                                <>
                                    <Text style={styles.label}>Comentário:</Text>

                                    <TextInput
                                        value={comment}
                                        onChangeText={setComment}
                                        multiline
                                        textAlignVertical="top"
                                        style={styles.textArea}
                                        placeholder=""
                                        placeholderTextColor="#666"
                                    />
                                </>
                            )}
                        </>
                    )}

                    <Button
                        title="Enviar"
                        onPress={toggleSubmit}
                        style={styles.submitButton}
                        textStyle={styles.submitButtonText}
                        textColor={colors.text}
                    />
                </View>
            </View>
        </View>
    );
}