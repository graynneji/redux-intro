const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

//customer reducer
export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

//action creators for customer
export function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

export function updatingName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

//   store.dispatch(createCustomer("Ukaegbu Gray", "28348349893"));
//   console.log(store.getState());
