## Introduction
This project serves as my first foray into the world of web development. I've always been curious about the potential of popular front-end libraries like Vue, Angular, and React. Learning React has taught me how modern web developers manage design and state throughout an application. The data for each project in this portfolio has been uploaded to Firebase and is dynamically retrieved when the page is loaded. 



## TypeScript vs JavaScript
One of the key decisions made before beginning this project was the choice between using TypeScript or JavaScript. As you might already know, TypeScript is a superset of JavaScript. It needs to be compiled to vanilla JavaScript before it can be executed in a JavaScript engine. While compilation adds some extra overhead before you can deploy and run your code, TypeScript offers a number of different advantages that can be useful for projects of any size.

One of the main advantages to using TypeScript is compile-time validation and type-checking. This feature can save a lot of headache since type errors can slip through the cracks while programming and reveal themselves during runtime.

As defined in its documentation, one core principle of TypeScript is its emphasis on the shape of values. TypeScript provides the `Interface` feature so programmers can align with how its developers intended us to use the language.  

The Virtual DOM in React has a tree-like structure which serves as a blueprint for the application's UI hierarchy. Naturally, data flows down this tree, allowing a subtree's root component to trickle any of the data it has access to down to its child components. Because we're often passing data from parent to child, it's imperative to define the structure of our data so child components know exactly what they will be handling. This is where TypeScript outshines JavaScript. With Interfaces, we can write contracts that explicitly name and define the properties belonging to an object. 

For example, the data related to each project within this portfolio, might look something like the following:
```js
interface ProjectInfo {
    title: string,
    shortDesc: string,
    smallImgURL: string,
    largeImgURL: string,
    githubLink: string,
    recruitersOnly: boolean,
    tags: string[]
}
```



## JSX
JSX can be used with React to produce React elements which React DOM inteprets and renders to the real DOM. What we reutrn from our **Project** component in the following section is an example of JSX syntax.

As described in the spec:
> JSX is an XML-like syntax extension to ECMAScript without any defined semantics.

The difference between a React element and a component should be clear after reading the Components section below.



## Components
Components in React are simply functions that take in some read-only properties (**props**) and return renderable React elements in the form of JSX. Since components are functions, they are inherently modular, and the JSX that they return can be re-used throughout your application.

In the process of defining our component hierarchy, we should be thinking about how granular we want the component decomposition to be. Will we be reusing some piece of the UI in multiple components or areas of our application? If so, it's probably best to separate this piece of the UI into its own individual component so it can be used in different locations.

In any portfolio, we'll hopefully have multiple projects to showcase. It is no question that each portfolio piece should be its own component in the UI hierarchy. Below we have an example of what the Project component might look like in this portfolio. You'll notice the `ProjectInfo` object is being passed in as `props` and the individual properties are being destructured. We have an additional callback function, `toggleProjectClicked`, that is also being passed from the parent component. What we return from this component is a React element that describes the UI.

```js
const Project: React.FC<Props> = props => {
    const {
        title,
        projectID,
        shortDesc,
        smallImgURL,
        tags,
        githubLink,
        recruitersOnly,
        toggleProjectClicked
    } = props;

    return (
        <div className={styles.Project}>
            <Card
                title={title}
                projectID={projectID}
                shortDesc={shortDesc}
                smallImgURL={smallImgURL}
                tags={tags}
                githubLink={githubLink}
                recruitersOnly={recruitersOnly}
                toggleProjectClicked={toggleProjectClicked}
            />
        </div>

    );
}
```

Notice that this **Project** component only has one direct child component, **Card**. You might be able to guess what **Card** will render just by looking at the front page of this portfolio.

One question to ask is why we even needed to create an additional **Project** layer between the **Project** component's parent and the **Card** component if **Project**'s only direct child is **Card**? Why couldn't we make **Card** the direct child of **Project**'s parent? We might make this design choice in case we wanted to add some sort of hover-over modal for each **Project** component in the future. This is simply a case of planning for the future. At some point down the line, our return statement might look more like like the following:


```js
    return (
        <div className={styles.Project}>
            <Card
                ...
            />
            <HoverModal
                ...
            />
        </div>
    )
```



## Lifecycle Methods
Understanding the component lifecycle is crucial for knowing when to update the UI and manipulate the local state of a component. The link below has a neat diagram that depicts the lifecycle methods for React components.

