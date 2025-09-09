import Button from "@/components/Button/Button";
import Menu from "@/components/Menu/Menu";
import Sidebar from "@/components/Sidebar/Sidebar";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function Training() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    const handleNavigation = (day: string) => {
        router.push({pathname: '/trainingSelected', params: { day }});
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
                {/* trazer o nome da pagina a partir do navigation */}
                <Text style={styles.text}>TREINOS</Text>
            </View>
            <View style={styles.sections}>
                {/* usar map para renderizar a quantidade de botões e os title */}
                <Button title="Segunda" onPress={() => handleNavigation('segunda')} style={styles.button} textStyle={styles.btnText} textColor={colors.text}/>
                <Button title="Terça" onPress={() => handleNavigation('terça')} style={styles.button}   textStyle={styles.btnText} textColor={colors.text}/>
                <Button title="Quarta" onPress={() => handleNavigation('quarta')} style={styles.button}  textStyle={styles.btnText} textColor={colors.text}/>
                <Button title="Quinta" onPress={() => handleNavigation('quinta')} style={styles.button}  textStyle={styles.btnText} textColor={colors.text}/>               
                <Button title="Sexta" onPress={() => handleNavigation('sexta')} style={styles.button}   textStyle={styles.btnText} textColor={colors.text}/>
                <Button title="Sábado" onPress={() => handleNavigation('sabado')} style={styles.button}  textStyle={styles.btnText} textColor={colors.text}/>
                <Button title="Domingo" onPress={() => handleNavigation('domingo')} style={styles.button} textStyle={styles.btnText} textColor={colors.text}/>
            </View>
        </View>
    );
}