// Option Component
// Represents a single option in a multiple-choice question.

// Props:
// - id: Unique identifier for the option.
// - styles: CSS styles for the option (imported from parent component).
// - optionText: The text content of the option.
// - onSelect: Callback function triggered when the option is selected.
// - isSelected: Boolean indicating whether the option is currently selected.

export default function Option({ id, styles, optionText, onSelect, isSelected }) {
    return (
        // List item representing an option
        <li className={styles.option}>
            {/* Label for the radio button input */}
            <label htmlFor={id} className={styles.label}>
                {/* Radio button input */}
                <input
                    type="radio"
                    id={id}
                    name="option"
                    onChange={onSelect}
                    checked={isSelected}
                />
                {/* Text content of the option */}
                <p className={styles.option_text}>{optionText}</p>
            </label>
        </li>
    );
}
