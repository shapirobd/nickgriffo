let currentPage;
let imgs;
let currentImgIndex;
let indexIsHidden = true;

$(".nav-link").on("click", async function (evt) {
	evt.preventDefault();
	$("#index-list").empty();
	if ($(".collapse").hasClass("show")) {
		$(".collapse").removeClass("show");
	}
	if (
		$(this).hasClass("text-secondary") &&
		!$("#index-btn").hasClass("hidden")
	) {
		toggleIndex(true);
	} else if (
		!$(this).hasClass("text-secondary") &&
		$("#index-btn").hasClass("hidden")
	) {
		toggleIndex(false);
	}
	$("#img-container").empty();
	currentPage = $(this).attr("id");
	currentImgIndex = 0;
	const resp = await axios.get(`http://127.0.0.1:5000/${currentPage}`);
	imgs = resp.data.imgs;
	const firstImgHTML = generateImgHTML(
		imgs[currentImgIndex].filename,
		currentPage
	);
	const indexListHTML = generateIndexListHTML(imgs);
	$("#img-container").append(firstImgHTML);
	$("#index-list").append(indexListHTML);
	createIndexLinkListeners();
});

function createIndexLinkListeners() {
	$(".index-link").on("click", async function (evt) {
		evt.preventDefault();
		$("#img-container").empty();
		let filename = $(this).attr("id");
		for (let img of imgs) {
			if (img.filename === filename) {
				currentImgIndex = imgs.indexOf(img);
				break;
			}
		}
		const resp = await axios.get(`http://127.0.0.1:5000/img/${filename}`);
		img = resp.data.img;
		const imgHTML = generateImgHTML(img.filename, currentPage);
		fadeImg(imgHTML);
	});
}

function toggleIndex(shouldBeHidden) {
	if (shouldBeHidden === true) {
		$("#index-btn").addClass("hidden");
		indexIsHidden = true;
	} else {
		$("#index-btn").removeClass("hidden");
		indexIsHidden = false;
	}
}

function generateIndexListHTML(imgs) {
	let listItems = "";
	for (let img in imgs) {
		listItems += `<li><a id="${imgs[img].filename}" class="index-link" href="">${imgs[img].filename}</a></li>`;
	}
	return listItems;
}

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
