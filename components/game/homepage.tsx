import { Button } from "react-native-paper";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export default function HomePage( {onStartGame} : {onStartGame: () => void}) {

  return (
    <ThemedView>
      <ThemedText type="title">Trò chơi đếm số</ThemedText>
      <Button onPress={onStartGame}>Start Game</Button>
    </ThemedView>
  );
}
