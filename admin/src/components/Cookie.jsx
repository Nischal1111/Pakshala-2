export const userLogged=()=>{
    const isLogged=localStorage.getItem("notify")==="true"
    return isLogged
}