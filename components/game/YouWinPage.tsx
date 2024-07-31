import { Button } from "react-native-paper";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export default function YouWinPage({ onResetGame }: { onResetGame: () => void }) {
  return (
    <ThemedView>
      <ThemedText>Bạn thắng!</ThemedText>
      <Button onPress={onResetGame}>Quay lại</Button>
    </ThemedView>
  )
}