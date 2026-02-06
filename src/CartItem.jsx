import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, addItem } from "./CartSlice"; // Added addItem import
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
	const cart = useSelector((state) => state.cart.items);
	const dispatch = useDispatch();

	// Calculate total amount for all products in the cart
	const calculateTotalAmount = () => {
		let total = 0;
		cart.forEach((item) => {
			const price = parseFloat(item.cost.substring(1));
			total += price * item.quantity;
		});
		return total.toFixed(2);
	};

	const handleContinueShopping = (e) => {
		onContinueShopping(e);
	};

	const handleCheckoutShopping = (e) => {
		alert("Functionality to be added for future reference");
	};

	// Task 4: Use updateQuantity action
	const handleIncrement = (item) => {
		dispatch(
			updateQuantity({
				name: item.name,
				quantity: item.quantity + 1,
			})
		);
	};

	// Task 4: Use updateQuantity and removeItem actions
	const handleDecrement = (item) => {
		if (item.quantity > 1) {
			dispatch(
				updateQuantity({
					name: item.name,
					quantity: item.quantity - 1,
				})
			);
		} else {
			dispatch(removeItem(item.name));
		}
	};

	// Task 4: Use removeItem action
	const handleRemove = (item) => {
		dispatch(removeItem(item.name));
	};

	// Task 4: Add item function (for potential use)
	const handleAddItem = (plantData) => {
		dispatch(addItem(plantData));
	};

	// Calculate total cost based on quantity for an item
	const calculateTotalCost = (item) => {
		const price = parseFloat(item.cost.substring(1));
		return (price * item.quantity).toFixed(2);
	};

	return (
		<div className="cart-container">
			<h2 style={{ color: "black" }}>Shopping Cart</h2>
			{cart.length === 0 ? (
				<div
					style={{
						textAlign: "center",
						padding: "40px",
						color: "#666",
						fontSize: "18px",
					}}
				>
					Your cart is empty. Add some plants to get started!
				</div>
			) : (
				<>
					<h3 style={{ color: "black" }}>Total: ${calculateTotalAmount()}</h3>
					<div>
						{cart.map((item) => (
							<div className="cart-item" key={item.name}>
								<img
									className="cart-item-image"
									src={item.image}
									alt={item.name}
								/>
								<div className="cart-item-details">
									<div className="cart-item-name">{item.name}</div>
									{item.description && (
										<div className="cart-item-description">
											{item.description}
										</div>
									)}
									<div className="cart-item-cost">Unit Price: {item.cost}</div>
									<div className="cart-item-quantity">
										<button
											className="cart-item-button cart-item-button-dec"
											onClick={() => handleDecrement(item)}
											aria-label={`Decrease quantity of ${item.name}`}
										>
											-
										</button>
										<span className="cart-item-quantity-value">
											{item.quantity}
										</span>
										<button
											className="cart-item-button cart-item-button-inc"
											onClick={() => handleIncrement(item)}
											aria-label={`Increase quantity of ${item.name}`}
										>
											+
										</button>
									</div>
									<div className="cart-item-total">
										Item Total: ${calculateTotalCost(item)}
									</div>
									<button
										className="cart-item-delete"
										onClick={() => handleRemove(item)}
										aria-label={`Remove ${item.name} from cart`}
									>
										Delete
									</button>
								</div>
							</div>
						))}
					</div>
				</>
			)}
			<div
				style={{ marginTop: "20px", color: "black" }}
				className="total_cart_amount"
			></div>
			<div className="continue_shopping_btn">
				<button
					className="get-started-button"
					onClick={(e) => handleContinueShopping(e)}
				>
					← Continue Shopping
				</button>
				<br />
				<button
					className="get-started-button1"
					onClick={handleCheckoutShopping}
				>
					Checkout
				</button>
			</div>
		</div>
	);
};

export default CartItem;
