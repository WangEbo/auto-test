export const getList = jest.fn(() => {
    return new Promise(resolve => {
        resolve({
            code: 200,
            data: {
                success: 1,
                data: {
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
})