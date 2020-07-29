# Contributing guidelines

## Table of contents

#### [Writing Components](#writing-components)

- [Use PureComponents whenever possible](#use-purecomponents-whenever-possible)
- [Do not use arrow functions inside class components](#do-not-use-arrow-functions-inside-class-components)
- [Passing props](#passing-props)
- [Using TypeScript](#using-typescript)

#### [Storybook](#storybook)

- [Adding stories](#adding-stories)
- [Using state in story](#using-state-in-story)
- [Testing stories with jest](#testing-stories-with-jest)

#### [Styling](#styling)
- [Scoped CSS/SCSS](#scoped-cssscss)
- [Using CSS modules](#using-css-modules)
- [Root class and modifiers](#root-class-and-modifiers)
- [Modifying child components](#modifying-child-components)
- [Prevent contextual styling in root class](#prevent-contextual-styling-in-root-class)

## Writing Components

### Use PureComponents whenever possible

To increase performance use `PureComponent` whenever the component you write has simple props and state.

`PureComponent` automatically implements `shouldComponentUpdate()` with a shallow props and state comparison and only re-renders if needed. [Read more here](https://reactjs.org/docs/react-api.html#reactpurecomponent).

```js
import React from 'react';

export default class MyComponent extends React.PureComponent {}
```

### Do not use arrow functions inside class components

All of the class components should use methods instead of the arrow functions. See [article](https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1) for details.

##### Do this

```js
class Component extends React.Component {
  increment: () => void; // Add flow type to prevent flow errors for bound methods

  constructor(props) {
    super(props);

    this.increment = this.increment.bind(); // Bind if needed to prevent issue with undefined this
  }

  increment() {/* Your method body */}

}
```

##### Don't do this

```js
class Component extends React.Component {
  increment = () => {/* Your method body */}
}
```

### Passing props

All components should pass down any extra props to the root element so it's easy to add extra event handlers, HTML attributes etc.

Follow this pattern:

```js
render() {
  const {
    headline,
    text,
    ...otherProps
  } = this.props;

  return (
    <div {...otherProps}>
      <h1>{headline}</h1>
      <p>{text}</p>
    </div>
  );
}
```

### Using TypeScript
All of the components are build with TypeScript. Generally all the `props` which component expects are described with TypeScript `interface`:
```typescript
interface Props {
  className?: string;
}

const Component: React.FC<Props> = (props) => {/* Your component */};
```

In order to define global types, [types.d.ts](https://github.com/Dixa-public/frontend-interview-project/blob/master/src/types.d.ts) should be modified.

For other examples, see [existing components](https://github.com/Dixa-public/frontend-interview-project/blob/master/src/components).

## Storybook

### Adding stories
In order to create a new story or modify existing one, please follow the [guide](https://storybook.js.org/docs/basics/writing-stories/) from official sources. Also see [existing samples](https://github.com/Dixa-public/frontend-interview-project/tree/master/src/stories).

### Using state in story
In order to manipulate a story state, use specific [library](https://github.com/Sambego/storybook-state#storybook-state) which provides this functionality.

### Testing stories with jest

All new stories will automatically get a jest snapshot when you run `npm t`, that way the test will fail whenever the result of stories change.

## Styling

### Scoped CSS/SCSS
In order to use a scoped `css/scss`, make sure that styling files include `.module.[css/scss]` part in the filename. This is the pattern matching that `create-react-app` uses internally to create a scoped classNames.
See [existing components](https://github.com/Dixa-public/frontend-interview-project/blob/master/src/components) for samples.

### Using CSS modules

All class names used in the project must use css modules. CSS modules scopes all class names, to prevent conflicts with other parts of the code. To use them, first import your style file:

```js
import styles from './my-styles.scss';
```

The styling will now be scoped, so that this (original css)

```css
.container {
  // styles
}

.headline {
  // styles
}

.text {
  // styles
}
```

becomes something like this (exported css):

```css
.my-styles_container_12345 {
  // styles
}

.my-styles_headline_12345 {
  // styles
}

.my-styles_text_12345 {
  // styles
}
```

The import `styles` variable will be an object literal that contains the scoped class names

```js
{
  container: 'my-styles_container_12345',
  headline: 'my-styles_headline_12345',
  text: 'my-styles_text_12345'
}
```

To use them in React simply pass them in the `className` prop

```js
<div className={styles.container}>
  <h1 className={styles.headline}>Headline</h1>
  <p className={styles.text}>Lorem ipsum dolor</p>
</div>
```

### Root class and modifiers

When creating a new component, always create the rootClass using the `classnames` package. The resulting rootClass should include the root container class name, any modifiers to the component and lastly any passed class names passed from the props to make it possible to [modify child components](#modifying child components).

```js
render() {
  const { className } = this.props;

  const rootClass = classnames({
    [styles.mycomponent]: true,
    [styles.mycomponentModifier]: ifModifier,
    [styles.mycomponentAnotherModifier]: ifAnotherModifier,
  }, className)

  return (
    <div className={rootClass}>
      // component
    </div>
  )
}
```

Always aim to include any modifiers in the root class if possible, even though the root styling does not change based on the modifier.

##### Don't do this

```js
render() {
  const { className } = this.props;

  const rootClass = classnames({
    [styles.mycomponent]: true,
  }, className)

  return (
    <div className={rootClass}>
      <h2 className={classnames({
        [styles.headline]: true,
        [styles.headlineBig]: ifBigHeadline,
      })}>Headline</h2>
    </div>
  )
}
```

```scss
.mycomponent {
  // root styling
}

.headline {
  font-size: 14px;

  &Big {
    font-size: 20px;
  }
}
```

##### Do this

```js
render() {
  const { className } = this.props;

  const rootClass = classnames({
    [styles.mycomponent]: true,
    [styles.mycomponentBig]: ifBig, // Make modifier more general
  }, className)

  return (
    <div className={rootClass}>
      <h2 className={styles.headline}>Headline</h2>
    </div>
  )
}
```

```scss
.mycomponent {
  // root styling
  &Big {
    $big: & !global; // Save selector (.mycomponentBig) in variable
  }
}

.headline {
  font-size: 14px;

  #{$big} & {
    // Use variable to create selector (.mycomponentBig .headline)
    font-size: 20px;
  }
}
```

Sometimes you will have a case where it's just not possible to put all the modifiers in the root class, for example if you have list of elements like below:

```js
render() {
  const { className, someList } = this.props;

  const rootClass = classnames({
    [styles.myList]: true,
  }, className);

  return (
    <ul className={rootClass}>
      { someList.map(item => (
        <li className={classnames({
          [styles.myItem]: true,
          [styles.myItemHighlighted]: item.someBoolean,
        })}>
          {item.title}
        </li>
      ))}
    </ul>
  )
}
```

In these cases split up the component:

```js
// my-item
render() {
  const { className, highlight, children } = this.props;

  const rootClass = classnames({
    [styles.myItem]: true,
    [styles.myItemHighlighted]: highlight,
  }, className);

  return (
    <li className={rootClass}>
      { children }
    </li>
  )
}

// my-list
render() {
  const { className, someList } = this.props;

  const rootClass = classnames({
    [styles.myList]: true,
  }, className);

  return (
    <ul className={rootClass}>
      { someList.map(item => (
        <MyItem highlight={item.someBoolean}>{item.title}</MyItem>
      ))}
    </ul>
  )
}
```

### Modifying child components

Often our components will include child components (e.g. an `Button` inside a `Modal`).

Often we will need to position the child component inside the parent context. For example, we might want some spacing between two `Button` components.

Styling like this should always be done in the parent component by passing a className down to the child component:

```js
import styles from './modal.scss';

//

render() {
  const { className } = this.props;

  const rootClass = classnames({
    [styles.modal]: true,
  }, className)

  return (
    <div className={styles.rootClass}>
      <Button className={styles.button}>No</Button>
      <Button className={styles.button}>Yes</Button>
    </div>
  )
}
```

```scss
// modal.scss

.modal {
  // container styles
}

.button {
  & + & {
    margin-left: 10px; // Add some spacing between buttons
  }
}
```

This way modal never needs to know what class names `Button` has, and we will be able to easily swap the `Button` component(s) without needing to rewrite our css

```js
import styles from './modal.scss';

//

render() {
  const { className } = this.props;

  const rootClass = classnames({
    [styles.modal]: true,
  }, className)

  return (
    <div className={styles.rootClass}>
      <Button className={styles.button}>No</Button>
      // we use a new component, but the button class is still applied
      <FancyButton className={styles.button}>Yes</FancyButton>
    </div>
  )
}
```

### Prevent contextual styling in root class

To be able to modify the the position of our components it is important that we try to prevent contextual styling on the root container, because it can become tricky to overwrite.

```scss
// never use these properties in the root class
margin,
width,
position,
top,
left,
right,
bottom,
transform,

// Try to prevent using these properties
display,
```

If you need a `position: relative` wrapper instead make a wrapper inside the root container, that is position relative.

