import { useState } from "react";

interface useMultiSelectProps {
	initialDropdownItems: string[];
	handleWrapperClick: () => void;
}

const useMultiSelect = ({
	initialDropdownItems,
	handleWrapperClick,
}: useMultiSelectProps) => {
	const [dropdownItems, setDropdownItems] =
		useState<string[]>(initialDropdownItems);
	const [selectedDropdownItems, setSelectedDropdownItems] = useState<
		string[]
	>([]);

	const handleAddItem = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && event.currentTarget.value.trim() !== "") {
			const newItem = event.currentTarget.value.trim();
			setDropdownItems((prevItems) => [...prevItems, newItem]);
			event.currentTarget.value = "";
		}
	};

	const handleDropdownItemClick = (item: string) => {
		if (selectedDropdownItems.includes(item)) {
			setSelectedDropdownItems((prevItems) =>
				prevItems.filter((i) => i !== item)
			);
		} else {
			setSelectedDropdownItems((prevItems) => [...prevItems, item]);
		}
		handleWrapperClick();
	};

	return {
		dropdownItems,
		selectedDropdownItems,
		handleAddItem,
		handleDropdownItemClick,
	};
};

export default useMultiSelect;
