import React, { useContext } from "react";
import { Button, Container, Content, Text, H1, Spinner } from "native-base";
import { Share } from "react-native";

import { Context as TriviaContext } from "../context/TriviaContext";

const ResultsScreen = ({ navigation }) => {
  const gameWon = navigation.getParam("gameWon");
  const questions = navigation.getParam("questions");
  const {
    state: { isLoading },
  } = useContext(TriviaContext);

  if (isLoading) {
    return <Spinner color="blue" style={{ alignSelf: "center" }} />;
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Alcance a responder ${questions} preguntas en Preguntados. ¿Crees que puedes superarme?`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Content
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          marginHorizontal: 20,
        }}
      >
        <H1 style={{ textAlign: "center", marginBottom: 20 }}>
          {gameWon ? "YOU WON!" : "YOU LOSE ):"}
        </H1>

        <Button
          onPress={() => {
            navigation.popToTop();
          }}
          rounded
          block
        >
          <Text>Go Home</Text>
        </Button>
        <Button
          onPress={() => {
            onShare();
          }}
          rounded
          block
          style={{ marginTop: 20 }}
        >
          <Text>Share Results</Text>
        </Button>
      </Content>
    </Container>
  );
};

ResultsScreen.navigationOptions = {
  headerShown: false,
};

export default ResultsScreen;
