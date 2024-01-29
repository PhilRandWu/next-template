export const RegExp = {
    phone: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
    /** 强密码（长度为8位以上，包含数字和大小写） */
    strong_password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/,
    block_chain_account: /^[1-5a-z]{12}$/,
    money: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^[1-9]$)|(^\d\.[1-9]{1,2}$)|(^\d\.[0]{1}[1-9]{1}$|(^\d\.[1-9]{1}[0]{1}$)$)/,
    pdfFile: /(.+(?=[.pdf]$))/,
    rate: /^\d+\.\d+$/,
    percent: /^(\d|[1-9]\d|99)(\.\d{1,2})?$/,
    login_phone: /^(?:(?:\+|00)86)?1\d{10}$/,
    // 座机电话
    tel_phone: /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/,
    // 只支持
    only_number: /^\d+$/,
    //数字及两位小数
    number: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
}

/**
 * 下载excel
 * @param url excel url
 * @param fileName 文件名
 * @constructor
 */
export const DownExcelHandle = (url: any, fileName: string) => {
    const blob: any = new Blob([url], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    const blobUrl = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = ''
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(blobUrl)
}
