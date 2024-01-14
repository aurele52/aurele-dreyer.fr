import { clientInfo } from './clientInfo.interface';
import { normalGameInfo } from './shared/normalGameInfo';
import { baseInput } from './baseInput';

export const baseClientInfo: clientInfo = {
  socket: null,
  lobby: null,
  user: '',
  mode: 'normal',
  status: 'connected',
  input: { ...baseInput },
  matchInfo: { ...normalGameInfo },
};
