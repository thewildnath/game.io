// @flow

interface ISystem<P = {}> {
  props: P;
  enabled: boolean;

  onInitialise(props: P): void;
  onPause(): void;
  onResume(): void;
  onStop(): void;
  onUpdate(): void;
}
