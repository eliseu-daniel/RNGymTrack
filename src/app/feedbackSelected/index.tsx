import Button from "@/components/Button/Button";
import SelectFeedback from "@/components/SelectFeedback/SelectFeedback";
import { colors } from "@/styles/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function FeedbackSelected(){
    const router = useRouter();

    const handleNavigation = () => {
        router.back();
    };

    const toggleSubmit = () => {

    };

    const choice = useLocalSearchParams().choice as string;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Button title="←" onPress={handleNavigation} style={styles.button} textStyle={styles.btnText} textColor={colors.text} />
                </View>
                <View style={styles.title}>
                    <Text style={styles.text}>{choice.charAt(0).toUpperCase() + choice.slice(1)}</Text>
                </View>
                <SelectFeedback />
                <Button title="Enviar" />
            </View>
        </View>
    );
}