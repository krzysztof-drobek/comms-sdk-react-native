// @ts-ignore
import Chance from 'chance';
import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DolbyIOContext } from '@components/DolbyIOProvider';
import COLORS from '@constants/colors.constants';
import CommsAPI from '@dolbyio/comms-sdk-react-native';
import Button from '@ui/Button';
import Input from '@ui/Input';
import Space from '@ui/Space';
import Text from '@ui/Text';

import styles from './LoginScreen.style';

const chance = new Chance();

const LoginScreen: FunctionComponent = () => {
  const [name, setName] = useState(`${chance.first()} ${chance.last()}`);
  const [externalId, setExternalId] = useState('');
  const { openSession } = useContext(DolbyIOContext);

  useEffect(() => {
    (async function () {
      try {
        await CommsAPI.conference.leave({ leaveRoom: true });
      } catch (e: any) {
        try {
          await CommsAPI.session.close();
        } catch {}
      }
    })();
  }, []);

  const login = () => {
    console.log(externalId, 'externalId');
    openSession(name, externalId);
  };

  useEffect(() => {
    (async () => {
      try {
        await CommsAPI.conference.leave({ leaveRoom: true });
      } catch (e) {
        try {
          await CommsAPI.session.close();
        } catch (e2) {}
      }
    })();
  }, []);

  return (
    <LinearGradient colors={COLORS.GRADIENT} style={styles.wrapper}>
      <SafeAreaView style={styles.wrapper}>
        <Space mh="m" mv="s">
          <Space mb="l">
            <Text color={COLORS.WHITE} header>
              Dolby.io
            </Text>
            <Text color={COLORS.WHITE} size="s">
              IAPI SDK for React Native
            </Text>
            <Text color={COLORS.WHITE} size="xs" header>
              TEST APP
            </Text>
          </Space>
          <Text color={COLORS.WHITE} header size="s">
            Login
          </Text>
          <Space mt="m">
            <Input label="Your name" onChange={setName} value={name} />
          </Space>
          <Space mt="m">
            <Input
              label="External ID (optional)"
              onChange={setExternalId}
              value={externalId}
            />
          </Space>
          <Space mt="m">
            <Button text="Log in" onPress={login} />
          </Space>
        </Space>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
