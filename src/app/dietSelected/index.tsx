import Button from "@/components/Button/Button";
import ListDiet from "@/components/ListDiet/ListDiet";
import { colors } from "@/styles/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { styles } from "./style";

export default function DietSelected() {
    const router = useRouter();
    const meal = useLocalSearchParams().meal as string;

    const handleNavigation = () => {
        router.back();
    };


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Button title="←" onPress={handleNavigation} style={styles.button} textStyle={styles.btnText} textColor={colors.text} />
                </View>
                <View style={styles.title}>
                    <Text style={styles.text}>{meal.charAt(0).toUpperCase()+ meal.slice(1)}</Text>
                </View>
                <View style={styles.table}>
                    <ListDiet />
                </View>
            </View>
        </View>
    );
}