const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

//role of reducer is to calculate the new state based on the current state and action
//reducer are not allowed to do any asynchronus logic or other side effect
//are not allowed to modify the existing state
//place as much logic as possible inside of them
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });

// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buy a Car" },
// });
// console.log(store.getState());

// //in redux you dont write the action types like this { type: "account/payLoan" } instead you create what we call an action creator
// //redux will work without action creators but its a convention
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

//Action creator for each
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  //Thunk
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    //API

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    console.log(data);

    const converted = data.rates.USD;

    //return the action
    dispatch({ type: "account/deposit", payload: converted });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: 1000, purpose: "Buy a Car" },
  };
}

export function payLoan() {
  return {
    type: "account/payLoan",
  };
}

//   store.dispatch(deposit(500));

//   store.dispatch(withdraw(200));
//   console.log(store.getState());

//   store.dispatch(requestLoan(1000, "Buy a cheap car"));
//   console.log(store.getState());

//   store.dispatch(payLoan());
//   console.log(store.getState());
