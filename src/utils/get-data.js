    export function GetData(url) {
        return fetch(url)
                    .then(res => {
                        if (res.ok) {
                            return res.json()
                        } 
                    })
                    .then(data => {
                        return data.data;
                    })
                    .catch(error => {
                        console.log('Ошибка при получении данных: ' + error.message)
                    })
      };