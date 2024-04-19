export const setAlertVisibilityTimer = (setAlertVisibleFunc) => {
	setAlertVisibleFunc(true);
	setTimeout(() => {
		setAlertVisibleFunc(false);
	}, 3000);
};
