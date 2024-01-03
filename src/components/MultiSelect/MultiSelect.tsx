import MultiSelectData from "../../json/multiSelectData.json";
import "./MultiSelect.scss";

const MultiSelect: React.FC = () => {
	const selectedItems = MultiSelectData;
	const selectedItemsNamesString = MultiSelectData.map(
		(item) => item.name
	).join(", ");

	return (
		<div className="multi-select">
			<div className="multi-select__selected-items">
				{selectedItems.map((item) => (
					<div key={item.id} className="multi-select__selected-item">
						{item.name}
					</div>
				))}
			</div>
			<input
				type="text"
				className="multi-select__input"
				placeholder="Type and press Enter to add new item"
				value={selectedItemsNamesString}
			/>
		</div>
	);
};

export default MultiSelect;
