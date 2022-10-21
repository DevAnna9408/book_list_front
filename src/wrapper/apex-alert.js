import Swal from 'sweetalert2'

let swalWithMertButtons = Swal.mixin({
  customClass: {
    confirmButton: 'basic__button',
    cancelButton: 'cancel__button'
  },
  buttonsStyling: false
  /**
   * route.js에 Swal.close() 적용하여
   * 아래 두 가지 주석
   **/
  // allowOutsideClick: false
  // stopKeydownPropagation: false
})

const confirm = (icon, title, text, confirmButtonText, showConfirmButton = true) => {
  return swalWithMertButtons.fire({
    icon,
    title,
    text,
    confirmButtonText: confirmButtonText,
    showConfirmButton,
    timer: showConfirmButton ? '' : 1500
  })
}
const input = (icon, text, confirmButtonText, showConfirmButton = true) => {
  return swalWithMertButtons.fire({
    icon,
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    text,
    confirmButtonText: confirmButtonText,
    showConfirmButton,
    timer: showConfirmButton ? '' : 1500
  })
}

const password = (icon, text, confirmButtonText, showConfirmButton = true) => {
  return swalWithMertButtons.fire({
    icon,
    input: 'password',
    inputAttributes: {
      autocapitalize: 'off'
    },
    text,
    confirmButtonText: confirmButtonText,
    showConfirmButton,
    timer: showConfirmButton ? '' : 1500
  })
}

const imgAlert = (title, text, imageUrl, imageWidth, imageHeight, confirmButtonText, cancelButtonText) => {
  return swalWithMertButtons.fire({
    title,
    text,
    imageUrl,
    imageWidth,
    imageHeight,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    imageAlt: 'img',
    showCancelButton: true
  })
}

const onlyImg = (title, text, imageUrl, imageWidth, imageHeight, confirmButtonText) => {
  return swalWithMertButtons.fire({
    title,
    text,
    imageUrl,
    imageWidth,
    imageHeight,
    confirmButtonText: confirmButtonText,
    imageAlt: 'img'
  })
}

const sweetAlert = {
  // success (title, text, showConfirmButton, buttonText) {
  //   return confirm(null, title, text, buttonText, showConfirmButton)
  // },
  error (title, text, buttonText) {
    return confirm(null, title, text, buttonText)
  },
  warning (title, text, buttonText) {
    return confirm(null, title, text, buttonText)
  },
  noIcon (title, text, buttonText, showConfirmButton) {
    return confirm(null, title, text, buttonText, showConfirmButton)
  },
  input (title, text, buttonText, showConfirmButton) {
    return input(null, title, text, buttonText, showConfirmButton)
  },
  password (title, text, buttonText, showConfirmButton) {
    return password(null, title, text, buttonText, showConfirmButton)
  },
  useImg (title, text, imageUrl, imageWidth, imageHeight, confirmButtonText, cancelButtonText) {
    return imgAlert(title, text, imageUrl, imageWidth, imageHeight, confirmButtonText, cancelButtonText)
  },
  onlyImg (title, text, imageUrl, imageWidth, imageHeight, confirmButtonText) {
    return onlyImg(title, text, imageUrl, imageWidth, imageHeight, confirmButtonText)
  },
  question (title, text, confirmButtonText, cancelButtonText) {
    return swalWithMertButtons.fire({
      icon: null,
      title,
      text,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    })
  }

}
export default sweetAlert
