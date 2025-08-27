import { colors } from '@/styles/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from "react-native";
import { styles } from './styles';

type MenuProps = {
    toggleSidebar: () => void;
}

export default function Menu({ toggleSidebar }: MenuProps) {
    return (
       <View style={styles.icon}>
           <TouchableOpacity onPress={toggleSidebar}>
               <MaterialIcons name="menu" size={35}  color={colors.text}/>
           </TouchableOpacity>
        </View>
    );
}