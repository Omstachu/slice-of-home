## 1 Uncaught in promise
    - caused by the route being incorrect in the thunk action creator
    - seems to also be caused by posting non unique values for signup

## 2 Issues with date and migrations.
    -Date needs a Date object
    -can't use "08" because javascript hates leading zeros in strict mode
    -new Date(2022, 3, 1), use this format for any date. Other formats exist. Month is zero indexed btw

-------
# Bug Fixing for MVP 1

### When a new Spot is created, the first time the user navigates to the page through /spots
  * TypeError: Cannot read property '0' of undefined
   ```
     const name = spot[id]?.name
    const description = spot[id]?.description
    let image;
    if (spot[id]?.Images[0]?.url){
        image = spot[id]?.Images[0]?.url
    } else {
        image = null
    }
   ```

   * error fixed by checking to see if spot[id]?.Images exists

   ```
   if (spot[id]?.Images){
        if (spot[id]?.Images[0]?.url){
            image = spot[id]?.Images[0]?.url
        }
    } else {
        image = null
    }
    ```

### When trying to access /spots/:id with an Id that doesn't exist you get:
 * Unhandled Rejection (TypeError): Cannot read property 'id' of null
 ```
    case ADD_ONE: {
            if (!state[action.spot.id]) {
                const newState = {
                    ...state,
                    [action.spot.id]: action.spot
 ```


### Redux Store Dev tools not working. getting a No Store Found.


### state.spot[id] sometimes just doesn't work

## Heroku wasn't building because of a line in my index.html
