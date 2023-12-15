"use client";

import React, { Dispatch, createContext, useReducer } from "react";

type StateType = {
  count: number;
  selectedCategory: string[];
};

type ActionType = {
  type: string;
};

const initialState: StateType = {
  count: 0,
  selectedCategory: [
    "All Products",
    "Accessories",
    "Gift sets",
    "Incense cones",
    "Diffuser",
    "Frankincense",
    "Essential oil",
    "Incense burners",
    "Other",
  ],
};

export const actionType = {
  SET_CATEGORY: "SET_CATEGORY",
};
const reducer = (state: StateType, action: any) => {
  switch (action.type) {
    case actionType.SET_CATEGORY:
      return {
        ...state,
        selectedCategory: action.selectedCategory,
      };
    default:
      return state;
  }
};

// const reducer = (state: StateType, action: any) => {
//   switch (action.type) {
//     case "SET_CATEGORY":
//       return { ...state, selectedCategory: state.selectedCategory };
//     case "DECREMENT":
//       return { ...state, count: state.count - 1 };
//     case "RESET":
//       return { ...state, count: 0 };
//     default:
//       return state;
//   }
// };

export const CounterContext = createContext<{
  state: StateType;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export const CounterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};