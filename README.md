## Solution

Since I haven't worked with React before I started out researching the different component types, seeing that the project was built using Functional Components yet the Contribution guide suggests using pureComponents.

I quickly found out that in React you mainly use Functional Components or the classical Class component. And pure components are a type of Class component. 

A short summary I made upon my research to understand the difference between them and their use cases.

- FC - a presentational component that does not have its own state nor life-cycle hooks.
- CC - a container component that has its own state and life-cycle hooks.
- PC - state or props are not updated ⇨ therefore, no re-rendering is needed.

### The task

I picked the option of improving an existing component, namely the avatar.

I started out by understanding the context and the code, at that point, I did some restructuring of the components' folder, fixed some little things and commented across the avatar context, improved the code generally of avatar component.

Looking at the context, it did not seem to me that the avatar component would need state nor life-cycle hooks that is why I kept it as a FC. However, the component was very big, almost 200 lines and with lots of different optional props that were used then in a long if/else if statements block. Observing this long list of props, I realized that they could be grouped together based on their combination in the avatar stories. So, for instance, iconKey, isSolid, isSmallIcon, color are used together, that is why I made a component just for them called AvatarIcon. I approached the same way with the rest of the props until I ended up with four small components instead of one big. Also, complex functions that were needed by multiple components were extracted in separate files, in the helpers folder.


## Frontend interview project

As part of our application process, we would like you to complete this take-home assignment. It should take no more than a few hours.

### You have 2 options:
1. Create a new component that you would like us to see and discuss doing the interview.
2. Improve an existing component by modifying it

You can pick one of the options above.

### Task notes
- Consider current task more as a playground, feel free to add/adjust what you think will show off your skills and knowledge in a best way
- The provided components are not examples of complete or ideal components, therefore:
  1. They could be improved on
  2. They could be commented on. It would be also greate if comments question the way we do things or provide an alternative approach
  3. They could be a building block or an inspiration for creating a new custom component, feature

- There is a [contribution guide](https://github.com/Dixa-public//frontend-interview-project/blob/master/CONTRIBUTING.md) that we expect to be mostly followed (or questioned)

### Project setup
1. Fork this repo
2. Run `git clone git@github.com:{USERNAME}/frontend-interview-project.git` to clone a project.
3. Open project directory with `cd frontend-interview-project`
4. Run `npm i` command to install the dependencies.
5. In order to run a storybook issue `npm run storybook`

### Requirements
- [NodeJs](https://nodejs.org)

### Project structure
All of the components are placed in `src/components/` directory. And all of the storybooks are in `src/stories/`.

### Contibuting guide
See our [CONTRIBUTING guide](https://github.com/Dixa-public/frontend-interview-project/blob/master/CONTRIBUTING.md) for details.

### When you are done
When you are ready for us to look at it, give us access to your fork so we can review and run it. When we are done you, of course, own the code you made.

### Implementation details

#### Icon component
Currently `Icon` component internally uses free `font-awesome` icons. Please see [list](https://fontawesome.com/icons?m=free) of expected `name` values.
