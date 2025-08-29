import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Text, View } from "react-native";
import Button from "../Button/Button";
import { styles } from "./style";

export default function Training() {
  const [isChecked, setChecked] = useState(false);
  
    return (
    <View style={styles.container}>
        <View style={styles.FinishTraining}>
            <Button title="Terminar" onPress={() => {}} textStyle={styles.btnFinishTrainingText} style={styles.btnFinish}/>
        </View>
        <View>
            <Text style= {styles.dayOfWeek}>Segunda</Text>
        </View>
        <View>
            <Text style={styles.timer}>Timer</Text> {/* Colocar um timer aqui */}
        </View>
        <View style={styles.trainingContainer}>
            <View>
                <Text style={styles.titleTraining}>Supino Reto</Text>
            </View>
            <View>
                <View style={styles.headerTable}>
                    <Text style={styles.headerTableText} >Série</Text>
                    <Text style={styles.headerTableText} >Anterior</Text>
                    <Text style={styles.headerTableText} >Kg</Text>
                    <Text style={styles.headerTableText} >Rep</Text>
                    <Text style={styles.headerTableText} >Check</Text>
                </View>
                <View style={styles.ColumTable}>
                    <Text style={styles.TableContentText}>1</Text>
                    <Text style={styles.TableContentText}>50 x 8</Text>
                    <Text style={styles.TableContentText}>55</Text>
                    <Text style={styles.TableContentText}>6</Text>
                    <Checkbox value={isChecked} onValueChange={setChecked}  style={styles.checkBox} />
                </View>
                <View style={styles.ColumTable}>
                    <Text style={styles.TableContentText}>2</Text>
                    <Text style={styles.TableContentText}>50 x 8</Text>
                    <Text style={styles.TableContentText}>55</Text>
                    <Text style={styles.TableContentText}>6</Text>
                    <Checkbox value={isChecked} onValueChange={setChecked}  style={styles.checkBox} />
                </View>
                <View style={styles.ColumTable}>
                    <Text style={styles.TableContentText}>3</Text>
                    <Text style={styles.TableContentText}>50 x 8</Text>
                    <Text style={styles.TableContentText}>55</Text>
                    <Text style={styles.TableContentText}>6</Text>
                    <Checkbox value={isChecked} onValueChange={setChecked}  style={styles.checkBox} />
                </View>
                <View style={styles.ColumTable}>
                    <Text style={styles.TableContentText}>4</Text>
                    <Text style={styles.TableContentText}>50 x 8</Text>
                    <Text style={styles.TableContentText}>55</Text>
                    <Text style={styles.TableContentText}>6</Text>
                    <Checkbox value={isChecked} onValueChange={setChecked}  style={styles.checkBox} />
                </View>
            </View>
        </View>
    </View>
  );
}