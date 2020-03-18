// @flow

export interface ISystem<P = {}> {
  props: P;
  enabled: boolean;

  onInitialise(props: P): void;
  onUpdate(): void;
  onPause(): void;
  onResume(): void;
  onStop(): void;
}
