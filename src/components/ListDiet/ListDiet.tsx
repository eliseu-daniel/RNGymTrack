import { FlatList, Text, View } from "react-native";
import { styles } from "./style";

interface DietItem {
  diet_item_id: number;
  food_name: string;
  quantityItem: number;
  measure: string;
}

interface ListDietProps {
  items: DietItem[];
  mealName?: string;
}

export default function ListDiet({ items, mealName }: ListDietProps) {
  if (items.length === 0) {
    return (
      <Text style={{ textAlign: "center", marginTop: 40, color: "#666" }}>
        Nenhum alimento cadastrado para {mealName || "esta refeição"}
      </Text>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => String(item.diet_item_id)}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.cell}>{item.food_name}</Text>
          <Text style={styles.cell}>
            {item.quantityItem} {item.measure}
          </Text>
        </View>
      )}
    />
  );
}