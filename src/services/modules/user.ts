import { alovaInstance } from '@/services/request'

export class UserServices {
    public static async query() {
        const methodInstance = alovaInstance.Get('/user', {
            name: '132'
        })
        methodInstance.meta = {
            ignoreToken: true
        }
        return methodInstance
    }

    public static async downloadApi(filePath: string) {
        const methodInstance = alovaInstance.Post('/download_file', {
            filePath
        })
        methodInstance.meta = {
            isDownload: true
        }
        return methodInstance
    }
}
