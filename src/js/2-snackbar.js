import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const delayInMs = document.querySelector('[name=delay]');
const formEl = document.querySelector('.form');


formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    const delay = parseInt(delayInMs.value);
    const fulfilled = document.querySelector('input[value=fulfilled]:checked');
     const promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (fulfilled) {
                        resolve(delay);
                    } else {
                        reject(delay);
                    }
                }, delay);
     });
    promise
        .then((delay) => {
                    iziToast.success({
    position: 'topCenter',
    message: `✅ Fulfilled promise in ${delay} ms`,
});
                   
                })
        .catch((delay) => {
                    iziToast.error({
                        position: 'topCenter',
    message: `❌ Rejected promise in ${delay} ms`,
});

                });

});


 