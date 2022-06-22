export default class ModalSummUpdate {
	constructor({ targetElement, targetParagraph }) {
		this.target = document.querySelector(targetElement);
		this.paragraph = document.querySelector(targetParagraph);
	}

	init() {
		const select = this.target.querySelector("select");
		const target = this.paragraph.querySelector("p");
		select.addEventListener("change", e => {
			target.innerText = `Сумма заказа: ${e.currentTarget.value} ₽`;
		});
	}
}
