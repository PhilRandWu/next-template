import { createAlova } from 'alova'
import ReactHook from 'alova/react'
import GlobalFetch from 'alova/GlobalFetch'
import { baseURL } from '@/app/config/services'

export const alovaInstance = createAlova({
    baseURL,
    statesHook: ReactHook,
    requestAdapter: GlobalFetch(),
    // 在开发环境开启错误日志
    errorLogger: process.env.NODE_ENV === 'development',
    async beforeRequest(method) {
        // 假设我们需要添加token到请求头
        if (!method.meta?.ignoreToken) {
            method.config.headers.token = '...'
        }
    },
    responded: {
        // 请求成功的拦截器
        // 当使用GlobalFetch请求适配器时，第一个参数接收Response对象
        // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
        onSuccess: async (response, method) => {
            if (response.status >= 400) {
                throw new Error(response.statusText)
            }
            if (method.meta?.isDownload) {
                return response.blob()
            }
            const json = await response.json()
            if (json.code !== 200) {
                // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
                throw new Error(json.message)
            }

            // 解析的响应数据将传给method实例的transformData钩子函数，这些函数将在后续讲解
            return json.data
        },
        // 请求失败的拦截器
        // 请求错误时将会进入该拦截器。
        // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
        onError: (err, method) => {
            // alert(error.message)
        },

        // 请求完成的拦截器
        // 当你需要在请求不论是成功、失败、还是命中缓存都需要执行的逻辑时，可以在创建alova实例时指定全局的`onComplete`拦截器，例如关闭请求 loading 状态。
        // 接收当前请求的method实例
        onComplete: async method => {
            // 处理请求完成逻辑
        }
    },
    // 请求超时时间，单位为毫秒，默认为0，表示永不超时
    timeout: 50000
})
