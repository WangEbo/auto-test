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
    }
}