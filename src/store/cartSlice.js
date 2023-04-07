import { createSlice, current } from "@reduxjs/toolkit";

const getItemIndex = (state, idToFind) => {
  const idsArr = state.goods.map(item => item.good._id);
  return idsArr.indexOf(idToFind);
}
const initialState = {
  goods: [],
  totalAmount: 0,
  goodsCount: 0
}

function calculateTotalAmounts(state, currentState) {
  state.totalAmount = currentState.goods.reduce((totalAmount, item) => totalAmount + item.good.price * item.count, 0);
  state.goodsCount = currentState.goods.reduce((goodsCount, item) => goodsCount + item.count, 0);
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addGoodToCart(state, action) {
      const itemIndex = getItemIndex(state, action.payload.good._id);
      if (itemIndex && itemIndex < 0)
        state.goods.push(action.payload);
      else {
        state.goods[itemIndex].count += +action.payload.count;
      }
      calculateTotalAmounts(state, current(state));
    },
    decreaseGoodCount(state, action) {
      const itemIndex = getItemIndex(state, action.payload.good._id);
      if (state.goods[itemIndex].count > 1) {
        state.goods[itemIndex].count -= 1;
      }
      else {
        state.goods = state.goods.filter(item => item.good._id !== action.payload.good._id);
      }
      calculateTotalAmounts(state, current(state));
    },
    setGoodCount(state, action) {
      const itemIndex = getItemIndex(state, action.payload.good._id);
      state.goods[itemIndex].count = action.payload?.count;
      calculateTotalAmounts(state, current(state));
    },
    deleteGoodFromCart(state, action) {
      state.goods = state.goods.filter(item => item.good._id !== action.payload.good._id);
      calculateTotalAmounts(state, current(state));
    },
    clearCart() {
      return initialState;
    }


  },
});
export const { addGoodToCart, deleteGoodFromCart, decreaseGoodCount, setGoodCount, clearCart } = cartSlice.actions;