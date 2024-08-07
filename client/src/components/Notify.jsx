import {toast,Bounce} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const donenotify = () => {
    const donenotify=()=>{
        toast.success("Order Placed Successfully !!!", {
position: "top-center",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
color:"orange",
transition: Bounce,
className: 'toast-custom',
progressClassName: 'toast-custom-progress',
});
    }
    return donenotify()
}
export const Reservenotify = () => {
    const donenotify=()=>{
        toast.success("Reserve Sent !!!", {
position: "top-center",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
color:"orange",
transition: Bounce,
className: 'toast-custom',
progressClassName: 'toast-custom-progress',
});
    }
    return donenotify()
}
export const failednotify = () => {
    const donenotify=()=>{
        toast.success("Failed to Reserve !!!", {
position: "top-center",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
color:"orange",
transition: Bounce,
className: 'toast-custom',
progressClassName: 'toast-custom-progress',
});
    }
    return donenotify()
}
export const contactnotify = () => {
    const donenotify=()=>{
        toast.info("Message sent !!!", {
position: "top-center",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
color:"orange",
transition: Bounce,
className: 'toast-custom',
progressClassName: 'toast-custom-progress',
});
    }
    return donenotify()
}

