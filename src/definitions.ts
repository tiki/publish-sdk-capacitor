export interface TikiSdkPlugin {
  createLicense(options: { value: string }): Promise<{ value: string }>;
}
