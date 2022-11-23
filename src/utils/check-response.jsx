export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    Promise.reject(`Ошибка ${res.status}`);
    return null
}