[https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

Before React 16.8, we had to create class components instead of function components in order add side effects in component lifecycle methods like `componentDidMount()` or `componentDidUpdate()`. React 16.8 introduced Hooks, which allow us to "use state and other React features" without writing a class.

Throughout this project, we replace the React class lifecycle methods with the `useEffect()` Hook, which has the power to add side effects in three lifecycle methods: `componentDidMount()`, `componentDidUpdate()`, and `componentWillUnmount()`.

The `useEffect()` Hook runs for every render. We can even return a cleanup function for when the component unmounts to prevent memory leaks in our application. For example, if we subscribe to some kind of service when mounting a component, we'll want to unsubscribe before the component unmounts. `useEffect()` lets us do this easily. We can even optimize performance by skipping side effects when certain dependencies don't change. For example, if our component displays some slice of the state in a textbox on the page, we can tell `useEffect()` that we don't want to trigger the effect unless that slice of the state changes.

We'll see an example of `useEffect()` in the Redux-Saga section.



## Cloud Firestore
Cloud Firestore is a NoSQL cloud database that stores data in the form of documents. You can think of a document as something similar to a JSON object, containing fields or keys that map to values. Collections are simply containers for our documents which make it easier to organize and query them.

In some parts of our code, we'll obtain references to collections or documents which are just locations within the Firestore database. A collection reference can be used to add a document, query for documents, or even obtain a document reference. A document reference can be used to read, write, or listen to the location for changes.

Calling the `get()` method on a collection reference returns a `QuerySnapshot` which contains `DocumentSnapshot` objects if they exist within the Collection. Calling the `docs` property on a `QuerySnapshot` gives us a list of the documents within that Collection. We'll see an example of this in the Redux-Saga section.



## State Management
If we want the UI to be dynamic, we might want to render the output based on something called **state**. While the UI can be dependent on a component's **props** object, **props** are actually immutable. A component is not allowed to change its own props, but is responsible for passing props to child components. 
As per the documentation, unlike **props**, **state** local to a component can be changed by user events, network responses, and other means. Whenever a component's state object changes, the component is re-rendered. Local state is managed using the `setState()` method and can be passed down to child components.

Note, in React 16.8, we can use the `useState()` Hook, which allows us to simultaneously define a initial value for some piece of local state and create a reference to a setter function so we can set that slice of the state at our convenience. 

Here's an example of the `useState()` Hook in action. We initialize the `projectClicked` property of our state to `false` while obtaining a reference to a setter function, `setProjectClicked`.
```js
const [projectClicked, setProjectClicked] = useState(false);
```

Note that in this section, we are referring to local state, or state that can only be mutated by the component it belongs to. The component can choose to pass down the state's value to its children, but a component's parents do not have access to its children's local state. In the next section, we'll take about managing global state, which can be accessed and set by any component hooked up to the "store". 


### Redux
The Redux library allows us to manage state and keep it in the form of a "predictable state container". Our state is stored inside what's referred to as the Redux **Store**. In order to mutate global state, we have to dispatch an `action` object to the store. This `action` object is passed into a function called a `reducer` which determines how the action will modify the application state. Through the store object, we can also retreive state, subscribe, and unsubscribe listeners to the data stored in our state.

We explain the concept of a reducer in more detail below, but in a simple application, to hook up our reducer to the store, we need only call `createStore()` with the reducer as the first argument. We can pass in optional arguments to initalize the state and additional enhancers like middleware (covered in the Redux-Saga section).


#### Actions
From the Redux documentation,
> Actions are payloads of information that send data from your application to your store. You send them to the store using store.dispatch().

The typical structure of an action object has a `type` property and three optional properties, `payload`, `error`, and `meta`. We'll talk about the `type` and `payload` properties since those are most relevant to our needs.
- The `type` property is usually a string descriptor that tells us what type of action is to be performed 
- The `payload` property is additional data that helps us complete the action.

Here are a couple of **action creator**s we have defined in our **store** > **actions** > **projects.tsx**. This file houses all of the action creators related to our projects. An action creator is simply a function that generates an action object for us which we will later pass into the store reducer to mutate state.

```js
const FETCH_PROJECTS_START = 'FETCH_PROJECTS_START'
const FILTER_PROJECTS = 'FILTER_PROJECTS'

export const fetchProjectsStart = () => ({
    type: ProjectsActionTypes.FETCH_PROJECTS_START
});

export const filterProjects = (searchText: string) => ({
    type: ProjectsActionTypes.FILTER_PROJECTS,
    payload: searchText
})
```

The `fetchProjectsStart` action creator does not take any arguments. This means, whenever `fetchProjectsStart` is called, it will generate the exact same action object with a single type property containing the string `'FETCH_PROJECTS_START'`.

The `filterProjects` action creator takes in some string of text that the user has typed into a search bar and returns an action object that tells us the action type to be performed is `'FILTER_PROJECTS'` with the payload as the search string. When our reducer receives the action object, it will look at the type and determine what to do.


#### Reducers
Below, we've shown code that can be found in our **projects** reducer. As the application grows, it might help to define separate reducers to manage different pieces of your state. These smaller reducers can then be combined into a single reducer at the root of your application.

Formally, a reducer is "a pure function that takes the previous state and an action, and returns the next state."
```js
(previousState, action) => nextState
```

The Redux documentation gives us three big no-no's we need to avoid doing inside our reducer:
- Mutate its arguments
- Perform side effects like API calls and routing transitions
- Call non-pure functions, e.g. `Date.now()` or `Math.random()`

The `filteredProjects` property of our state will determine which projects to show on the front page based on what has been typed into the search bar. Some code has been redacted so we can focus on what's going on when we dispatch the `'FILTER_PROJECTS'` action.

**store** > **actions** > **projects.tsx**
```js
const projectsTemplate: { [projectName: string]: ProjectInfo } = {}

const INITIAL_STATE = {
    ...
    filteredProjects: projectsTemplate,
}

const projectContains = (p: ProjectInfo, searchText: string) => {
    if (p.title.toLowerCase().includes(searchText.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(searchText.toLowerCase()) ||
        p.tags.join(" ").includes(searchText.toLowerCase())
    )
        return true;
    return false;
}

const projectsReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        ...
        case ProjectsActionTypes.FILTER_PROJECTS:
            let filtered: { [projectName: string]: ProjectInfo } = {}
            Object.keys(state.projects).forEach(id => {
                if (projectContains(state.projects[id], action.payload))
                    filtered[id] = state.projects[id]
            })
            return {
                ...state,
                filteredProjects: filtered
            };
        default:
            return state;
    }
}

export default projectsReducer;
```

We don't show this above, but by default, `projectsTemplate` will hold all of the projects that can be fetched from Firestore. Imagine we dispatch the `'FILTER_PROJECTS'` action to our reducer with the payload `"python"`. When `projectsReducer` receives the action object, `{ type: ProjectsActionTypes.FILTER_PROJECTS, payload: searchText }`, it uses a `switch` statement on the type to determine the course of action. Here, we have some code to execute in case our action type matches `'FILTER_PROJECTS'`.

Since we aren't allowed to mutate state directly, our goal is to create a state object mirroring our current state with projects filtered based on the search text, `"python"`. We define an empty object that holds our projects. Then we scan through our project list to see if any of the titles, short descriptions, or tags in our projects match our search text. If any provide a match to `"python"`, we add this project to our filtered projects object. When we are done filtering, we use the spread operator on our current state to copy over all of its properties. We then overwrite the `filteredProjects` property with our new filtered projects object. This new object is then returned as the new state.

Once we've defined our actions and reducers, how do we use them in our components? 


#### Usage
Using the `connect()` Higher-Order Component (HOC), a function that wraps a component in a container component, our components can be attached to the Redux store (lots of components, bear with me).

In this project, we won't see any custom HOCs, but we will see Redux's **connect** being used.

A common use case for custom HOCs is abstracting the implementation of components with similar implementation patterns, kind of like a factory method for components. Instead of writing multiple components with similar implementation patterns, we can just implement a single base component. When this base component is wrapped by an HOC, we are returned a new component that implements the base component, with all the details filled in. The original component is never modified. Since an HOC wraps components in a container component, it can only extend the functionality of the original component.

Here's an example of the `connect()` HOC wrapping our **Projects** component. The funny syntax is due to the fact that `connect()` doesn't directly return the wrapped component for us. Instead, it returns a function that will wrap our component with additional merged props.

```js
const mapStateToProps = (state: ProjectsState) => ({
    filteredProjects: state.filteredProjects
})

const mapDispatchToProps = (dispatch: Dispatch<{ type: string }>) => ({
    fetchProjectsStart: () => dispatch(fetchProjectsStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
```

`connect` has four optional arguments:
- `mapStateToProps` is a function that tells the Redux store to subscribe our component as a listener for store updates. State can then be accessed as a property in your component as defined by your `mapStateToProps` implementation.
- `mapDispatchToProps` can be defined as a function that takes `store.dispatch` as an argument and returns an object that holds various functions. These functions serve to dispatch actions of our choosing. We can conveniently access these functions as part of our props when we pass `mapDispatchToProps` into `connect`.
- `mergeProps` is a function that merges the props defined in `mapStateToProps`, `mapDispatchToProps`, with other user-defined props.
- `options` is an object of additional options (surprise!) covered in depth [here](https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md#connect).

In `mapStateToProps`, we have chosen to only pick out the filteredProjects property of our global state object.

In `mapDispatchToProps` we define `fetchProjectsStart` to be a function that dispatches our `'FETCH_PROJECTS_START'` action (see **Actions**, **Redux-Saga** sections).

The props we have defined in `mapStateToProps` and `mapDispatchToProps` are merged with our component's original props when passed as arguments to `connect`. Connect then wraps our `Project` component and injects the merged props.


### Redux-Saga
The Redux documentation provides a nice [article](https://redux.js.org/advanced/middleware) on the concept of middleware. For server-side libraries, middleware is code that is run after a request is received and before a response is generated. Redux middleware is an extension point between dispatching an action and when the action reaches the reducer, where the "response" to our actions are generated. As you can imagine, middleware can be used for a variety of purposes including logging, crash reporting, making asynchronous requests, routing, and more.

Taken directly from the Redux Saga webpage:
> redux-saga is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.
>
> ... a saga is like a separate thread in your application that's solely responsible for side effects. redux-saga is a redux middleware, which means this thread can be started, paused and cancelled from the main application with normal redux actions, it has access to the full redux application state and it can dispatch redux actions as well.

Sagas will be particularly useful for our application since we'll be making asynchronous requests to Firebase to retreive data that fills the portfolio.

Within our `rootSaga`, we'll need to define some generator functions, which are simply functions that can be yielded (paused) and resumed, not necessarily running to completion immediately upon being called. These generator functions typically return iterator objects which have methods like `next()`, allowing the recipient to execute the function until the next yield expression is reached (or termination), returning an object, `{ done: ?, value: ? }`. Luckily for us, these iterator objects are handled by the Redux middleware, so we don't need to worry about pausing and resuming our functions.  

There is some boilerplate involved in creating middleware, connecting it to the store, and running our Saga which can be found in the **index.tsx** file:
```js
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  projectsReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
```

Our generator functions within **rootSaga** are shown below:
```js
export function* fetchProjectsAsync() {
    try {
        const projectsRef = firestore.collection('projects');
        const snapshot = yield projectsRef.get();
        const projectsMap = yield call(
            convertCollectionSnapshotToMap,
            snapshot
        )
        yield put(fetchProjectsSuccess(projectsMap));
    } catch (error) {
        yield put(fetchProjectsFailure(error.message));
    }
}

export function* watchFetchProjectsStart() {
    yield takeLatest(
        ProjectsActionTypes.FETCH_PROJECTS_START,
        fetchProjectsAsync
    );
}

export function* projectsSagas() {
    yield all([call(watchFetchProjectsStart)]);
}
```

The above generator functions are our Sagas which will yield objects to the redux-saga middleware. Whenever the middleware receives a Promise from a yield statement, the Saga is halted until the Promise is resolved.

`watchFetchProjectsStart` is a Saga that yields a Promise from the `takeLatest` helper function. In our case, `takeLatest` listens for the `FETCH_PROJECTS_START` action to be dispatched and starts the task provided as the second argument, `fetchProjectsAsync`. If there are any previously running tasks started by `watchFetchProjectsStart`, `takeLatest` cancels the previous tasks and starts a fresh task. Contrast this to `takeEvery` which would allow us to run multiple `fetchProjectsAsync`s concurrently. For our purposes, we only need to run `fetchProjectsAsync` once. 

`fetchProjectsAsync` grabs a reference to the projects collection within Firestore. The snapshot that we receive by calling the `get` method returns us any existing documents within that collection location. `call` is simply an Effect that instructs the middleware to start a function provided as the first argument along with its own arguments, if any. Another common effect is `put` which instructs the middleware to dispatch a provided action to the store.

`projectsSagas` is a Saga that was created in case we wanted to have multiple Sagas start in parallel. `all` is the helper function that runs all of the Effects passed in as a list, at once. If we had multiple Sagas to start, we might have multiple `call` Effects inside this list. 

`fetchProjectsStart` is used within our **Projects** component to populate the individual **Project** components with data. We're using the `useEffect()` hook which gets called on every render. We specify `fetchProjectsStart` start as a dependency, which means we don't want to call the effect again as long as `fetchProjectsStart` does not change, which cannot happen anyway.

```js
useEffect(() => {
    fetchProjectsStart();
}, [fetchProjectsStart]);
```



## Extras
### Reconciliation: Keys in Lists
Whenever we render list items in React, we'll need to give the elements a **key** attribute. This helps the diffing algorithm determine which children in the Virtual DOM have changed. Using indexes as the **key**s for list elements is generally not a good idea since shifting the order of the list causes React to rerender all elements that have shifted their index, thinking those elements have changed. Instead, we'll want to use a predictable, unique identifier as the **key**. 