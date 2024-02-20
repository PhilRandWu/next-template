/**
 * hexToRgba
 * @param hex hex string
 * @param alpha  aplha value
 */
export function hexToRgba(hex: string, alpha: number) {
    const r = parseInt(hex?.substring(1, 3), 16)
    const g = parseInt(hex?.substring(3, 5), 16)
    const b = parseInt(hex?.substring(5, 7), 16)

    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * use classnames, filter empty className
 * @param classes string[]
 * @example
 *   className={classNames(
 *        active ? 'bg-gray-100' : '',
 *        'block px-4 py-2 text-sm text-gray-700'
 *   )}
 */
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

/**
 * file_size_format 将文件大小转为 Bytes KB MB GB TB PB EB ZB YB 等单位
 * @param filesize number
 */
export const file_size_format = (filesize: number): string => {
    if (filesize === null || filesize === 0) {
        return '0 Bytes'
    }
    const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let index = 0
    let file_size = parseFloat(String(filesize))
    index = Math.floor(Math.log(file_size) / Math.log(1024))
    let size = file_size / Math.pow(1024, index)
    size = +size.toFixed(2) //保留的小数位数
    return size + unitArr[index]
}

/**
 * permission enum
 * * NONE: 0
 * * UPLOAD: 1
 * * DOWNLOAD: 2
 * * DEL: 4
 * * UPDATE: 8
 * * CLOSE: 16
 * * OPEN: 32
 * * DETAIL: 64
 */
enum PermissionEnum {
    NONE = 0,
    UPLOAD = 1,
    DOWNLOAD = 2,
    DEL = 4,
    UPDATE = 8,
    CLOSE = 16,
    OPEN = 32,
    DETAIL = 64
}

type PermissionEnumKey = keyof typeof PermissionEnum

/**
 * 权限方法
 */
const PermissionMethod = {
    /**
     * 添加权限
     * @param userPermission
     * @param flag
     */
    addPermission: (userPermission: PermissionEnum, flag: PermissionEnum) => {
        return userPermission | flag
    },
    hasPermission: (userPermission: PermissionEnum, flag: PermissionEnum) => {
        return (userPermission & flag) === flag
    },
    removePermission: (
        userPermission: PermissionEnum,
        flag: PermissionEnum
    ) => {
        return userPermission & ~flag
    },
    listPermission: (userPermission: PermissionEnum): PermissionEnumKey[] => {
        let result: PermissionEnumKey[] = []
        if (userPermission & PermissionEnum.UPLOAD) {
            result.push('UPLOAD')
        }
        if (userPermission & PermissionEnum.DOWNLOAD) {
            result.push('DOWNLOAD')
        }
        if (userPermission & PermissionEnum.DEL) {
            result.push('DEL')
        }
        if (userPermission & PermissionEnum.UPDATE) {
            result.push('UPDATE')
        }
        if (userPermission & PermissionEnum.CLOSE) {
            result.push('CLOSE')
        }
        if (userPermission & PermissionEnum.OPEN) {
            result.push('OPEN')
        }
        if (userPermission & PermissionEnum.DETAIL) {
            result.push('DETAIL')
        }
        return result
    }
}

/**
 * * 权限操作:
 * * enum: 权限枚举
 * * method: 权限方法
 *      - addPermission: 添加权限
 *      - hasPermission: 是否有权限
 *      - removePermission: 移除权限
 *      - listPermission: 权限列表 -> PermissionEnumKey = keyof typeof PermissionEnum
 */
export const Permission = {
    enum: PermissionEnum,
    method: PermissionMethod
}
