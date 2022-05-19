import { toSteps } from "../../../../utils";
import * as initialize from "./initializing.mdx";

const STEPS = toSteps({
  initialize,
});

const chainSteps = {
  STEPS,
  build({ filenames, files, steps, lang }) {
    const newFiles = files;

    filenames.push("starknet/starknet.ts");
    filenames.push("starknet/ArgentAccount.json");

    steps.push({
      ...STEPS.initialize,
      pointer: { filename: "starknet/starknet.ts", range: "30-51" },
    });

    return { files: newFiles, steps, filenames };
  },
};

export default chainSteps;
