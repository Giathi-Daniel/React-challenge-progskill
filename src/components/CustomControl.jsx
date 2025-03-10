import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Popover } from "@headlessui/react"; 
import PropTypes from "prop-types";

export const ColorPicker = ({ value, onChange }) => {
  const [color, setColor] = useState(value || "#3b82f6");

  const handleChange = (newColor) => {
    setColor(newColor);
    onChange(newColor);
  };

  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center gap-2 p-2 bg-white border rounded-lg hover:bg-gray-50">
        <div
          className="w-6 h-6 rounded-full shadow-sm border"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm">{color}</span>
      </Popover.Button>

      <Popover.Panel className="absolute z-20 mt-2 rounded-xl shadow-xl">
        <HexColorPicker color={color} onChange={handleChange} />
      </Popover.Panel>
    </Popover>
  );
};

ColorPicker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const RangeSlider = ({ min, max, value, onChange }) => {
  return (
    <div className="relative pt-6">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
