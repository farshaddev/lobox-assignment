import { useEffect, useRef } from "react";
import useMultiSelect from "../../hooks/useMultiSelect";
import Dropdown from "../DropDown/DropDown";
import "./MultiSelect.scss";

const MultiSelect: React.FC = () => {
	const {
		dropdownItems,
		selectedDropdownItems,
		handleAddItem,
		handleDropdownItemClick,
		handleClose,
	} = useMultiSelect({ initialDropdownItems: ["Science"] });
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				inputRef.current &&
				!inputRef.current.contains(event.target as Node)
			) {
				handleClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleClose]);

	return (
		<div className="multi-select">
			{selectedDropdownItems.join(", ")}
			<input
				ref={inputRef}
				type="text"
				className="multi-select__input"
				placeholder="Type and press Enter to add new item"
				onKeyDown={(e) => handleAddItem(e)}
			/>
			<Dropdown
				items={dropdownItems}
				onItemClick={handleDropdownItemClick}
			/>
		</div>
	);
};

export default MultiSelect;
