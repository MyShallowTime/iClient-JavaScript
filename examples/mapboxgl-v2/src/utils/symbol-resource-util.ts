export function getSymbolBaseUrl() {
    // 开发环境符号资源路径
    if (process.env.DEV) {
        return "./libs/resources/symbols"
    }

    // iclient站点上的符号资源路径
    return '../../dist/resources/symbols';

    // 示例打包后符号资源路径
    // return "./symbol/libs/resources/symbols";
}
