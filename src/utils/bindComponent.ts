export function bindComponent(
  component: any,
  element: HTMLElement,
  props?: any
) {
  return new component({
    target: element,
    props: {
      ...props,
    },
  });
}
