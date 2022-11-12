export function CreateOrder(url, ingredients) {
    return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ingredients: ingredients})
            })
                .then(response => response.json())
                .then(order => { return order })
                .catch(error => {
                    console.log('Ошибка при получении данных: ' + error.message)
                });
}