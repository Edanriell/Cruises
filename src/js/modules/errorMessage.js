import ErrorSvg from "../../img/icons/error.svg";

export default class ErrorMessage {
	constructor({
		errorText,
		showErrorAnimationClass,
		removeErrorAnimationClass,
		removeErrorByTimeout,
		timeoutTime,
		errorIconSrc = ErrorSvg,
		errorLeftPos = 35,
		errorBotPos = 40,
		errorWidth = 640,
		errorHeight = 120
	}) {
		this.text = errorText;
		this.showError = showErrorAnimationClass;
		this.removeError = removeErrorAnimationClass;
		this.removeErrorTimeout = removeErrorByTimeout;
		this.timeout = timeoutTime;
		this.iconSrc = errorIconSrc;
		this.errorCreated = false;
		this.left = errorLeftPos;
		this.bottom = errorBotPos;
		this.width = errorWidth;
		this.height = errorHeight;
	}

	init() {
		this.#createError();
	}

	#createError() {
		if (this.errorCreated) return;
		if (!this.errorCreated) {
			this.errorCreated = true;

			const errorWrapper = document.createElement("div");
			const error = document.createElement("div");
			const errorIconWrapper = document.createElement("div");
			const errorIcon = document.createElement("img");
			const errorText = document.createElement("p");
			const closeErrorBtn = document.createElement("button");

			errorIcon.src = this.iconSrc;
			errorText.innerText = this.text;

			errorIconWrapper.append(errorIcon);
			error.append(closeErrorBtn, errorIconWrapper, errorText);
			errorWrapper.append(error);

			errorWrapper.classList.add("error__wrapper", this.showError);
			error.classList.add("error");
			errorIconWrapper.classList.add("error__icon-wrapper");
			errorIcon.classList.add("error__icon");
			errorText.classList.add("error__text");
			closeErrorBtn.classList.add("error__close-btn");

			document.querySelector("body").append(errorWrapper);
			this.#removeError(errorWrapper);
			this.#removeErrorByTimeout(errorWrapper, this.removeErrorTimeout);
			this.#setStyles(errorWrapper, error);
		}
	}

	#removeError(error) {
		const removeErrorBtn = document.querySelector(".error__close-btn");
		removeErrorBtn.addEventListener("click", () => {
			error.classList.remove(this.showError);
			error.classList.add(this.removeError);
			setTimeout(() => {
				error.remove();
				this.errorCreated = false;
			}, 250);
		});
	}

	#removeErrorByTimeout(error, timeout = false) {
		if (timeout) {
			setTimeout(() => {
				error.classList.remove(this.showError);
				error.classList.add(this.removeError);
				setTimeout(() => {
					error.remove();
					this.errorCreated = false;
				}, 250);
			}, this.timeout);
		}
	}

	#setStyles(errorWrapper, error) {
		errorWrapper.style.cssText = `bottom: ${this.bottom}px; left: ${this.left}%;`;
		error.style.cssText = `width: ${this.width}px; min-height: ${this.height}px`;
	}
}
