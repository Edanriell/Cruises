import { getResource } from '../services/requests'
import ErrorMessage from './errorMessage.js'
import ProductModal from './productModal'

export default class FetchNewCards {
  constructor({
    productModal,
    container,
    triggerBtn,
    fetchItemInterval,
    itemsPerFetch,
    database,
    spinnerSrc
  }) {
    this.container = document.querySelector(container)
    this.trigger = document.querySelector(triggerBtn)
    this.interval = fetchItemInterval
    this.items = itemsPerFetch
    this.cardsFetched = 0
    this.cardsPerCycle = 1
    this.db = database
    this.spinner = spinnerSrc
    this.loaderCreated = false
    this.error = false
    this.totalCardsInDb = null
    this._getItemsTotal = this._getItemsTotal.bind(this)
    this.productModal = productModal
  }

  init() {
    this.trigger.addEventListener('click', () => {
      // eslint-disable-next-line prettier/prettier
      (async () => {
        for await (const tick of this.#delay(this.interval, this.items)) {
          if (this.cardsFetched === this.totalCardsInDb) {
            this.#disableTrigger()
            return
          }
          this._getItemsTotal()
          this.#fetchItemsData()
          console.log(tick)
          console.log(this.totalCardsInDb)
        }
      })()
    })
  }

  #delay(interval, max = Infinity) {
    function until(time) {
      return new Promise(resolve => setTimeout(resolve, time - Date.now()))
    }
    return {
      startTime: Date.now(),
      count: 1,
      async next() {
        if (this.count > max) {
          return { done: true }
        }
        const targetTime = this.startTime + this.count * interval
        await until(targetTime)
        // eslint-disable-next-line no-plusplus
        return { value: this.count++ }
      },
      [Symbol.asyncIterator]() {
        return this
      }
    }
  }

  #fetchItemsData() {
    if (!this.loaderCreated) {
      this.#displayLoader(this.trigger)
      this.loaderCreated = true
    }
    getResource(this.db)
      .then(cards => {
        this.#renderCards(cards)
        this.#removeLoader()
      })
      .catch(error => {
        if (error.name === 'NetworkError') {
          this.#displayError('Please check your internet connection')
          this.#removeLoader()
        } else if (error instanceof TypeError) {
          this.#displayError(
            'Sorry, looks like something is wrong with our server! Try again latter.'
          )
          this.#removeLoader()
        } else {
          this.#displayError(error)
          this.#removeLoader()
        }
      })
      .finally(() => {
        this.loaderCreated = false
        this.error = false
      })
  }

  #renderCards(cards) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.cardsPerCycle; i++) {
      const { id, size, classes, name, img, imgWidth, imgHeight, place, duration, price } =
        cards[this.cardsFetched]
      const card = document.createElement('li')
      card.classList.add('catalog-list__item')
      if (size === 'big') {
        card.classList.add('modal-fade-in', 'catalog-list__item-large')
        card.innerHTML = `
        <article id="${id}" class="${classes}">
          <h3 class="catalog-item__name">${name}</h3>
          <img
            class="catalog-item__image"
            src="${img}"
            width="${imgWidth}"
            height="${imgHeight}""
            alt="Морской круиз в Анапу"
          />
          <dl class="catalog-item__description">
            <div class="item-description">
              <dt class="item-description__route">Маршрут:</dt>
              <dd class="item-description__place">${place}</dd>
            </div>
            <div class="item-description">
              <dt class="item-description__tripDuration">Продолжительность:</dt>
              <dd class="item-description__tripDurationHours">${duration}</dd>
            </div>
          </dl>
          <p class="item-description__price">${price}</p>
        </article>
        `
      } else if (size === 'normal') {
        card.classList.add('modal-fade-in')
        card.innerHTML = `
        <article id="${id}" class="${classes}">
          <h3 class="catalog-item__name">${name}</h3>
          <img
            class="catalog-item__image"
            src="${img}"
            width="${imgWidth}"
            height="${imgHeight}"
            alt="Обзорная морская прогулка с экскурсией"
          />
          <dl class="catalog-item__description">
            <div class="item-description">
              <dt class="item-description__route">Маршрут:</dt>
              <dd class="item-description__place">
                ${place}
              </dd>
            </div>
            <div class="item-description">
              <dt class="item-description__tripDuration">Продолжительность:</dt>
              <dd class="item-description__tripDurationHours">${duration}</dd>
            </div>
          </dl>
          <p class="item-description__price">${price}</p>
        </article>
        `
      }
      this.container.appendChild(card)
      // eslint-disable-next-line no-plusplus
      this.cardsFetched++
    }
    if (this.productModal) {
      console.log('lala')
      this.productModal.init()
    }
    console.log(`RenderCards`, this)
  }

  _getItemsTotal() {
    getResource(this.db)
      .then(cards => {
        this.totalCardsInDb = cards.length
      })
      .catch(error => {
        if (error.name === 'NetworkError') {
          this.#displayError('Please check your internet connection')
        } else if (error instanceof TypeError) {
          this.#displayError(
            'Sorry, looks like something is wrong with our server! Try again latter.'
          )
        } else {
          this.#displayError(error)
        }
        this.totalCardsInDb = null
      })
  }

  #disableTrigger() {
    this.trigger.setAttribute('disabled', true)
    this.trigger.style.cssText = 'filter: grayscale(100%)'
    this.trigger.style.transition = 'all 0.2s linear'
    this.trigger.style.cursor = 'not-allowed'
    this.#displayWarning('Все круизы успешно загружены.')
  }

  // showProductModal = () => {
  //   console.log(`showProductModal`, this)
  //   this.productModal = new ProductModal({
  //     productModalSelector: '.product-modal',
  //     triggerElements: '.catalog-list__item',
  //     database: 'http://localhost:3000/productModal',
  //     spinnerSrc: '../img/spinner.svg'
  //   })
  //   this.productModal.init()
  //   // remove eventListeners and then again reasign
  // }

  #displayError(errorMessageText) {
    if (!this.error) {
      this.error = true
      const displayError = new ErrorMessage({
        errorText: errorMessageText,
        showErrorAnimationClass: 'error-fade-in',
        removeErrorAnimationClass: 'error-fade-out',
        removeErrorByTimeout: true,
        timeoutTime: 5000
      })
      displayError.init()
    }
  }

  #displayWarning(errorMessageText) {
    if (!this.error) {
      this.error = true
      const displayError = new ErrorMessage({
        errorText: errorMessageText,
        showErrorAnimationClass: 'error-fade-in',
        removeErrorAnimationClass: 'error-fade-out',
        removeErrorByTimeout: true,
        timeoutTime: 5000,
        errorIconSrc: '../../img/icons/warning.svg'
      })
      displayError.init()
    }
  }

  #displayLoader(targetElement) {
    if (!this.loaderCreated) {
      const loaderImg = document.createElement('img')
      loaderImg.classList.add('loader')
      loaderImg.src = this.spinner
      loaderImg.style.cssText = `
          position: absolute;
          height: 52px;
          top: 0;
          left: 62%;
          transform: translateX(-50%);
        `
      targetElement.insertAdjacentElement('afterend', loaderImg)
    }
  }

  #removeLoader() {
    if (this.loaderCreated) {
      document.querySelector('.loader').remove()
    }
  }
}
