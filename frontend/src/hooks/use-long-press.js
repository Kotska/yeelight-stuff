import { useState, useRef } from "react";

export default function useLongPress({
	onClick,
	onLongPress,
	onMouseDown,
	onMouseUp,
	onTouchStart,
	onTouchEnd,
} = {}) {
	const [action, setAction] = useState();
	const timeRef = useRef();
	const isLongPress = useRef(false);

	function handleOnClick(event) {
		if (isLongPress.current) {
			if (typeof onLongPress == "function") {
				onLongPress(event);
			}
			return;
		}
		setAction("click");

		if (typeof onClick == "function") {
			onClick(event);
		}
	}

	function handleOnMouseDown(event) {
		if (typeof onMouseDown == "function") {
			onMouseDown(event);
		}
		startPressTimer();
	}
	function handleOnMouseUp(event) {
		if (typeof onMouseUp == "function") {
			onMouseUp(event);
		}
		clearTimeout(timeRef.current);
	}
	function handleOnTouchStart(event) {
		if (typeof onTouchStart == "function") {
			onTouchStart(event);
		}
		startPressTimer();
	}
	function handleOnTouchEnd(event) {
		if (typeof onTouchEnd == "function") {
			onTouchEnd(event);
		}
		clearTimeout(timeRef.current);
	}

	function startPressTimer() {
		isLongPress.current = false;
		timeRef.current = setTimeout(() => {
			isLongPress.current = true;
			setAction("longpress");
		}, 500);
	}
	return {
		action,
		handlers: {
			onClick: handleOnClick,
			onMouseDown: handleOnMouseDown,
			onMouseUp: handleOnMouseUp,
			onTouchStart: handleOnTouchStart,
			onTouchEnd: handleOnTouchEnd,
		},
	};
}
