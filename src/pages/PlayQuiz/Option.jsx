export default function Option({ id, styles, optionText, onSelect, isSelected }) {
    return (
        <li className={styles.option}>
            <label htmlFor={id} className={styles.label}>
                <input
                    type="radio"
                    id={id}
                    name="option"
                    onChange={onSelect}
                    checked={isSelected}
                />
                <p className={styles.option_text}>{optionText}</p>
            </label>
        </li>
    );
}
