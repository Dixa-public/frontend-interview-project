## Please see our [contributing guide](https://github.com/dixahq/habla/blob/develop/CONTRIBUTING.md#styling-1) (you may want to skip Flow section, since current project features TypeScript instead)

## Using TypeScript
All of the components are build with TypeScript. Generally all the `props` which component expects are described with TypeScript `interface`:
```typescript
interface Props {
  className?: string;
}

const Component: React.FC<Props> = (props) => {/* Your component */};
```

In order to define global types, [types.d.ts](https://github.com/dixahq/frontend-interview-project/blob/master/src/types.d.ts) should be modified.

For other examples, see [existing components](https://github.com/dixahq/frontend-interview-project/blob/master/src/components).
