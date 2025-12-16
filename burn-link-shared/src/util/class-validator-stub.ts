type Decorator = () => (
  target: any,
  context: ClassFieldDecoratorContext,
) => void;
const decorator: Decorator = () => () => {};

export const IsDefined = decorator;
export const IsString = decorator;
