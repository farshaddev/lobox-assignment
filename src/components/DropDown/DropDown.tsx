import React, { forwardRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import "./DropDown.scss";

interface DropdownProps {
	items: string[];
	onItemClick: (item: string) => void;
	className: string;
}

const Dropdown: React.ForwardRefRenderFunction<
	HTMLDivElement,
	DropdownProps
> = ({ items, onItemClick, className }, ref) => {
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	const handleItemClick = (item: string) => {
		const updatedSelectedItems = selectedItems.includes(item)
			? selectedItems.filter((selectedItem) => selectedItem !== item)
			: [...selectedItems, item];

		setSelectedItems(updatedSelectedItems);
		onItemClick(item);
	};

	return (
		<div ref={ref} className={className}>
			{items.map((item, index) => (
				<div
					className={`dropdown__item ${
						selectedItems.includes(item)
							? "dropdown__item--selected"
							: ""
					}`}
					key={index}
					onClick={() => handleItemClick(item)}
				>
					{item}
					{selectedItems.includes(item) && <FaCheck />}
				</div>
			))}
		</div>
	);
};

export default forwardRef(Dropdown);
