import React, { useState } from 'react'; // Importing Modules
// Creating a function to track the changes in DropDown List

function DropdownList({setState}) { 
//Using useState to set the defualt value of DropDown Menu and declare the values
 const [selectedValue, setSelectedValue] = useState('High'); 

const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    setState(newValue);
 };
return (
    <select value={selectedValue} onChange={handleChange}>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
    </select>
 );
}
export default DropdownList;