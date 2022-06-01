import {
  getChainRpcImport,
  getConnectCode,
  getConstructorCode,
  getInitCode,
  getOpenloginAdapter,
  getReactPackageJson,
  getRPCFunctions,
  getRPCFunctionsUIButtonsReact,
  PLACEHOLDERS,
} from "../../../commonSnippets";
import { ReplaceFileAggregator, toSteps } from "../../../utils";
import * as initialize from "../common/initializing.mdx";
// web
import * as installationWeb from "../common/installation.mdx";
import * as instantiateCoreSdk from "../common/instantiateCoreSdk.mdx";
import * as instantiate from "../common/instantiateSDK.mdx";
import * as logout from "../common/logout.mdx";
import * as registerApp from "../common/register-app.mdx";
import * as triggeringLogin from "../common/triggering-login.mdx";
import * as usingRPCFunctions from "../common/using-rpc-functions.mdx";
import * as whiteLabeling from "../common/whitelabeling.mdx";

const STEPS = toSteps({
  installationWeb,
  registerApp,
  instantiate,
  initialize,
  triggeringLogin,
  usingRPCFunctions,
  logout,
  whiteLabeling,
  instantiateCoreSdk,
});

const htmlSteps = {
  STEPS,
  build({ filenames, files, steps, whitelabel, customAuthentication, chain }) {
    const newFiles = files;
    const replacementAggregator = new ReplaceFileAggregator();

    filenames.push("frameworks/vue/package.json");
    filenames.push("frameworks/vue/vue.config.js");
    filenames.push("frameworks/vue/App.vue");

    const vuePackageJson = getReactPackageJson(chain);
    newFiles["frameworks/vue/package.json"] = replacementAggregator.replaceFileVariable(
      files["frameworks/vue/package.json"],
      "frameworks/vue/package.json",
      PLACEHOLDERS.REACT_PACKAGE_JSON,
      vuePackageJson.code
    );

    const ConstructorCode = getConstructorCode(whitelabel === "yes", chain);
    newFiles["frameworks/vue/Home.vue"] = replacementAggregator.replaceFileVariable(
      files["frameworks/vue/Home.vue"],
      "frameworks/vue/Home.vue",
      PLACEHOLDERS.CONSTRUCTOR,
      ConstructorCode.code
    );

    const initRes = getInitCode(whitelabel === "yes", customAuthentication === "yes");
    newFiles["frameworks/vue/Home.vue"] = replacementAggregator.replaceFileVariable(
      files["frameworks/vue/Home.vue"],
      "frameworks/vue/Home.vue",
      PLACEHOLDERS.INIT,
      initRes.code
    );

    const openloginRes = getOpenloginAdapter(whitelabel === "yes", false);
    newFiles["frameworks/vue/Home.vue"] = replacementAggregator.replaceFileVariable(
      files["frameworks/vue/Home.vue"],
      "frameworks/vue/Home.vue",
      PLACEHOLDERS.OPENLOGIN_CONFIGURE,
      openloginRes.code
    );

    const rpcFunctions = getRPCFunctions(chain);
    newFiles["frameworks/vue/Home.vue"] = replacementAggregator.replaceFileVariable(
      files["frameworks/vue/Home.vue"],
      "frameworks/vue/Home.vue",
      PLACEHOLDERS.RPC_FUNCTIONS,
      rpcFunctions.code
    );

    const rpcFunctionsUIButtonsReact = getRPCFunctionsUIButtonsReact(chain);
    newFiles["frameworks/vue/Home.vue"] = replacementAggregator.replaceFileVariable(
      files["frameworks/vue/Home.vue"],
      "frameworks/vue/Home.vue",
      PLACEHOLDERS.RPC_FUNCTIONS_BUTTONS,
      rpcFunctionsUIButtonsReact.code
    );

    const chainImportRes = getChainRpcImport(chain);
    newFiles["frameworks/vue/Home.vue"] = replacementAggregator.replaceFileVariable(
      files["frameworks/vue/Home.vue"],
      "frameworks/vue/Home.vue",
      PLACEHOLDERS.CHAIN_RPC_IMPORT,
      chainImportRes.code
    );

    const connectRes = getConnectCode(customAuthentication === "yes");
    newFiles["frameworks/vue/Home.vue"] = replacementAggregator.replaceFileVariable(
      files["frameworks/vue/Home.vue"],
      "frameworks/vue/Home.vue",
      PLACEHOLDERS.CONNECT,
      connectRes.code
    );

    filenames.push(`frameworks/vue/Home.vue`);
    steps.push(
      {
        ...STEPS.installationWeb,
        pointer: replacementAggregator.rangeOffsetEditor({ filename: "frameworks/vue/package.json", range: "11-12" }),
      },
      {
        ...STEPS.registerApp,
        pointer: replacementAggregator.rangeOffsetEditor({ filename: "frameworks/vue/Home.vue", range: "37" }),
      }
    );
    if (whitelabel === "yes") {
      steps.push({
        ...STEPS.whiteLabeling,
        pointer: replacementAggregator.rangeOffsetEditor({ filename: "frameworks/vue/Home.vue", range: "40-42" }),
      });
    }
    steps.push(
      {
        ...STEPS.instantiate,
        pointer: replacementAggregator.rangeOffsetEditor({ filename: "frameworks/vue/Home.vue", range: "48" }),
      },
      {
        ...STEPS.initialize,
        pointer: replacementAggregator.rangeOffsetEditor({ filename: "frameworks/vue/Home.vue", range: "54" }),
      },
      {
        ...STEPS.triggeringLogin,
        pointer: replacementAggregator.rangeOffsetEditor({
          filename: "frameworks/vue/Home.vue",
          range: "83-91",
        }),
      },
      {
        ...STEPS.usingRPCFunctions,
        pointer: replacementAggregator.rangeOffsetEditor({
          filename: "frameworks/vue/Home.vue",
          range: "100-107",
        }),
      },
      {
        ...STEPS.logout,
        pointer: replacementAggregator.rangeOffsetEditor({
          filename: "frameworks/vue/Home.vue",
          range: "92-99",
        }),
      }
    );

    return { filenames, files, steps };
  },
};

export default htmlSteps;
