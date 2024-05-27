import React, { useState } from 'react';

const Checkbox = ({ label, name, onChange }) => {
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        onChange(event.target.checked ? 1 : 0);
    };

    return (
        <div className="checkbox-container">
            <label>
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={handleChange}
                />
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
