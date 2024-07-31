import { Button } from "react-native-paper";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export default function YouLosePage({ onResetGame }: { onResetGame: () => void }) {
  return (
    <ThemedView>
      <ThemedText>You Lose!</ThemedText>
      <Button onPress={onResetGame}>Quay lại</Button>
    </ThemedView>
  );
}
