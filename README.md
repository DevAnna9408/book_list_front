<p align="center"><img align="center" style="width:320px" src="https://imgur.com/RReY30Y.png"/></p><br/>
<p align="center"></p>

> # 에이펙스소프트 vue-cli3 기반의 Front클린 프로젝트





## 들어가기

#### 필수 선행 확인 및 적용

- [프론트 엔트 개발규칙&가이드](https://docs.google.com/document/d/15pF2egBmu_QEjYFNxlgCO-uAuE0mZnvcdgl2vG1FfNw/edit?usp=sharing)
- [vue 개발순서](https://drive.google.com/file/d/1BbX9wLfpP24jfEJA_sjl2nsVO3tNYlsQ/view?usp=sharing)



## 사용 버전

| 이름                               | 버전          | 사용                         |
| ---------------------------------- | ------------- | ---------------------------- |
| vue                                | 2.6.6         |                              |
| vue-router                         | 3.0.1         |                              |
| vuex                               | 3.0.1         |                              |
| vue-moment                         | 4.0.0         | Date                         |
| vue-kindergarten                   | 0.3.3         | 인증.인가                    |
| vue-i18n                           | 8.0.0         | 다국어 적용                  |
| vee-validate                       | 3.0.4         | 화면 validation              |
| sweetalert2                        | 8.2.6         | Alert                        |
| axios                              | 0.18.0        | rest api 통신                |
| aws-sdk                            | 2.406.0       | s3 파일 업로드.다운로드.삭제 |
| quill                              | 1.3.6         | 에디터                       |
| quill-image-drop-module            | 1.0.3         | 에디터-이미지 드랍           |
| quill-video-resize-module2         | 0.0.1         | 에디터-비디오 사이즈 조절    |
| apexsoft-quill-image-resize-module | 3.0.1         | 에디터-이미지 사이즈 조절    |
| emoji-regex                        | 8.0.0         | 에디터 -이모티콘 정규식      |
| fuzzysearch                        | 1.0.3         | 검색                         |
| @babel/polyfill                    | 7.4.4         | IE 적용하기                  |
| vue-recaptcha                      | 1.2.0         | 구글 캡차 v2                 |
| vue-plugin-load-script             | 1.2.0         |                              |



## 프로젝트 초기 설정

- `TODO`, `FIXME` 확인 하고 수정한다
- Constants.js  확인하고 수정한다
- `.env` 파일 확인하고 수정한다
  - `VUE_APP_AWS_ACCESS_KEY_ID`  :s3
  - `VUE_APP_AWS_SECRET_ACCESS_KEY` : s3 
  - `VUE_APP_AWS_REGION ` :s3 리전
  - `VUE_APP_AWS_BUCKET `: s3 파일 버킷 
  - `VUE_APP_I18N_LOCALE `: 다국어 기본 설정
  - `VUE_APP_I18N_FALLBACK_LOCALE` :다국어 기본 설정 
  - `VUE_APP_API_DOMAIN` : 현재 API 주소(axios 통신위해 필요)
  - `VUE_APP_FRONT_DOMAIN` : 현재 프론트 주소 (로그인 쿠키 설정을 위해 존재)



## 폴더 구조

> 상세한 내용은 [wiki](http://apexsoft.iptime.org:8090/web-framework/vue-cli3/wikis/home#%ED%8F%B4%EB%8D%94%EA%B5%AC%EC%A1%B0)에서 확인한다

```bash
├── assets
├── components
├── layout
│   ├── global
│   │   ├── index.js
│   │   ├── *.vue
├── kindergarten
│   ├── governesses
│   ├── perimeters
│   ├── childs.js
├── mixins
│   ├── global
│   │   ├── index.js
│   │   ├── *.js
│   ├── *.js
├── plugins
│   ├── material-kit
│   ├── index.js
│   ├── *.js
├── router
│   ├── index.js
│   ├── routes.js
├── store
│   ├── index.js
│   ├── modules
│   │   ├── index.js
│   │   ├── *.js
├── utils
│   ├── date.js
│   ├── type.js
│   ├── uploadFilePath.js
│   ├── valid.js
├── views
│   ├── *.vue
├── wrapper
│   ├── *.js
├── App.vue
├── main.js
```



## url 정의



| 패턴                                       | name                 | 화면 명         | $route.params                |
| ------------------------------------------ | -------------------- | --------------- | ---------------------------- |
| /                                          | home-main            | 메인 화면       |                              |
| /user/login                                | user-login           | 로그인화면      |                              |
| /user/agree                                | user-agree           | 약관동의        |                              |
| /user/register                             | user-register        | 회원가입        |                              |
| /user/find/id                              | user-find-id         | 아이디 찾기     |                              |
| /user/find/pwd                             | user-find-pwd        | 비밀번호 찾기   |                              |
| /user/modify/pwd/:userId/:expireDate/:hash | user-modify-pwd      | 비밀번호 변경   | userId<br>expireDate<br>hash |


## 주의

### lint 규칙

- `standard` 적용됨
- `git add` 에 연결됨





## 실행 

`yarn serve`

- 3000포트로 실행 된다 (`package.json`  정의 됨 )



## 배포하기

> [vue cli3 배포 모드 설정 관련 참고](https://cli.vuejs.org/guide/mode-and-env.html#modes)

* `yarn build` 실행 
* 현재는 , `.env`파일 과 `.env.producion`파일 로 관리된다
* build 시에는 자동으로  `producion` 모드 파일을 우선으로 읽힌다
* ` "build": "vue-cli-service build"`

### test 서버 추가

* `.env.awstest`  생성

* `package.json`  추가

  * ```bash
    "build-awstest": "vue-cli-service build --mode awstest"
    ```

* `yarn build-awstest` 실행 