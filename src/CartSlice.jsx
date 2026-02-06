import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
	name: "cart",
	initialState: {
		items: [], // Initialize items as an empty array
	},
	reducers: {
		// Task 2: Complete addItem reducer
		addItem: (state, action) => {
			const { name, image, cost } = action.payload; // Destructure product details from the action payload

			// Check if the item already exists in the cart by comparing names
			const existingItem = state.items.find((item) => item.name === name);

			if (existingItem) {
				// If item already exists in the cart, increase its quantity
				existingItem.quantity++;
			} else {
				// If item does not exist, add it to the cart with quantity 1
				state.items.push({
					name,
					image,
					cost,
					quantity: 1,
					description: action.payload.description, // Also include description if provided
				});
			}
		},

		// Task 2: Complete removeItem reducer
		removeItem: (state, action) => {
			const itemName = action.payload; // Get the item name from the action payload

			// Remove the item from the cart based on its name
			state.items = state.items.filter((item) => item.name !== itemName);
		},

		// Task 2: Complete updateQuantity reducer
		updateQuantity: (state, action) => {
			const { name, quantity } = action.payload; // Destructure the product name and new quantity from the action payload

			// Find the item in the cart that matches the given name
			const itemToUpdate = state.items.find((item) => item.name === name);

			if (itemToUpdate) {
				// If the item is found, update its quantity to the new value
				itemToUpdate.quantity = quantity;
			}
		},
	},
});

// Task 2: Export the action creators
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Task 2: Export the reducer as default
export default CartSlice.reducer;
