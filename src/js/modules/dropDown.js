export default class DropDownMenu {
	constructor({
		menuId,
		triggerBtn,
		menuWidth,
		menuHeight,
		menuTopPos,
		menuRightPos,
		animationOnShow,
		animationOnHide,
		menuContent,
		closeMenuTargetBtns
	}) {
		this.id = menuId;
		this.trigger = document.querySelector(triggerBtn);
		this.width = menuWidth;
		this.height = menuHeight;
		this.top = menuTopPos;
		this.right = menuRightPos;
		this.showMenu = animationOnShow;
		this.hideMenu = animationOnHide;
		this.content = menuContent;
		this.closeBtns = document.querySelectorAll(closeMenuTargetBtns);
		this.menuIsCreated = false;
	}

	init() {
		this.trigger.style.position = "relative";
		this.trigger.addEventListener("mouseover", event => {
			event.stopPropagation();
			if (!this.menuIsCreated) this.createMenu(event.target);
		});
	}

	createMenu(target) {
		this.menuIsCreated = true;
		const menuItemList = document.createElement("ul");

		menuItemList.classList.add("accordion-menu");

		menuItemList.style.cssText = `
      width: ${this.width}px;
      height: ${this.height}px;
      top: ${this.top}px;
      right: ${this.right}px;`;

		this.createMenuItems(menuItemList);
		menuItemList.classList.add("showMenu");
		this.closeMenu(menuItemList, "showMenu", 250);
		target.append(menuItemList);
	}

	createMenuItems(menuItemList) {
		this.content.forEach(({ itemName, href }) => {
			const li = document.createElement("li");
			li.classList.add("accordion-menu__item");
			li.innerHTML = `<a class="accordion-menu__link" href="${href}">${itemName}</a>`;
			menuItemList.append(li);
		});
	}

	closeMenu(menu, onShowAnimationClass, onHideAnimationDuration) {
		menu.addEventListener("mouseleave", event => {
			if (event.target === menu) {
				menu.classList.remove(onShowAnimationClass);
				menu.classList.add("hideMenu");
				setTimeout(() => {
					this.menuIsCreated = false;
					menu.remove();
				}, onHideAnimationDuration);
			}
		});

		this.closeBtns.forEach(btn => {
			btn.addEventListener("mouseenter", () => {
				menu.classList.remove(onShowAnimationClass);
				menu.classList.add("hideMenu");
				setTimeout(() => {
					this.menuIsCreated = false;
					menu.remove();
				}, onHideAnimationDuration);
			});
		});
	}
}
