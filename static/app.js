let currentPage;
let imgs;
let currentImgIndex;

$("#scanner_1").on("click", async function (evt) {
	evt.preventDefault();
	const resp = await axios.get("http://127.0.0.1:5000/scanner_1_imgs");
	currentPage = "scanner_1_imgs";
	currentImgIndex = 0;
	imgs = resp.data.imgs;
	const firstImgHTML = generateImgHTML(imgs[currentImgIndex].filename);
	$("#img-container").append(firstImgHTML);
});

function generateImgHTML(filename) {
	return `<div><img id="main-img" src="../static/images/scanner_1_imgs/${filename}" /></div>`;
}

$("#fwd-btn").on("click", () => {
	if (currentImgIndex === imgs.length - 1) {
		currentImgIndex = 0;
	} else {
		currentImgIndex++;
	}
	console.log(currentImgIndex);
	const nextImgHTML = generateImgHTML(imgs[currentImgIndex].filename);
	$("#img-container").fadeOut(250);
	setTimeout(() => {
		$("#img-container").empty();
		$("#img-container").append(nextImgHTML);
	}, 250);
	$("#img-container").fadeIn(250);
});

$("#back-btn").on("click", () => {
	if (currentImgIndex === 0) {
		currentImgIndex = imgs.length - 1;
	} else {
		currentImgIndex--;
	}
	console.log(currentImgIndex);
	const prevImgHTML = generateImgHTML(imgs[currentImgIndex].filename);
	$("#img-container").fadeOut(250);
	setTimeout(() => {
		$("#img-container").empty();
		$("#img-container").append(prevImgHTML);
	}, 250);
	$("#img-container").fadeIn(250);
});
