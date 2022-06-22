async function getResource(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Could not fetch ${url}, status: ${response.status}`);
	}
	const type = response.headers.get("content-type");
	if (type !== "application/json; charset=utf-8") {
		throw new TypeError(`Expected JSON, got ${type}`);
	}
	const cards = await response.json();
	return cards;
}

const postData = async (url, data) => {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-type": "application/json"
		},
		body: data
	});
	// eslint-disable-next-line no-return-await
	return await res.json();
};

export { getResource, postData };
