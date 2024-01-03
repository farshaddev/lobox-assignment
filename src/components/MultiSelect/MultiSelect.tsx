import { useState, useEffect, useRef } from "react";
import useMultiSelect from "../../hooks/useMultiSelect";
import Dropdown from "../DropDown/DropDown";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./MultiSelect.scss";

const MultiSelect: React.FC = () => {
	const handleWrapperClick = () => {
		if (inputRef.current) {
			inputRef.current.focus();
			setInputFocus(true);
		}
	};

	const {
		dropdownItems,
		selectedDropdownItems,
		handleAddItem,
		handleDropdownItemClick,
	} = useMultiSelect({
		initialDropdownItems: [
			"Education",
			"Yeeeah, Science!",
			"Art",
			"Sport",
			"Games",
			"Health",
		],
		handleWrapperClick,
	});

	const [isInputFocused, setInputFocus] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		const clickedElement = event.target as Node;

		if (
			wrapperRef.current &&
			!wrapperRef.current.contains(clickedElement) &&
			inputRef.current &&
			!inputRef.current.contains(clickedElement) &&
			dropdownRef.current &&
			!dropdownRef.current.contains(clickedElement)
		) {
			setInputFocus(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="multi-select">
			<div
				ref={wrapperRef}
				className={`multi-select__wrapper ${
					isInputFocused ? "multi-select__wrapper--focus" : ""
				} ${
					selectedDropdownItems.length > 0
						? "multi-select__wrapper--selected"
						: ""
				}`}
				onClick={handleWrapperClick}
			>
				<div className="multi-select__wrapper-selected">
					{selectedDropdownItems.join(", ")}
				</div>
				<input
					ref={inputRef}
					type="text"
					className="multi-select__wrapper-input"
					placeholder="Type and press Enter"
					onKeyDown={(e) => handleAddItem(e)}
				/>
				<div className="multi-select__wrapper-arrow">
					{isInputFocused ? <IoIosArrowUp /> : <IoIosArrowDown />}
				</div>
			</div>
			<Dropdown
				ref={dropdownRef}
				className={
					isInputFocused ? "dropdown dropdown--focus" : "dropdown"
				}
				items={dropdownItems}
				onItemClick={handleDropdownItemClick}
			/>
		</div>
	);
};

export default MultiSelect;
