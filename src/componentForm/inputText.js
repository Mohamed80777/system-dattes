export default function inputText({placeholder,name,onChange,value}){
    return(
        <input type="text" placeholder={placeholder} required name={name} value={value} onChange={onChange} ></input>
    )
}