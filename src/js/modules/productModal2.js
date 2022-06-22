import { getResource } from '../services/requests.js'
import Modal from './modal.js'
import ErrorMessage from './errorMessage.js'
import GalleryMini from './galleryMini.js'

export default class ProductModal {
  constructor({ productModalSelector, triggerElements, database, spinnerSrc }) {
    this.modal = document.querySelector(productModalSelector)
    this.triggers = document.querySelectorAll(triggerElements)
    this.db = database
    this.spinner = spinnerSrc
    this.error = false
  }

  init() {
    this.triggers.forEach(element => {
      element.addEventListener('click', e => {
        this.#fetchData(element, e.target.id)
      })
    })
  }

  #fetchData(element, id) {
    this.#displaySpinner(element)
    getResource(this.db)
      .then(data => {
        document.querySelector('.loader').remove()
        element.children[0].style.cssText = `filter: blur(0);`
        element.style.pointerEvents = 'auto'
        element.style.userSelect = 'auto'
        this.#createProductModal(id, data)
      })
      .catch(error => {
        if (error.name === 'NetworkError') {
          this.#displayError('Please check your internet connection')
          element.children[0].style.cssText = `filter: blur(0);`
          element.style.pointerEvents = 'auto'
          element.style.userSelect = 'auto'
          document.querySelector('.loader').remove()
        } else if (error instanceof TypeError) {
          document.querySelector('.loader').remove()
          element.children[0].style.cssText = `filter: blur(0);`
          element.style.pointerEvents = 'auto'
          element.style.userSelect = 'auto'
          this.#displayError(
            'Sorry, looks like something is wrong with our server! Try again latter.'
          )
        } else {
          document.querySelector('.loader').remove()
          element.children[0].style.cssText = `filter: blur(0);`
          element.style.pointerEvents = 'auto'
          element.style.userSelect = 'auto'
          this.#displayError(error)
        }
      })
      .finally((this.error = false))
  }

  #createProductModal(id, data) {
    const filteredData = data.filter(item => {
      return item.id === id
    })
    const [
      {
        name,
        place,
        tripDurationHours,
        textBlock1,
        textBlock2,
        textBlock3,
        textBlock4,
        textBlock5,
        price,
        mainImage,
        image1,
        image2,
        image3,
        image4
      }
    ] = filteredData
    this.#updateProductModalContent(
      name,
      place,
      tripDurationHours,
      textBlock1,
      textBlock2,
      textBlock3,
      textBlock4,
      textBlock5,
      price,
      mainImage,
      image1,
      image2,
      image3,
      image4
    )
    this.#showModal()
    this.#initialiseMiniGallery()
  }

  #updateProductModalContent(
    name,
    place,
    tripDurationHours,
    textBlock1,
    textBlock2,
    textBlock3,
    textBlock4,
    textBlock5,
    price,
    mainImage,
    image1,
    image2,
    image3,
    image4
  ) {
    const productName = this.modal.querySelector('[data-product-modal="item-name"]')
    const tripPlace = this.modal.querySelector('[data-product-modal="place"]')
    const tripDuration = this.modal.querySelector('[data-product-modal="tripDuration"]')
    const mainImg = this.modal.querySelector('[data-product-modal="main-image"]')
    const img1 = this.modal.querySelector('[data-product-modal="img1"]')
    const img2 = this.modal.querySelector('[data-product-modal="img2"]')
    const img3 = this.modal.querySelector('[data-product-modal="img3"]')
    const img4 = this.modal.querySelector('[data-product-modal="img4"]')
    const paragraph1 = this.modal.querySelector('[data-product-modal="paragraph1"]')
    const paragraph2 = this.modal.querySelector('[data-product-modal="paragraph2"]')
    const paragraph3 = this.modal.querySelector('[data-product-modal="paragraph3"]')
    const paragraph4 = this.modal.querySelector('[data-product-modal="paragraph4"]')
    const paragraph5 = this.modal.querySelector('[data-product-modal="paragraph5"]')
    const tripPrice = this.modal.querySelector('[data-product-modal="price"]')
    productName.innerText = name
    tripPlace.innerText = place
    tripDuration.innerText = tripDurationHours
    paragraph1.innerText = textBlock1
    paragraph2.innerText = textBlock2
    paragraph3.innerText = textBlock3
    paragraph4.innerText = textBlock4
    paragraph5.innerText = textBlock5
    tripPrice.innerText = price
    mainImg.src = mainImage
    img1.src = image1
    img2.src = image2
    img3.src = image3
    img4.src = image4
  }

  #displaySpinner(element) {
    element.style.pointerEvents = 'none'
    element.style.userSelect = 'none'
    element.children[0].style.cssText = `filter: blur(10px);`
    const loaderImg = document.createElement('img')
    loaderImg.classList.add('loader')
    loaderImg.src = this.spinner
    loaderImg.style.cssText = `
        position: absolute;
        height: 66px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `
    element.append(loaderImg)
  }

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

  #initialiseMiniGallery() {
    const miniGallery = new GalleryMini({
      targetElement: '.product-modal-mini-gallery__image-preview-window',
      triggerElements: '.product-modal-mini-gallery__image'
    })
    miniGallery.init()
  }

  #showModal() {
    const modal = new Modal({
      modalSelector: '.product-modal',
      modalWrapperSelector: '.product-modal__wrapper',
      showAnimationClass: 'modal-fade-in',
      hideAnimationClass: 'modal-fade-out',
      closeModalTriggerBtn: '.product-modal-btn-close',
      closeModalWindowByEsc: true,
      closeModalWindowByClickAndBtn: true
    })
    modal.showModal()
  }
}
