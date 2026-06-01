type Handler = () => void;

let handler: Handler | null = null;

export function onAuthUnauthorized(fn: Handler): () => void {
  handler = fn;
  return () => {
    if (handler === fn) {
      handler = null;
    }
  };
}

export function emitAuthUnauthorized(): void {
  handler?.();
}
