import Menu from "@/components/Menu/Menu";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const router = useRouter();
    const user = useLocalSearchParams().pacient as string;

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
                <Text style={styles.subtitle}>Bem-vindo, {user}.</Text>
            </View>
        </View>
    );
}