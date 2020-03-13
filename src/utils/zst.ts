export function zst(callback: () => void): void {
  setTimeout(() => {
    callback();
  }, 0);
}
