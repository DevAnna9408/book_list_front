<template>
  <div id="home-main" class="wrap">
    <div class="container">
      <!-- [front] 파일 업로드 & 다운로드 과제 체크리스트 1번 -->
      <div>
          <input type="file" method="post" :name="excelPart" >
      </div>
      <div class="row">
        <h2>Form 관련 컴포넌트들</h2>
      </div>
      <div class="row">
        <div class="col col-3">
          <div class="input-group">
            <input-text label="input-text" rules="required" name="이름"></input-text>
          </div>
        </div>
        <div class="col col-3">
          <input-select label="input-select" rules="required" :options="selectOptions"></input-select>
          <p>- vue-select 외부 컴포넌트 사용</p>
          <p>- 밸리데이션 컴포넌트 미포함</p>
        </div>
        <div class="col col-3">
          <input-checkbox label="input-checkbox"></input-checkbox>
        </div>
        <div class="col col-3">
          <input-radio label="input-radio" :options="radioOptions"></input-radio>
<!--          <input-file @change="fileChangeHandler" />-->
          <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          @change="excelUpload"
          />
        </div>
      </div>
      <hr>
      <table-paging
        :header="header" :results="results" :perPage="search.page"
      >
        <template #table-data>
        </template>
      </table-paging>
      <!--TODO: 에디터 사용시 .env 버킷 / AWS 키 필요 -->
      <editor></editor>

    </div>
    <color-picker
      :color.sync="color"
    ></color-picker>
  </div>
</template>

<script>
import Editor from '../../components/editor/editor.vue'
import ajax from '@/wrapper/ajax'
import * as url from 'url'
import apxAlert from '@/wrapper/apex-alert'
import i18n from '@/store/modules/i18n'
import ColorPicker from '../../components/color-picker.vue'
export default {
  name: 'home-main',
  props: {},
  components: {
    // InputFile,
    Editor,
    ColorPicker
  },
  mixins: [],
  data () {
    return {
      search: {
        page: 0,
        size: 20,
        uploadExcelData: [],
        downExcelData: []
      },
      excelFile: null,
      // 테이블헤더
      header: [
        { value: '수험번호', class: 'appl-list-xl' },
        { value: '과정', class: 'appl-list-l' },
        { value: '캠퍼스', class: 'appl-list-l ' },
        { value: '단과대학', class: '' },
        { value: '학과', class: '' },
        { value: '전형', class: 'appl-list-l ' },
        { value: '세부지원분야', class: '' },
        { value: '한글이름', class: '' },
        { value: '영문이름', class: '' }
      ],
      results: { // api에서 페이징화된 객체로 온 결과
        content: [],
        totalElements: 0, // 전체 갯수
        totalPages: 0, // 전체 페이지수
        number: 0
      },
      // input-select prop
      selectOptions: [
        { code: '01', value: '경영학과' }
      ],
      // input-radio prop
      radioOptions: [
        { code: 'CA', value: '캐나다' },
        { code: 'KO', value: '대한민국' }
      ],
      color: '#112233'
    }
  },
  computed: {
  },
  methods: {
    // [front] 파일 업로드 & 다운로드 체크리스트 2번
    excelPart: function (_files) {
      ajax('POST', url, _files, {
        'Content-Type': 'multipart/form-data'
      }, null, null, false).then(_res => {
        // eslint-disable-next-line no-undef
        resolve(_res)
      }).catch(_err => {
        if (_err.message === 'Network Error') {
          apxAlert.error(i18n.t('error.file.upload.title'), i18n.t('error.file.upload.failMessage'))
        }
        // eslint-disable-next-line no-undef
        reject(_err)
      })
    },
    excelUpload (e) {
      let _files = e.target.files[0]
      ajax('POST', 'http://192.168.0.31/commcode/excel/test', { 'files': _files }, {
        'Content-Type': 'multipart/form-data'
      }, null, null, false).then(_res => {
        const file = new Blob([_res.data])
        const a = document.createElement('a')
        const url = window.URL.createObjectURL(file)
        a.href = url
        a.download = decodeURI(
          _res.headers['content-disposition']
            .toString('binary')
            .split('filename=')[1]
        )
        document.body.appendChild(a)
        a.click()
        a.parentNode.removeChild(a)
      }
      )
    }
  }
}
</script>

<style></style>
<style scoped>
.wrap {
  padding-top: 100px;
    min-width: 1280px;
}
</style>
