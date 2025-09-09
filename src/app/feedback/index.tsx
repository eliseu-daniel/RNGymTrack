import Button from "@/components/Button/Button";
import Menu from "@/components/Menu/Menu";
import Sidebar from "@/components/Sidebar/Sidebar";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function FeedBacks() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    const handleNavigation = (day: string) => {
        router.push({pathname: '/dietSelected', params: { day }}); // trocar para feedbackSelected
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <View style= {styles.container}>
            <View style={styles.menuContainer}>
                <Menu toggleSidebar={toggleSidebar} />
            </View>
            {isSidebarOpen && (
                <View style={styles.sidebar}>
                    <Sidebar />
                </View>
            )}
            <View style={styles.header}>
                <Text style={styles.text}>FEEDBACK</Text>
            </View>
            <View style={styles.sections} >
                <Button title="Treino" onPress={() => handleNavigation("treino")} style={styles.button} textStyle={styles.btnText} textColor={colors.text}/>
                <Button title="Dieta" onPress={() => handleNavigation("dieta")} style={styles.button} textStyle={styles.btnText} textColor={colors.text} />
            </View>
        </View>
    );
}   