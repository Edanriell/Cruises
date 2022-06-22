import { postData } from "../services/requests.js";
import ErrorMessage from "./errorMessage.js";

export default class Forms {
	constructor({ triggerForm, databaseName, spinnerSrc }) {
		this.forms = document.querySelectorAll(triggerForm);
		this.database = databaseName;
		this.spinner = spinnerSrc;
		this.error = false;
	}

	init() {
		this.forms.forEach(form => {
			this.#bindPostData(form, this.database);
		});
	}

	#bindPostData(form, database) {
		form.addEventListener("submit", e => {
			e.preventDefault();
			this.#displayLoader(form);
			this.#switchButtonText("#send-data");

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData(`http://localhost:3000/${database}`, json)
				.then(data => {
					console.log(data);
					document.querySelector(".loader").remove();
				})
				.catch(error => {
					if (error.name === "NetworkError") {
						this.#displayError("Пожалуйста, проверьте подключение к интернету.");
						document.querySelector(".loader").remove();
					} else if (error instanceof TypeError) {
						this.#displayError(
							// eslint-disable-next-line max-len
							"Извините, похоже, что-то не так с нашим сервером! Повторите попытку позже."
						);
						document.querySelector(".loader").remove();
					} else {
						this.#displayError(error);
						document.querySelector(".loader").remove();
					}
				})
				.finally(() => {
					this.#switchButtonText("#send-data");
					form.reset();
					this.error = false;
				});
		});
	}

	#displayLoader(form) {
		const loaderImg = document.createElement("img");
		loaderImg.classList.add("loader");
		loaderImg.src = this.spinner;
		loaderImg.style.cssText = `
        position: absolute;
        height: 52px;
        top: 630px;
        left: 300px;
      `;
		form.insertAdjacentElement("afterend", loaderImg);
	}

	#displayError(errorMessageText) {
		if (!this.error) {
			this.error = true;
			const displayError = new ErrorMessage({
				errorText: errorMessageText,
				showErrorAnimationClass: "error-fade-in",
				removeErrorAnimationClass: "error-fade-out",
				removeErrorByTimeout: true,
				timeoutTime: 5000,
				errorLeftPos: 73,
				errorBotPos: 500,
				errorWidth: 440,
				errorHeight: 120
			});
			displayError.init();
		}
	}

	#switchButtonText(selector) {
		const button = document.querySelector(selector);
		// eslint-disable-next-line no-unused-expressions
		button.style.color === "transparent"
			? (button.style.color = "white")
			: (button.style.color = "transparent");
	}
}
