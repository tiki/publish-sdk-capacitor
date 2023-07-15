export interface TikiSdk {
  echo(options: { value: number }): Promise<{ value: number }>;
}

