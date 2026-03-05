import Button from "@/components/Button/Button";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { Linking, Pressable, Text, View } from "react-native";

import { styles } from "./style";

export default function Video() {
    const handleBack = () => {
        router.back();
    };

    const youtubeUrl = "https://www.youtube.com/watch?v=YiP-Zhk5YMk";

    const openYoutube = async () => {
        try {
            const ok = await Linking.canOpenURL(youtubeUrl);
            if (!ok) { return; }
            await Linking.openURL(youtubeUrl);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Button title="←" onPress={handleBack} style={styles.button} textStyle={styles.btnText} textColor={colors.text} />
                <Text style={styles.textBlue}>Supino Reto</Text>
                <Text style={styles.text}>Execução:</Text>
                <View style={styles.link}>
                    <Pressable onPress={openYoutube}>
                        <Text style={styles.linkText}>{youtubeUrl}</Text>
                    </Pressable>
                </View>
                <View style={styles.videoContent}>
                    <View style={styles.video}>
                        <Text>video</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}