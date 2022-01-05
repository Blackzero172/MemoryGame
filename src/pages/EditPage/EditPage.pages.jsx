import React from "react";
import EditCard from "../../components/EditCard/EditCard.components";
import "./EditPage.styles.css";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import Popup from "../../components/Popup/Popup.components";
const EditPage = ({
	cards,
	editItem,
	currentEditCard,
	onConfirm,
	onCancel,
	popRef,
	keywordInputRef,
	imgURLInputRef,
}) => {
	const customCards = cards.filter((card) => card.id > 18);
	return (
		<div className="main-container">
			<CustomButton styleClass="add-btn" onClick={editItem}>
				<i className="fas fa-plus"></i>
			</CustomButton>
			<div className="card-grid">
				{customCards.map((card) => {
					return <EditCard card={card} key={card.id} onClick={editItem} />;
				})}
			</div>
			<Popup
				confirmText={
					currentEditCard.hasOwnProperty("answer") ? (
						<i className="fas fa-edit"></i>
					) : (
						<i className="fas fa-plus"></i>
					)
				}
				cancelText={<i className="fas fa-times"></i>}
				popRef={popRef}
				title={currentEditCard.hasOwnProperty("answer") ? "Edit Card" : "Add Card"}
				onConfirm={onConfirm}
				onCancel={onCancel}
			>
				<CustomInput
					placeholder="Please Input The Keyword"
					label="Keyword (Required)"
					value={currentEditCard.hasOwnProperty("answer") ? currentEditCard.answer : ""}
					inputRef={keywordInputRef}
				/>
				<CustomInput
					placeholder="Please Input The Icon URL"
					label="Icon Link (Optional)"
					value={currentEditCard.hasOwnProperty("imageURL") ? currentEditCard.imageURL : ""}
					inputRef={imgURLInputRef}
				/>
			</Popup>
		</div>
	);
};
export default EditPage;
