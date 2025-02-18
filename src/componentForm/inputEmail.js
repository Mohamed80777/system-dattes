export default function inputEmail({name,value,onChange} ){
    return(
        <input type="email" placeholder="entre your email" name={name} value={value} onChange={onChange} required></input>
    )
}