import { AppStorage } from './modules/AppStorage';
import DeviceInfo from 'react-native-device-info';
import { AppConfig } from './modules/AppConfig';
import { Platform } from 'react-native';

export type AppConfigVars = {
  // tonapiTestnetHost: string;
  // tonapiProdHost: string;
  // tonapiDevHost: string;
  // tonapiAuthToken: string;
  tonapiIOEndpoint: string;
  tonapiV2Endpoint: string;
  tonApiV2Key: string;
  tonApiKey: string;
  transactionExplorer: string;
  tonapiTestnetHost: string;
  tronapiHost: string;
  tronapiTestnetHost: string;
  batteryHost: string;
  batteryTestnetHost: string;
  batteryMeanFees: string;
  disable_battery: boolean;
  disable_battery_iap_module: boolean;
  disable_battery_send: boolean;
  disable_show_unverified_token: boolean;
};

const defaultConfig: Partial<AppConfigVars> = {
  tonapiTestnetHost: 'https://testnet.tonapi.io',
  tonapiIOEndpoint: 'https://keeper.tonapi.io',
  tonapiV2Endpoint: 'https://tonapi.io',
  tronapiHost: 'https://tron.tonkeeper.com',
  tronapiTestnetHost: 'https://testnet-tron.tonkeeper.com',
  batteryHost: 'https://battery.tonkeeper.com',
  batteryTestnetHost: 'https://testnet-battery.tonkeeper.com',
  batteryMeanFees: '0.08',
  disable_battery: true,
  disable_battery_iap_module: true,
  disable_battery_send: true,
  disable_show_unverified_token: false,
};

export const config = new AppConfig<AppConfigVars>({
  storage: new AppStorage(),
  defaultConfig,
  request: {
    host: 'https://boot.tonkeeper.com/keys',
    params: () => ({
      build: DeviceInfo.getReadableVersion(),
      platform: Platform.OS,
    }),
  },
});
