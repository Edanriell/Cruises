export default class GalleryMini {
	constructor({ targetElement, triggerElements }) {
		this.target = document.querySelector(targetElement);
		this.triggers = document.querySelectorAll(triggerElements);
	}

	init() {
		this.triggers.forEach(image => {
			image.addEventListener("click", () => {
				this.#changePreviewImage(image);
			});
		});
	}

	#changePreviewImage(image) {
		this.target.src = image.src;
	}
}
