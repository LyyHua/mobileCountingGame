import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { Button } from "react-native-paper";

const BotMessage = ({ message }: { message: string }) => <Text>{message}</Text>;
const PlayerMessage = ({ message }: { message: string }) => (
  <Text>{message}</Text>
);
export default function Game() {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isBotTurn, setIsBotTurn] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [displayMessage, setDisplayMessage] = useState<string | null>(null);

  const isClap = (number: number) => {
    return number % 3 === 0 || number.toString().includes("3");
  };

  const handlePlayerCount = () => {
    if (isClap(currentNumber + 1)) {
      Alert.alert("Error", "You should have clapped!");
    } else {
      setCurrentNumber((prevNumber) => {
        const newNumber = prevNumber + 1;
        setDisplayMessage(newNumber.toString());
        setButtonPressed(true);
        setIsPlayerTurn(false);
        setTimeout(() => {
          setIsBotTurn(true);
          setButtonPressed(false);
          setDisplayMessage(null);
          handleBotTurn(newNumber);
        }, 800); // Bot's turn after 1 second
        return newNumber;
      });
    }
  };

  const handlePlayerClap = () => {
    if (isClap(currentNumber + 1)) {
      setCurrentNumber((prevNumber) => {
        const newNumber = prevNumber + 1;
        setDisplayMessage("Bộp!");
        setIsPlayerTurn(false);
        setButtonPressed(true);
        setTimeout(() => {
          setIsBotTurn(true);
          setButtonPressed(false);
          setDisplayMessage(null);
          handleBotTurn(newNumber);
        }, 800); // Bot's turn after 1 second
        return newNumber;
      });
    } else {
      Alert.alert("Error", "You should have counted!");
    }
  };

  const handleBotTurn = (newNumber: number) => {
    if (newNumber >= 100) return; // End game if number reaches 100

    if (isClap(newNumber + 1)) {
      setDisplayMessage("Bộp!");
    } else {
      setDisplayMessage((newNumber + 1).toString());
    }
    setTimeout(() => {
      setIsBotTurn(false);
      setDisplayMessage(null);
      setCurrentNumber(newNumber + 1);
      setIsPlayerTurn(true);
    }, 800); // Show message for 1 second
  };

  return (
    <ThemedView style={styles.gameContainer}>
      <ThemedView>
        <ThemedText type="title" style={styles.bot}>
          Máy:
        </ThemedText>
        {isBotTurn && displayMessage && <BotMessage message={displayMessage} />}
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
            <PlayerMessage message={displayMessage} />
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
