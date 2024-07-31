import { StyleSheet, StatusBar, SafeAreaView } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import Game from "@/components/game/game";
import HomePage from "@/components/game/homepage";
import { useState } from "react";
import YouWinPage from "@/components/game/YouWinPage";
import YouLosePage from "@/components/game/YouLosePage";

export default function HomeScreen() {

  const [isGame, setIsGame] = useState(false);
  const [didWin, setDidWin] = useState<boolean | null>(null);

  const handleGameEnd = (didWin: boolean) => {
    setDidWin(didWin);
  };

  const handleResetGame = () => {
    setDidWin(null);
    setIsGame(false);
  }

  return (
    <ThemedView style={styles.view}>
      {!isGame && didWin === null && <HomePage onStartGame={() => setIsGame(true)} />}
      {isGame && didWin === null && <Game onEndGame={handleGameEnd}/>}
      {didWin === true && <YouWinPage onResetGame={handleResetGame}/>}
      {didWin === false && <YouLosePage onResetGame={handleResetGame}/>}
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
