export default class SvgPathAnimation {
	constructor({ lineSelector, scrollTopStart, scrollTopEnd, animationDirection }) {
		this.path = document.querySelector(lineSelector);
		this.initialHeight = scrollTopStart;
		this.height = scrollTopEnd;
		this.pathLength = this.path.getTotalLength();
		this.percents = 0;
		this.direction = animationDirection;
		this.path.style.strokeDasharray = `${this.pathLength}, ${this.pathLength}`;
		this.path.style.strokeDashoffset = this.pathLength;
	}

	init() {
		window.addEventListener("scroll", () => {
			const scrollTopValue = document.documentElement.scrollTop;
			if (scrollTopValue > this.initialHeight) {
				this.#animateLine();
				this.#calculatePercents();
			}
		});
	}

	#animateLine() {
		const drawLength = (this.percents * this.pathLength) / 100;
		this.path.style.strokeDashoffset = this.pathLength + drawLength;
		if (this.direction === "backwards") {
			this.path.style.strokeDashoffset = this.pathLength - drawLength;
		}
		if (this.percents >= 99) {
			this.path.style.strokeDasharray = "none";
		} else {
			this.path.style.strokeDasharray = `${this.pathLength}, ${this.pathLength}`;
		}
	}

	#calculatePercents() {
		if (this.percents !== 100 && document.documentElement.scrollTop <= this.height) {
			this.percents =
				((document.documentElement.scrollTop - this.initialHeight) * 100) /
				(this.height - this.initialHeight);
		}
	}
}
