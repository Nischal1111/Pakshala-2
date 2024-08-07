import {toast,Bounce} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const editnotify = () => {
    const editnotify=()=>{
        toast.info("Edited Successfully", {
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
    return editnotify()
}

