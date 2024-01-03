import React from "react";

interface DropdownProps {
	items: string[];
	onItemClick: (item: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, onItemClick }) => {
	return (
		<ul className="dropdown">
			{items.map((item, index) => (
				<li key={index} onClick={() => onItemClick(item)}>
					{item}
				</li>
			))}
		</ul>
	);
};

export default Dropdown;
