import Slider from "react-input-slider";

export default function SliderComponent({
  axis,
  xmax,
  xmin,
  xstep,
  onChange,
  value,
}) {
  return (
    <Slider
      axis={axis}
      x={value}
      xmax={xmax}
      xmin={xmin}
      xstep={xstep}
      onChange={({ x }) => onChange(x)}
    />
  );
}
