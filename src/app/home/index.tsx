import Sidebar from "@/components/Sidebar/Sidebar";

export default function Home() {
    return (

        <Sidebar />

        // <View style= {styles.container}>
        //     <View style={styles.header}>
        //         {/* trazer o nome da pagina a partir do navigation */}
        //         <Text style={styles.text}>TREINOS</Text>
        //     </View>
        //     <View style={styles.sections}>
        //         {/* usar map para renderizar a quantidade de botões e os title */}
        //         <Button title="Segunda" style={styles.button} textStyle={styles.btnText} textColor={colors.text}/>
        //         <Button title="Terça" style={styles.button}   textStyle={styles.btnText} textColor={colors.text}/>
        //         <Button title="Quarta" style={styles.button}  textStyle={styles.btnText} textColor={colors.text}/>
        //         <Button title="Quinta" style={styles.button}  textStyle={styles.btnText} textColor={colors.text}/>               
        //         <Button title="Sexta" style={styles.button}   textStyle={styles.btnText} textColor={colors.text}/>
        //         <Button title="Sábado" style={styles.button}  textStyle={styles.btnText} textColor={colors.text}/>
        //         <Button title="Domingo" style={styles.button} textStyle={styles.btnText} textColor={colors.text}/>
        //     </View>
        // </View>
    );
}