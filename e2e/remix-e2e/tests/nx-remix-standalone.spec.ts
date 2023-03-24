import {
  ensureNxProject,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('remix standalone e2e', () => {
  beforeAll(() => {
    ensureNxProject('@remix/remix', 'dist/packages/remix');
  });

  afterAll(() => {
    runNxCommandAsync('reset');
  });

  it('should create a standalone remix app', async () => {
    const appName = uniq('remix');
    await runNxCommandAsync(`generate @nrwl/remix:preset ${appName}`);

    const result = await runNxCommandAsync(`build ${appName}`);
    expect(result.stdout).toContain('Successfully ran target build');
  }, 120_000);
});
