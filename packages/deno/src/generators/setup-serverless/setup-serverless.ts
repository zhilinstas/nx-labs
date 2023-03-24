import {
  formatFiles,
  GeneratorCallback,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { addAgnosticConfig } from './lib/agnostic';
import { addDenoDeployConfig } from './lib/deno-deploy';
import { addNetlifyConfig } from './lib/netlify';
import { DenoSetupServerlessSchema } from './schema';

export async function denoSetupServerless(
  tree: Tree,
  options: DenoSetupServerlessSchema
) {
  const projectConfig = readProjectConfiguration(tree, options.project);
  let task: GeneratorCallback = () => undefined;

  switch (options.platform) {
    case 'netlify':
      task = addNetlifyConfig(tree, projectConfig);
      break;
    case 'deno-deploy':
      task = addDenoDeployConfig(tree, projectConfig);
      break;
    case 'none':
    default:
      addAgnosticConfig(tree, projectConfig);
      break;
  }

  await formatFiles(tree);
  return task;
}
export default denoSetupServerless;
