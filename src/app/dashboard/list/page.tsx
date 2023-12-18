import { queryStudents } from './api.js'
import { usePagination } from '@alova/scene-react'

const App = () => {
    const {
        // 加载状态
        loading,

        // 列表数据
        data,

        // 是否为最后一页
        // 下拉加载时可通过此参数判断是否还需要加载
        isLastPage,

        // 当前页码，改变此页码将自动触发请求
        page: [page, setPage],

        // 每页数据条数
        pageSize: [pageSize, setPageSize],

        // 分页页数
        pageCount,

        // 总数据量
        total
    } = usePagination(
        // Method实例获取函数，它将接收page和pageSize，并返回一个Method实例
        (page, pageSize) => queryStudents(page, pageSize),
        {
            // 请求前的初始数据（接口返回的数据格式）
            initialData: {
                total: 0,
                data: []
            },
            initialPage: 1, // 初始页码，默认为1
            initialPageSize: 10 // 初始每页数据条数，默认为10
        }
    )

    // 翻到上一页，page值更改后将自动发送请求
    const handlePrevPage = () => {
        setPage(value => value - 1)
    }

    // 翻到下一页，page值更改后将自动发送请求
    const handleNextPage = () => {
        setPage(value => value + 1)
    }

    // 更改每页数量，pageSize值更改后将自动发送请求
    const handleSetPageSize = () => {
        setPageSize(20)
    }

    return (
        <div>
            {data.map(item => (
                <div key={item.id}>
                    <span>{item.name}</span>
                </div>
            ))}
            <button onClick={handlePrevPage}>上一页</button>
            <button onClick={handleNextPage}>下一页</button>
            <button onClick={handleSetPageSize}>设置每页数量</button>
            <span>共有{pageCount}页</span>
            <span>共有{total}条数据</span>
        </div>
    )
}
