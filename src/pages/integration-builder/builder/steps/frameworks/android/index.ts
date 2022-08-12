import { getConstructorCodeAndroid, getLoginCodeAndroid } from "../../../androidSnippets";
import { PLACEHOLDERS } from "../../../commonSnippets";
import { ReplaceFileAggregator, toSteps } from "../../../utils";
import * as configureDeepLink from "./configure-deeplink.mdx";
import * as installationAppManifest from "./install-app-manifest.mdx";
import * as installationBuildGradle from "./install-build-gradle.mdx";
import * as installationAndroid from "./installation.mdx";
import * as instantiate from "./instantiateSDK.mdx";
import * as registerApp from "./register-app.mdx";
import * as setResultURL from "./setResultURL.mdx";
import * as singleTop from "./singleTop.mdx";
import * as triggeringLogin from "./triggering-login.mdx";
import * as triggeringLogout from "./triggering-logout.mdx";

const STEPS = toSteps({
  installationAndroid,
  installationBuildGradle,
  installationAppManifest,
  registerApp,
  configureDeepLink,
  singleTop,
  instantiate,
  setResultURL,
  triggeringLogin,
  triggeringLogout,
});

const reactSteps = {
  STEPS,
  build({ filenames, files, steps, whitelabel, customAuthentication, mfa, dAppShare }) {
    const newFiles = files;
    const replacementAggregator = new ReplaceFileAggregator();

    const FILENAME_MAINACTIVITY = "frameworks/android/MainActivity.kt";

    const ConstructorCodeAndroid = getConstructorCodeAndroid(whitelabel === "yes", customAuthentication === "yes");
    newFiles[FILENAME_MAINACTIVITY] = replacementAggregator.replaceFileVariable(
      files[FILENAME_MAINACTIVITY],
      FILENAME_MAINACTIVITY,
      PLACEHOLDERS.CONSTRUCTOR_CODE,
      ConstructorCodeAndroid
    );

    const LoginCodeAndroid = getLoginCodeAndroid(mfa === "yes", dAppShare === "yes");
    newFiles[FILENAME_MAINACTIVITY] = replacementAggregator.replaceFileVariable(
      files[FILENAME_MAINACTIVITY],
      FILENAME_MAINACTIVITY,
      PLACEHOLDERS.ANDROID_LOGIN_CONFIG,
      LoginCodeAndroid
    );

    filenames.push(FILENAME_MAINACTIVITY);

    filenames.push("frameworks/android/AndroidManifest.xml");
    filenames.push("frameworks/android/build.gradle");
    filenames.push("frameworks/android/settings.gradle");
    filenames.push("frameworks/android/strings.xml");

    steps.push(
      {
        ...STEPS.installationAndroid,
        pointer: { filename: "frameworks/android/settings.gradle", range: "13" },
      },
      {
        ...STEPS.installationBuildGradle,
        pointer: { filename: "frameworks/android/build.gradle", range: "41" },
      },
      {
        ...STEPS.installationAppManifest,
        pointer: { filename: "frameworks/android/AndroidManifest.xml", range: "5" },
      },
      {
        ...STEPS.registerApp,
        pointer: { filename: "frameworks/android/strings.xml", range: "3" },
      },
      {
        ...STEPS.configureDeepLink,
        pointer: { filename: "frameworks/android/AndroidManifest.xml", range: "27-35" },
      },
      {
        ...STEPS.singleTop,
        pointer: { filename: "frameworks/android/AndroidManifest.xml", range: "18" },
      },
      {
        ...STEPS.instantiate,
        pointer: { filename: "frameworks/android/MainActivity.kt", range: "30-40" },
      },
      {
        ...STEPS.setResultURL,
        pointer: { filename: "frameworks/android/MainActivity.kt", range: "52-57" },
      },
      {
        ...STEPS.triggeringLogin,
        pointer: { filename: "frameworks/android/MainActivity.kt", range: "59-70" },
      },
      {
        ...STEPS.triggeringLogout,
        pointer: { filename: "frameworks/android/MainActivity.kt", range: "72-82" },
      }
    );
    return { filenames, files, steps };
  },
};

export default reactSteps;
