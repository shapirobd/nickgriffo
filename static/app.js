let currentPage;
let imgs;
let currentImgIndex;
let indexIsHidden = true;

$(".nav-link").on("click", async function (evt) {
	evt.preventDefault();
	$("#index-list-left").empty();
	$("#index-list-middle").empty();
	$("#index-list-right").empty();

	if ($(".collapse").hasClass("show")) {
		$(".collapse").removeClass("show");
	}

	determineIndexToggle(this);
	determineScrollBtnToggle(this);

	$("#img-container").empty();

	currentPage = $(this).attr("id");
	currentImgIndex = 0;
	const resp = await axios.get(`http://127.0.0.1:5000/${currentPage}`);
	if (!resp.data.imgs) {
		handleSecondaryLink(resp);
	} else {
		handlePrimaryLink(resp);
	}
});

function handlePrimaryLink(resp) {
	imgs = resp.data.imgs;
	const firstImgHTML = generateImgHTML(
		imgs[currentImgIndex].filename,
		currentPage
	);
	const leftIndexListHTML = renderLeftIndexList();
	const middleIndexListHTML = renderMiddleIndexList();
	const rightIndexListHTML = renderRightIndexList();

	$("#img-container").append(firstImgHTML);
	$("#index-list-left").append(leftIndexListHTML);
	$("#index-list-middle").append(middleIndexListHTML);
	$("#index-list-right").append(rightIndexListHTML);
	createIndexLinkListeners();
}

function handleSecondaryLink(resp) {
	const contactInfo = resp.data.info;
	let contactHTML = generateContactHTML(resp.data.info);
	$("#img-container").append(contactHTML);
}

function renderLeftIndexList() {
	let leftImgs = imgs.filter((img) => {
		return imgs.indexOf(img) <= Math.ceil(imgs.length / 3 - 1);
	});
	return generateIndexListHTML(leftImgs);
}

function renderMiddleIndexList() {
	let middleImgs = imgs.filter((img) => {
		return (
			imgs.indexOf(img) > Math.ceil(imgs.length / 3 - 1) &&
			imgs.indexOf(img) <= Math.ceil((imgs.length * 2) / 3 - 1)
		);
	});
	return generateIndexListHTML(middleImgs);
}

function renderRightIndexList() {
	let rightImgs = imgs.filter((img) => {
		return imgs.indexOf(img) > Math.ceil((imgs.length * 2) / 3 - 1);
	});
	return generateIndexListHTML(rightImgs);
}

function determineScrollBtnToggle(navLink) {
	if (
		!$("#scroll-btn").hasClass("hidden") &&
		$(navLink).hasClass("text-secondary")
	) {
		toggleScrollBtn(true);
	} else if (
		$("#scroll-btn").hasClass("hidden") &&
		!$(navLink).hasClass("text-secondary")
	) {
		toggleScrollBtn(false);
	}
}

function determineIndexToggle(navLink) {
	if (
		$(navLink).hasClass("text-secondary") &&
		!$("#index-btn").hasClass("hidden")
	) {
		toggleIndex(true);
	} else if (
		!$(navLink).hasClass("text-secondary") &&
		$("#index-btn").hasClass("hidden")
	) {
		toggleIndex(false);
	}
}

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

function toggleScrollBtn(shouldBeHidden) {
	if (shouldBeHidden === true) {
		$("#scroll-btn").addClass("hidden");
		indexIsHidden = true;
	} else {
		$("#scroll-btn").removeClass("hidden");
		indexIsHidden = false;
	}
}

function generateContactHTML(info) {
	return `<div class="my-3">
        <ul id="contact-info-list">
            <li>Email: <a href="mailto: ${info.email}">${info.email}</a></li>
            <li>Instagram: <a href="${info.instagram}">@dracaenaamericana</a></li>
            <li>IMDB: <a href="${info.imdb}">${info.imdb}</a></li>
        </ul>
    </div>`;
}

function generateIndexListHTML(imgs) {
	let listItems = "";
	for (let img in imgs) {
		listItems += `
        <li>
            <div class="row justify-content-center thumbnail-div my-2">
                <a id="${imgs[img].filename}" class="index-link" href="">
                    <img class="thumbnail" src="static/images/${currentPage}/${imgs[img].filename}" />
                </a>
            <div>
        </li>`;
	}
	return listItems;
}

function generateImgHTML(filename, folder) {
	return `<div><img id="main-img" src="../static/images/${folder}/${filename}" /></div>`;
}

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
