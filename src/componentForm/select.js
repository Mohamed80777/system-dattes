export default function Select({option1, option2, option3}){ 
    return (
        <select required>
            <option value="1">{option1}</option>
            <option value="2">{option2}</option>
            <option value="3">{option3}</option>
        </select>
    );
}