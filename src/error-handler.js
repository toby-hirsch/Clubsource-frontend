export default function handleErrors(res) {
	if (!res.ok){
		throw new Error(res.statustext);
	}
	return res.json();
}