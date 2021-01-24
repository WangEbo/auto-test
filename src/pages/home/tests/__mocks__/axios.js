//通过在  对应的  tests  文件下的 __mocks__  文件夹下 创建 axios.js，jest会改写 axios 内部的方法
//但是 此种方法不能解决 已封装的 axios 实例请求的方式

export default {
    get(url) {
        // 这里根据请求路径，模拟返回值
        switch (url) {
            case '/list':
                return new Promise(resolve => {
                    resolve({
                        code: 200,
                        data: {
                            success: 1,
                            data:{
                                rows: [
                                    {
                                        name: 'dam',
                                        age: 21
                                    },
                                    {
                                        name: 'bob',
                                        age: 24
                                    },
                                    {
                                        name: 'jery',
                                        age: 27
                                    }
                                ]
                            }
                        }
                    })
                })

            default:
                break;
        }
    },

}