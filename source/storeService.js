define(['angular', 'defs'], function(angular, defs) {
  'use strict';

  return angular.module(defs.services)
    .service('storeService', [function() {
      var state = {
        timeStamp: '',
        taskList: [],
        responseList: []
      };

      var listeners = [];

      var combineReducer = function(reducers) {
        var nextState = {},
            hasChanged = false;
        return function(state, action) {
          for(var key in reducers) {
            var reducerForKey = reducers[key],
                previousStateForKey = state[key];
            var nextStateForKey = reducerForKey(previousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
          }
          return hasChanged ? nextState : state;
        }
      }

      var createReducerForAction = function(actionList) {
        return function(state, action) {
          var actionType = action.type;
          if(actionList.indexOf(actionType) >= 0) {
            var handler = actionHandler[action.type];
            return handler ? handler(state, action.payload) : state;
          }
          return state;
        };
      };

      var reducer = combineReducer({
        timeStamp: createReducerForAction(['updateTime']),
        taskList: createReducerForAction(['addTask', 'removeTask', 'clearAll']),
        responseList: createReducerForAction(['addResponse', 'removeResponse'])
      });

      var actionHandler = {
        addTask: function(state, payload) {
          return [ payload ].concat(state).slice(0, 5);
        },
        removeTask: function(state, payload) {
          return state.slice(0, payload).concat(state.slice(payload + 1));
        },
        setTask: function(state, payload) {
          return payload;
        },
        clearAll: function() {
          return [];
        },
        updateTime: function(payload) {
          return payload;
        },
        addResponse: function(state, payload) {
          return [ payload ].concat(state).slice(0, 5);
        },
        removeResponse: function(state, payload) {
          return state.slice(0, payload).concat(state.slice(payload + 1));
        },
      };


      function getState(key) {
        return key ? state[key] : state;
      }

      function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(function(listener) {
          listener();
        });
      }

      function subscribe(listener) {
        listeners.push(listener);
        return function() {
          listeners = listeners.filter(function(l) {
            return l !== listener;
          });
        };
      }

      return {
        getState: getState,
        dispatch: dispatch,
        subscribe: subscribe
      };
    }]);
});
