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
  warning (title, text) {
    return confirm(null, title, text, '확인')
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
  },
  radio (text, inputOptions, confirmButtonText) {
    return swalWithMertButtons.fire({
      icon: null,
      text,
      input: 'radio',
      inputOptions: inputOptions,
      confirmButtonText: confirmButtonText
    })
  },
  html (html, confirmButtonText, showCancelButton, cancelButtonText) {
    return swalWithMertButtons.fire({
      title: null,
      icon: null,
      html: html,
      showCloseButton: false,
      showCancelButton: showCancelButton,
      focusConfirm: false,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    })
  },
  signUp (confirmButtonText) {
    return swalWithMertButtons.fire({
      title: '회원가입',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="이메일" style="font-size: 15px">' +
        '<p style="font-size: 15px;">비밀번호는 대소문자 및 숫자를 포함한 <br /> 16자 이내로 작성 해 주세요.</p>' +
        '<input id="swal-input2" class="swal2-input" placeholder="비밀번호" required="true" maxlength="16" type="password" style="font-size: 15px">' +
        '<input id="swal-input3" class="swal2-input" placeholder="한번 더 입력 해 주세요." required="true" maxlength="16" type="password" style="font-size: 15px">' +
        '<p style="font-size: 15px;">비밀번호 분실시 사용할 <br /> 본인 확인 질문을 작성 해 주세요.</p>' +
        '<input id="swal-input4" class="swal2-input" placeholder="본인 확인 질문" style="font-size: 15px">' +
        '<input id="swal-input5" class="swal2-input" placeholder="답변" style="font-size: 15px">',
      confirmButtonText: confirmButtonText,
      showCancelButton: true,
      cancelButtonText: '닫기',
      focusConfirm: false,
      allowOutsideClick: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          document.getElementById('swal-input3').value,
          document.getElementById('swal-input4').value,
          document.getElementById('swal-input5').value
        ]
      }
    })
  },
  findPassword (confirmButtonText) {
    return swalWithMertButtons.fire({
      title: '비밀번호 찾기',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="이메일" style="font-size: 15px">' +
        '<input id="swal-input2" class="swal2-input" placeholder="프로필명" style="font-size: 15px">' +
        '<p style="font-size: 15px;">프로필명을 설정 한 적이 없다면 <br /> 이메일의 @ 앞 부분을 적어주세요</p>',
      confirmButtonText: confirmButtonText,
      showCancelButton: true,
      cancelButtonText: '닫기',
      focusConfirm: false,
      allowOutsideClick: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    })
  },
  answerPassword (answer, confirmButtonText) {
    return swalWithMertButtons.fire({
      title: '',
      html:
        '<p style="font-size: 15px;">' + answer + '</p>' +
        '<input id="swal-input1" class="swal2-input" placeholder="답변" style="font-size: 15px">',
      confirmButtonText: confirmButtonText,
      showCancelButton: true,
      cancelButtonText: '닫기',
      focusConfirm: false,
      allowOutsideClick: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value
        ]
      }
    })
  },
  resetPassword (confirmButtonText) {
    return swalWithMertButtons.fire({
      title: '',
      html:
        '<p style="font-size: 15px;"> 새로운 비밀번호를 입력 해 주세요. <br /> 비밀번호는 대소문자 및 숫자를 포함한 <br /> 16자 이내로 작성 해 주세요. </p>' +
        '<input id="swal-input1" class="swal2-input" placeholder="비밀번호" required="true" maxlength="16" type="password" style="font-size: 15px">' +
        '<input id="swal-input2" class="swal2-input" placeholder="한번 더 입력 해 주세요." required="true" maxlength="16" type="password" style="font-size: 15px">',
      confirmButtonText: confirmButtonText,
      showCancelButton: true,
      cancelButtonText: '닫기',
      focusConfirm: false,
      allowOutsideClick: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    })
  }
}
export default sweetAlert
