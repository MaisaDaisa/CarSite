export function getTimeDifference(datePosted) {
	const fireBaseTime = new Date(
		datePosted.seconds * 1000 + datePosted.nanoseconds / 1000000
	);
	const currentDate = new Date();
	const timeDifference = currentDate - fireBaseTime;

	const minutesAgo = Math.floor(timeDifference / (1000 * 60));
	const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
	const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	const weeksAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));

	if (minutesAgo < 60) {
		return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
	} else if (hoursAgo < 24) {
		return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
	} else if (daysAgo < 7) {
		return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
	} else {
		return `${weeksAgo} week${weeksAgo === 1 ? "" : "s"} ago`;
	}
}
