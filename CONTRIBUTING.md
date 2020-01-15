## Please see our [contributing guide](https://github.com/dixahq/habla/blob/develop/CONTRIBUTING.md) (you may want to skip Flow section, since current project features TypeScript instead)

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

## Scoped CSS/SCSS
Other than [Styling section](https://github.com/dixahq/habla/blob/develop/CONTRIBUTING.md#styling-1) in contributing guide from above. In order to use a scoped `css/scss`, make sure that styling files include `.module.[css/scss]` part in the filename. This is the pattern matching that `create-react-app` uses internally to create a scoped classNames.
See [existing components](https://github.com/dixahq/frontend-interview-project/blob/master/src/components) for samples.

## Adding a storybook
In order to create a new story or modify existing one, please follow the [guide](https://storybook.js.org/docs/basics/writing-stories/) from official sources. Also see [existing samples](https://github.com/dixahq/frontend-interview-project/tree/master/src/stories).
