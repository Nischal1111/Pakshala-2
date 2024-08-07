import {toast,Bounce} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const delnotify = () => {
    const notify=()=>{
        toast.error('Deleted Successfully !!!', {
position: "top-center",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
transition: Bounce,
});
    }
    return notify()
}
export const failedaddnotify = () => {
    const notify=()=>{
        toast.error('Failed to Add !!!', {
position: "top-center",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
transition: Bounce,
});
    }
    return notify()
}

