import { NativeModules } from 'react-native';
import { Participant, ParticipantInfo } from "./conference";

const { RNSessionServiceModule } = NativeModules;

export default class SessionService {
  //TODO make sure open() is also possible
  public async open(participant: ParticipantInfo): Promise<boolean> {
    return RNSessionServiceModule.open(participant);
  }

  public async close(): Promise<boolean> {
    return RNSessionServiceModule.close();
  }

  public async isLocalParticipant(participant: Participant): Promise<boolean> {
    return RNSessionServiceModule.isLocalParticipant(participant);
  }

  public async isSocketOpen(): Promise<boolean> {
    return RNSessionServiceModule.isSocketOpen();
  }
}