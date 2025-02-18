export default function inputModePass({name,value,onChange}){
    return(
        <input type="password" placeholder="entre your password" required name={name} value={value} onChange={onChange}></input>
    )
}