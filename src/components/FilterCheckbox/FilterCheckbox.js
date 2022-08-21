import React from "react";

function FilterCheckBox(props) {
  return (
    <div className="checkbox">
      <label className="checkbox__label">
        <input
          className="checkbox__input"
          type="checkbox"
          id="filter-shortfilm"
          name="shortfilm"
        />
        <span className="checkbox__slider" />
        Короткометражки
      </label>
    </div>
  );
};

export default FilterCheckBox;
