/* eslint-disable react/prop-types */
import React from "react";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";

/**
 * 
 * @param {Object} props
 * @param {String} props.placeholder placeholder of input
 * @param {Function} props.onChange onChange Input
 */

export default function Search(props) {
	return (
		<div className="search">
			<input placeholder={props.placeholder} onChange={props.onChange} />
			<SearchIcon />
		</div>
	);
}
