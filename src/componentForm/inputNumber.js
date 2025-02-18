export default function inputNumber({placeholder,name,onChange,value}){
    return(
        <input type="number" placeholder={placeholder} required name={name} value={value} onChange={onChange}></input>
    )
}