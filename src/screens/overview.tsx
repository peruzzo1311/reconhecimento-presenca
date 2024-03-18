import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { YStack } from 'tamagui';

import { Container, Main, Title, Subtitle, Button, ButtonText } from '../../tamagui.config';
import { RootStackParamList } from '../navigation';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Overview'>;

export default function Overview() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  return (
    <Container>
      <Main>
        <YStack>
          <Title>Hello World</Title>
          <Subtitle>This is the first page of your app.</Subtitle>
        </YStack>
        <Button onPress={() => navigation.navigate('Details', { name: 'Dan' })}>
          <ButtonText>Show Details</ButtonText>
        </Button>
      </Main>
    </Container>
  );
}
