export interface TikiSdkPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
