export default function inputDate({name,value,onChange}){ 
    return(
        <input type="date" required name={name} value={value} onChange={onChange}></input>
    )
}