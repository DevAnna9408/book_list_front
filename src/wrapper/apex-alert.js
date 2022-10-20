import Swal from 'sweetalert2'
import { i18n } from '@/plugins/i18n'

let swalWithMertButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary mt-3 m-1',
    cancelButton: 'btn mt-3 m-1'
  },
  buttonsStyling: false
})

const confirm = (icon, title, text, confirmButtonText = i18n.t('error.confirm'), showConfirmButton = true) => {
  return swalWithMertButtons.fire({
    icon,
    title,
    text,
    confirmButtonText,
    showConfirmButton,
    timer: showConfirmButton ? '' : 1500
  })
}
const apxAlert = {
  success (title, text, showConfirmButton, buttonText) {
    return confirm('success', title, text, buttonText, showConfirmButton)
  },
  error (title, text, buttonText) {
    return confirm('error', title, text, buttonText)
  },
  warning (title, text, buttonText) {
    return confirm('warning', title, text, buttonText)
  },
  question (title, text, confirmButtonText = i18n.t('error.yes'), cancelButtonText = i18n.t('error.no')) {
    return swalWithMertButtons.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText
    })
  }

}
export default apxAlert
