import Button from "@/components/Button/Button";
import Menu from "@/components/Menu/Menu";
import Sidebar from "@/components/Sidebar/Sidebar";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const router = useRouter();

    const handleNavigation = () => {
        router.push('/trainingSelected');
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
                <Button title="Segunda" onPress={handleNavigation} style={styles.button} textStyle={styles.btnText} textColor={colors.text}/>
                <Button title="Terça" onPress={handleNavigation} style={styles.button}   textStyle={styles.btnText} textColor={colors.text}/>
                <Button title="Quarta" style={styles.button}  textStyle={styles.btnText} textColor={colors.text}/>
                <Button title="Quinta" style={styles.button}  textStyle={styles.btnText} textColor={colors.text}/>               
                <Button title="Sexta" style={styles.button}   textStyle={styles.btnText} textColor={colors.text}/>
                <Button title="Sábado" style={styles.button}  textStyle={styles.btnText} textColor={colors.text}/>
                <Button title="Domingo" style={styles.button} textStyle={styles.btnText} textColor={colors.text}/>
            </View>
        </View>
    );
}