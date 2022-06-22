import '../sass/main.sass'
import DropDownMenu from './modules/dropDown.js'
import Modal from './modules/modal.js'
import SvgPathAnimation from './modules/svgPathAnimation.js'
import ModalSummUpdate from './modules/summUpdate.js'
import ProductModal from './modules/productModal.js'
import Forms from './modules/forms.js'
import Gallery from './modules/gallery.js'
import FetchNewCards from './modules/fetchNewCards'

window.addEventListener('load', () => {
  const dropDown = new DropDownMenu({
    menuId: 1,
    triggerBtn: '[data-accordion="dropDown1"]',
    menuWidth: 140,
    menuHeight: 80,
    menuTopPos: 44,
    menuRightPos: 8,
    animationOnShow: 'showMenu',
    animationOnHide: 'hideMenu',
    closeMenuTargetBtns: '[data-accordion="dropDown2"], [data-accordion="dropDown3"]',
    menuContent: [
      {
        itemName: 'Вход',
        href: '#login'
      },
      {
        itemName: 'Регистрация',
        href: '#register'
      }
    ]
  })
  const dropDown2 = new DropDownMenu({
    menuId: 2,
    triggerBtn: '[data-accordion="dropDown2"]',
    menuWidth: 80,
    menuHeight: 72,
    menuTopPos: 44,
    menuRightPos: -8,
    animationOnShow: 'showMenu',
    animationOnHide: 'hideMenu',
    closeMenuTargetBtns: '[data-accordion="dropDown1"], [data-accordion="dropDown3"]',
    menuContent: [
      {
        itemName: 'Доллар',
        href: '#dollar'
      },
      {
        itemName: 'Евро',
        src: '#eur'
      }
    ]
  })
  const dropDown3 = new DropDownMenu({
    menuId: 3,
    triggerBtn: '[data-accordion="dropDown3"]',
    menuWidth: 40,
    menuHeight: 40,
    menuTopPos: 44,
    menuRightPos: 2,
    animationOnShow: 'showMenu',
    animationOnHide: 'hideMenu',
    closeMenuTargetBtns: '[data-accordion="dropDown1"], [data-accordion="dropDown2"]',
    menuContent: [
      {
        itemName: 'En',
        href: '#eng'
      }
    ]
  })

  const svgAnimation = new SvgPathAnimation({
    lineSelector: '#path',
    scrollTopStart: 180,
    scrollTopEnd: 500,
    animationDirection: 'backwards'
  })

  const modal = new Modal({
    triggerBtns: '[data-modal]',
    modalSelector: '.modal',
    modalWrapperSelector: '.modal__wrapper',
    showAnimationClass: 'modal-fade-in',
    hideAnimationClass: 'modal-fade-out',
    closeModalTriggerBtn: '.modal-btn-close',
    closeModalWindowByEsc: true,
    closeModalWindowByClickAndBtn: true,
    showModalWindowByTimer: false,
    modalTimer: 20000,
    showModalWindowByScroll: true,
    scrollDocumentScrolledBy: 2650
  })

  const modalSummUpdate = new ModalSummUpdate({
    targetElement: '.modal-form__product-select',
    targetParagraph: '.modal-main-text'
  })

  const productModal = new ProductModal({
    productModalSelector: '.product-modal',
    triggerElements: '.catalog-list__item',
    database: 'http://localhost:3000/productModal',
    spinnerSrc: '../img/spinner.svg'
  })

  const form = new Forms({
    triggerForm: '#form',
    databaseName: 'collectedData',
    spinnerSrc: '../img/spinner.svg'
  })

  const gallery = new Gallery({
    trigger: '.gallery-image-list li img',
    container: 'body',
    imageMaxHeight: 800,
    imageMaxWidth: 1920,
    closeGalleryByEscBtn: true
  })

  const fetchCards = new FetchNewCards({
    productModal,
    container: '.catalog-list',
    triggerBtn: '[data-fetchCards]',
    fetchItemInterval: 150,
    itemsPerFetch: 2,
    database: 'http://localhost:3000/products',
    spinnerSrc: '../img/spinner.svg'
  })

  dropDown.init()
  dropDown2.init()
  dropDown3.init()
  svgAnimation.init()
  modal.init()
  modalSummUpdate.init()
  productModal.init()
  form.init()
  gallery.init()
  fetchCards.init()
})
