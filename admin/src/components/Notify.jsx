import {toast,Bounce} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const notify = () => {
    const addnotify=()=>{
        toast.success("Added Successfully", {
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
    return addnotify()
}
export const lognotify = () => {
    const addnotify=()=>{
        toast.info("Logged In Successfully !!!", {
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
    return addnotify()
}
export const Outnotify = () => {
    const addnotify=()=>{
        toast.info("Logged Out Successfully !!!", {
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
    return addnotify()
}
export const Marknotify = () => {
    const addnotify=()=>{
        toast.success("Order is Completed !!!", {
position: "top-right",
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
    return addnotify()
}
export const Infonotify = () => {
    const infonotify=()=>{
       toast.info("Please add a image to upload !!!", {
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
    return infonotify()
}
export const booknotify = () => {
    const booknotify=()=>{
       toast.info("Booking Confirmed !!!", {
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
    return booknotify()
}
export const Wrongnotify = () => {
    const Wrongnotify=()=>{
       toast.error("Wrong email or password!!!", {
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
    return Wrongnotify()
}
export const Roomnotify = () => {
    const Wrongnotify=()=>{
       toast.info("Booked Now", {
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
    return Wrongnotify()
}
export const RoomCancelnotify = () => {
    const Wrongnotify=()=>{
       toast.info("Is Available", {
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
    return Wrongnotify()
}
export const Enternotify = () => {
    const Wrongnotify=()=>{
       toast.info("Please enter email or password.", {
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
    return Wrongnotify()
}
export const menufailnotify = () => {
    const Wrongnotify=()=>{
       toast.info("Please provide both an item name and image.", {
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
    return Wrongnotify()
}

export const EMAILfailnotify = (message) => {
    const Wrongnotify=()=>{
       toast.error(message, {
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
    return Wrongnotify()
}
export const EMAILdonenotify = (message) => {
    const Wrongnotify=()=>{
       toast.success(message, {
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
    return Wrongnotify()
}


