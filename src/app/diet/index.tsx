import Button from "@/components/Button/Button";
import Menu from "@/components/Menu/Menu";
import Sidebar from "@/components/Sidebar/Sidebar";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function Diet() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    const handleNavigation = (meal: string) => {
        router.push({pathname: '/dietSelected', params: { meal }});
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
                <Text style={styles.text}>DIETA</Text>
            </View>
            <View style={styles.sections} >
                <Button title="Café da Manhã" onPress={() => handleNavigation("Café da Manhã")} style={styles.button} textStyle={styles.btnText} textColor={colors.text}/>
                <Button title="Lanche da Manhã" onPress={() => handleNavigation("Lanche da Manhã")} style={styles.button} textStyle={styles.btnText} textColor={colors.text} />
                <Button title="Almoço" onPress={() => handleNavigation("Almoço")} style={styles.button} textStyle={styles.btnText} textColor={colors.text} />
                <Button title="Lanche da Tarde" onPress={() => handleNavigation("Lanche da Tarde")} style={styles.button} textStyle={styles.btnText} textColor={colors.text} />
                <Button title="Jantar" onPress={() => handleNavigation("Jantar")} style={styles.button} textStyle={styles.btnText} textColor={colors.text} />
                <Button title="Ceia" onPress={() => handleNavigation("Ceia")} style={styles.button} textStyle={styles.btnText} textColor={colors.text} />
            </View>
        </View>
    );
}   