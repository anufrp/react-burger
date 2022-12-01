
import request from "./make-request";

export function loginRequest(url, newUserData) {

    const options = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(newUserData)
    }
    
    return request(url, options)
    
    };



// export const loginRequest1 = async form => {
//     return await fetch('https://cosmic.nomoreparties.space/login', {
//         method: 'POST',
//         mode: 'cors',
//         cache: 'no-cache',
//         credentials: 'same-origin',
//         headers: {
//         'Content-Type': 'application/json'
//         },
//         redirect: 'follow',
//         referrerPolicy: 'no-referrer',
//         body: JSON.stringify(form)
//     });
//     };


// const signIn = async form => {
    
//     const data = await loginRequest1(form)
//       .then(res => res.json())
//       .then(data => data);

//     if (data.success) {
//       setUser({ ...data.user, id: data.user._id });
//     } 
    
//   };

//   const signOut = cb => {
//     return fakeAuth.signOut(() => {
//       setUser(null);
//       cb();
//     });
//   };
