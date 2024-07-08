import React, { useState } from "react";

const Completed = ({disabled, onChecked, onChange,}) => {
	return(
		<input type="checkbox" disabled={disabled} checked={onChecked} onChange={onChange}/>
	)
}
export default Completed;