let currentPage;
let imgs;
let currentImgIndex;

$(".nav-link").on("click", async function (evt) {
	evt.preventDefault();
	$("#img-container").empty();
	currentPage = $(this).attr("id");
	currentImgIndex = 0;
	const resp = await axios.get(`http://127.0.0.1:5000/${currentPage}`);
	imgs = resp.data.imgs;
	const firstImgHTML = generateImgHTML(
		imgs[currentImgIndex].filename,
		currentPage
	);
	$("#img-container").append(firstImgHTML);
});

function generateImgHTML(filename, folder) {
	return `<div><img id="main-img" src="../static/images/${folder}/${filename}" /></div>`;
}

$("#fwd-btn").on("click", () => {
	if (currentImgIndex === imgs.length - 1) {
		currentImgIndex = 0;
	} else {
		currentImgIndex++;
	}
	getNextOrPrevImg();
});

$("#back-btn").on("click", () => {
	if (currentImgIndex === 0) {
		currentImgIndex = imgs.length - 1;
	} else {
		currentImgIndex--;
	}
	getNextOrPrevImg();
});

function getNextOrPrevImg() {
	const soughtImgHTML = generateImgHTML(
		imgs[currentImgIndex].filename,
		currentPage
	);
	fadeImg(soughtImgHTML);
}

function fadeImg(imgHTML) {
	$("#img-container").fadeOut(250);
	setTimeout(() => {
		$("#img-container").empty();
		$("#img-container").append(imgHTML);
	}, 250);
	$("#img-container").fadeIn(250);
}
