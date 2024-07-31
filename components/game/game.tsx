import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { Button } from "react-native-paper";

const Message = ({ message }: { message: string }) => <ThemedText type="subtitle" >{message}</ThemedText>;

export default function Game( {onEndGame} : {onEndGame: (didWin: boolean) => void}) {
  
  const [currentNumber, setCurrentNumber] = useState(95);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isBotTurn, setIsBotTurn] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [displayMessage, setDisplayMessage] = useState<string | null>(null);

  const isClap = (number: number) => {
    return number % 3 === 0 || number.toString().includes("3");
  };

  const updateDisplayMessage = (message: string, nextNumber: number) => {

    setCurrentNumber(nextNumber + 1);
    setDisplayMessage(message);

    setButtonPressed(true);
    setIsPlayerTurn(false);
    
    setTimeout(() => {
      setIsBotTurn(true);
      setButtonPressed(false);
      setDisplayMessage(null);
      handleBotTurn(currentNumber + 1);
    }, 700);

  };

  const handlePlayerCount = () => {
    if (isClap(currentNumber + 1)) {
      onEndGame(false);
    } else {
      updateDisplayMessage((currentNumber + 1).toString(), currentNumber);
    }
  };

  const handlePlayerClap = () => {
    if (isClap(currentNumber + 1)) {
      updateDisplayMessage("Bộp!", currentNumber);
    } else {
      onEndGame(false);
    }
  };

  const handleBotTurn = (newNumber: number) => {
    if (newNumber >= 100) return onEndGame(true);

    if (isClap(newNumber + 1)) setDisplayMessage("Bộp!");

    else setDisplayMessage((newNumber + 1).toString());

    setTimeout(() => {
      setIsBotTurn(false);
      setDisplayMessage(null);
      setCurrentNumber(newNumber + 1);
      setIsPlayerTurn(true);
    }, 700); // Show message for 1 second

  };

  return (
    <ThemedView style={styles.gameContainer}>
      <ThemedView>
        <ThemedText type="title" style={styles.bot}>
          Máy:
        </ThemedText>
        {isBotTurn && displayMessage && <Message message={displayMessage} />}
      </ThemedView>
      <ThemedView style={styles.playerContainer}>
        {isPlayerTurn && (
          <ThemedView style={styles.buttonContainer}>
            <Button mode="outlined" onPress={handlePlayerCount}>
              Count
            </Button>
            <Button mode="outlined" onPress={handlePlayerClap}>
              Clap
            </Button>
          </ThemedView>
        )}
        <ThemedView style={styles.playerCountContainer}>
          {buttonPressed && displayMessage && (
            <Message message={displayMessage} />
          )}
        </ThemedView>
        <ThemedText type="title" style={styles.player}>
          Người chơi:
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bot: {
    textAlign: "center",
  },
  player: {
    textAlign: "center",
  },
  playerContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  gameContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
  playerCountContainer: {
    justifyContent: "flex-end",
  },
});
