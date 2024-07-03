export const pnpWebVersion = `8.7.x`;
export const pnpAndroidVersion = `8.0.x`;
export const pnpIOSVersion = `9.0.x`;
export const pnpRNVersion = `6.0.x`;
export const pnpFlutterVersion = `5.0.x`;
export const pnpUnityVersion = `2.1.x`;
export const pnpUnrealVersion = `4.1.x`;

export const sfaWebVersion = `8.0.x`;
export const sfaAndroidVersion = `0.0.6`;
export const sfaIOSVersion = `5.0.x`;
export const sfaRNVersion = `2.0.x`;
export const sfaFlutterVersion = `2.0.x`;
export const sfaNodeJSVersion = `7.4.x`;
export const tkeyJSVersion = `12.x.x`;
export const tkeyAndroidVersion = `0.0.5`;
export const tkeyIOSVersion = `0.0.4`;
export const mpcCoreKitVersion = `2.3.x`;

import {
  web,
  android,
  ios,
  reactnative,
  flutter,
  unity,
  unreal,
  corekitnodejs,
  mpccorekit,
  singlefactorauth,
  singlefactorauthandroid,
  singlefactorauthflutter,
  singlefactorauthios,
  singlefactorauthrn,
  tkeyandroid,
  tkeyios,
  tkeyjs,
} from "./SDKOptions";

export function getPnPVersion(platform: string) {
  if (platform === web) {
    return pnpWebVersion;
  }
  if (platform === android) {
    return pnpAndroidVersion;
  }
  if (platform === ios) {
    return pnpIOSVersion;
  }
  if (platform === reactnative) {
    return pnpRNVersion;
  }
  if (platform === flutter) {
    return pnpFlutterVersion;
  }
  if (platform === unity) {
    return pnpUnityVersion;
  }
  if (platform === unreal) {
    return pnpUnrealVersion;
  }
}

export function getCoreKitVersion(sdk: string) {
  if (sdk === tkeyjs) {
    return tkeyJSVersion;
  }
  if (sdk === mpccorekit) {
    return mpcCoreKitVersion;
  }
  if (sdk === tkeyandroid) {
    return tkeyAndroidVersion;
  }
  if (sdk === tkeyios) {
    return tkeyIOSVersion;
  }
  if (sdk === singlefactorauth) {
    return sfaWebVersion;
  }
  if (sdk === corekitnodejs) {
    return sfaNodeJSVersion;
  }
  if (sdk === singlefactorauthandroid) {
    return sfaAndroidVersion;
  }
  if (sdk === singlefactorauthios) {
    return sfaIOSVersion;
  }
  if (sdk === singlefactorauthrn) {
    return sfaRNVersion;
  }
  if (sdk === singlefactorauthflutter) {
    return sfaFlutterVersion;
  }
}
