import AWS from 'aws-sdk'
import { isIE } from '@/utils/browserCheck'

const config = {
  accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.VUE_APP_AWS_REGION
}

const AWSS3 = new AWS.S3(config)

const params = {
  Bucket: process.env.VUE_APP_AWS_BUCKET
}
export const s3 = {
  upload (prefix, files, ACL = 'private') {
    let name = isIE() ? files.name : files.name.normalize('NFC')
    let uploadParm = {
      ...params,
      Key: `${prefix}/${name}`,
      ACL,
      Body: files
    }
    return new Promise((resolve, reject) => {
      AWSS3.putObject(uploadParm, (err, result) => {
        err ? reject(err) : resolve(Object.assign(uploadParm, { fullURL: (ACL !== 'private') ? this.fullUrl(uploadParm.Key) : '' }))
      })
    })
  },
  down (fileKey, fileOriginName, Expires = 60 * 5) {
    let downParm = {
      ...params,
      Key: decodeURI(fileKey),
      ResponseContentDisposition: `attachment;filename=${encodeURI(fileOriginName)}`,
      Expires
    }
    return new Promise((resolve, reject) => {
      AWSS3.getSignedUrl('getObject', downParm, (err, url) => {
        err ? reject(err) : resolve(url)
      })
    })
  },
  fullUrl (Key) {
    return `https://s3.${config.region}.amazonaws.com/${params.Bucket}/${encodeURI(Key)}`
  }
}
