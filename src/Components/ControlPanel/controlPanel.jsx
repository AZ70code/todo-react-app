import React from "react";
import style from './controlPanel.module.css';
import { Button } from "@mui/material";

const ControlPanel = ({total, archived, completed}) => {
	return (
		<div className={style.control}>
			<h2 className={style.title}>Todo info</h2>
			<div className={style.inner}>
			<div className={style.info}>
				<p>Total todo: {total}</p>
				<p>Completed: {completed}</p>
				<p>Archived: {archived}</p>
			</div>
			<div className={style.buttongroup}>
				<Button color="success" children="ADD NOTE" variant="contained" size="large"/>
				<Button color="warning" variant="contained" size="large">ARCHIV</Button>
			</div>
			</div>
		</div>
	)
}
export default ControlPanel;