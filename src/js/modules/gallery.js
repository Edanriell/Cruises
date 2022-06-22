export default class Gallery {
	constructor({ trigger, container, imageMaxWidth, imageMaxHeight, closeGalleryByEscBtn }) {
		this.imageList = document.querySelectorAll(trigger);
		this.container = document.querySelector(container);
		this.totalImages = this.imageList.length;
		this.maxWidth = imageMaxWidth;
		this.maxHeight = imageMaxHeight;
		this.imageIndex = null;
		this.closeGalleryByEsc = closeGalleryByEscBtn;
	}

	init() {
		this.imageList.forEach(image => {
			image.addEventListener("click", evt => this.#createGallery(evt));
		});
	}

	setImageDimensions() {
		const image = document.querySelector(".imageGallery__image");
		image.style.cssText = `
      max-width: ${this.maxWidth}px;
      max-height: ${this.maxHeight}px;
      `;
	}

	#createGallery(evt) {
		const currentClientWidth = document.body.clientWidth;
		const gallery = document.createElement("div");
		const galleryContent = document.createElement("div");
		const galleryImage = document.createElement("img");
		const firstColumn = document.createElement("div");
		const secondColumn = document.createElement("div");
		const thirdColumn = document.createElement("div");
		const nextBtn = document.createElement("button");
		const prevBtn = document.createElement("button");
		const closeBtnWrapper = document.createElement("div");
		const closeBtn = document.createElement("button");
		const imgCounter = document.createElement("div");
		const totalImages = document.createElement("p");
		const currentImage = document.createElement("p");
		const allImages = [...this.imageList];

		this.imageIndex = allImages.indexOf(evt.target);

		galleryImage.setAttribute("src", this.imageList[this.imageIndex].src);
		gallery.classList.add("imageGallery");
		galleryContent.classList.add("imageGallery__content");
		galleryImage.classList.add("imageGallery__image");
		firstColumn.classList.add("imageGallery__firstColumn");
		secondColumn.classList.add("imageGallery__secondColumn");
		thirdColumn.classList.add("imageGallery__thirdColumn");
		nextBtn.classList.add("imageGallery__nextBtn");
		prevBtn.classList.add("imageGallery__prevBtn");
		closeBtn.classList.add("imageGallery__closeBtn");
		closeBtnWrapper.classList.add("imageGallery__closeBtnWrapper");
		totalImages.classList.add("imageGallery__totalImages");
		currentImage.classList.add("imageGallery__currentImage");
		imgCounter.classList.add("imageGallery__imgCounter");
		totalImages.classList.add("imageGallery__totalImages");
		currentImage.classList.add("imageGallery__currentImage");

		imgCounter.append(totalImages, currentImage);
		closeBtnWrapper.append(closeBtn);
		thirdColumn.append(nextBtn, closeBtnWrapper);
		secondColumn.append(galleryImage);
		firstColumn.append(prevBtn, imgCounter);
		galleryContent.append(firstColumn, secondColumn, thirdColumn);
		gallery.append(galleryContent);

		this.container.append(gallery);
		this.#scrollBarFix(currentClientWidth);
		this.#updateImage();
		this.#closeGallery(gallery, this.closeGalleryByEsc, ".imageGallery__closeBtn");
		this.setImageDimensions();
		this.#imageCounter(".imageGallery__totalImages", ".imageGallery__currentImage");
	}

	#updateImage() {
		const btnNext = document.querySelector(".imageGallery__firstColumn");
		const btnPrev = document.querySelector(".imageGallery__thirdColumn");
		const image = document.querySelector(".imageGallery__image");
		btnNext.addEventListener("click", event => {
			this.#switchImage(event, btnNext, image, true, false);
		});
		btnPrev.addEventListener("click", event => {
			this.#switchImage(event, btnPrev, image, false, true);
		});
	}

	#switchImage(event, btn, image, forward = false, backward = false) {
		if (forward) {
			if (event.target === btn) {
				image.removeAttribute("src");
				if (this.imageIndex === 0) {
					this.imageIndex = this.totalImages;
				}
				this.imageIndex -= 1; // --
				image.setAttribute("src", this.imageList[this.imageIndex].src);
				this.#imageCounter(".imageGallery__totalImages", ".imageGallery__currentImage");
			}
		}

		if (backward) {
			if (event.target === btn) {
				image.removeAttribute("src");
				this.imageIndex += 1; // ++
				if (this.imageIndex === this.totalImages) {
					this.imageIndex = 0;
				}
				image.setAttribute("src", this.imageList[this.imageIndex].src);
				this.#imageCounter(".imageGallery__totalImages", ".imageGallery__currentImage");
			}
		}
	}

	#closeGallery(gallery, escBtn = false, closeBtn) {
		const btnClose = document.querySelector(closeBtn);
		btnClose.addEventListener("click", () => {
			this.#removeGallery(gallery);
		});
		if (escBtn) {
			document.addEventListener("keydown", e => {
				if (e.key === "Escape") this.#removeGallery(gallery);
			});
		}
	}

	#removeGallery(gallery) {
		setTimeout(() => {
			gallery.classList.remove("fade-in");
			gallery.classList.add("fade-out");
			setTimeout(() => {
				gallery.remove();
				document.body.style.overflow = null;
				document.body.style.paddingRight = 0;
			}, 350);
		}, 300);
	}

	#imageCounter(totalImgs, currentImg) {
		const totalImages = document.querySelector(totalImgs);
		const currentImage = document.querySelector(currentImg);
		totalImages.innerText = this.totalImages;
		currentImage.innerText = this.imageIndex + 1;
	}

	#scrollBarFix(currentClientWidth) {
		document.body.style.overflow = "hidden";
		const cWidth = document.body.clientWidth;
		document.body.style.paddingRight = `${cWidth - currentClientWidth}px`;
	}
}
