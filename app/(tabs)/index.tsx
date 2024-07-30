import { StyleSheet, StatusBar, SafeAreaView } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import Game from "@/components/game/game";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.view}>
      <Game/>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  view: {
    flex: 1,
    padding: 15,
    paddingTop: (StatusBar.currentHeight ?? 0) + 10,
  },
});
