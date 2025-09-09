import Menu from "@/components/Menu/Menu";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

type HomeProps = {
    pacient: string;
}

export default function Home({pacient}: HomeProps) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const router = useRouter();

    const handleNavigation = (day: string) => {
        router.push('/trainning');
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
                <Text style={styles.title}>GymTrackPro</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>Bem-vindo, {pacient}.</Text>
            </View>
        </View>
    );
}