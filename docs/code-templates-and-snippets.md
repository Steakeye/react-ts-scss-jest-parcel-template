# Code Templates and Snippets
This document is a reference of common patterns of code used in a typical UI application with a lean towards functional 
and React patterns. The purpose of this is to act as a companion library adjacent to the source code which can be used 
to copy over boilerplate code where it's not possible to easily create a solution that encapsulates a problem in some 
reusable code.

## Stateful hooks, using the React reducer
The following pattern lays out a snsible separation of logic when creating custom hooks that use the `useReducer` hook 
to handle state during the lifetime of a component.

```javascript
function createInitialState(props) {
  return { internalvalue: true, ...props }
}
   
function handleActionX(state, action) {
    return { ...state, ...action.data };    
}

function myHookdReducer(state, action) {
  let updfatedState;

  switch (action.type) {
    case 'x': {
      updfatedState = handleActionX(state, action);
    }
    default: {
      updfatedState = state;
    }   
  }

  return updfatedState;
}
   
function createHandler(initialProps, dispatch, fun) {
  return (props) => { 
    if(props.fun) {
        //Could be async 
        const result = fun({ ...initialProps, ...props });
        dispatch(result);
    } else {
        dispatch(props);    
    }   
  }
}
   
function extraTask(props) {
 return props.arr.map((item) => !!item)
}
   
export function useMyHook(props) {
  const [state, dispatcher] = useReducer(myHookReducer, createIntialState(props));

  const handler = createHandler(props, dispatcher, extraTask());

  useEffect(() => {
    if (!state.internalValue) {
      handler({ value: 'something' });
    }
  }, [state]);

  return { state, handler };
}
```