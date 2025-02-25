import { FC, SVGAttributes } from 'react';
import { useStarContext } from '../components/reviewpage/StarContainer';

interface StarIconProps extends SVGAttributes<SVGSVGElement> {
  index: number;
}

const StarIcon: FC<StarIconProps> = (props) => {
  const { index, ...svgsProps } = props;
  const { painting = 0, rating } = useStarContext();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      {...svgsProps}
    >
      <path
        d="M15.5598 19.0002C15.3998 19.0009 15.2421 18.9631 15.0998 18.8902L9.99976 16.2202L4.89976 18.8902C4.73416 18.9773 4.54744 19.0162 4.36084 19.0024C4.17424 18.9887 3.99524 18.9228 3.84419 18.8124C3.69314 18.702 3.5761 18.5514 3.50638 18.3778C3.43665 18.2041 3.41704 18.0144 3.44976 17.8302L4.44976 12.2002L0.329763 8.2002C0.20122 8.07193 0.110034 7.91107 0.0659903 7.7349C0.0219465 7.55872 0.0267076 7.37388 0.0797626 7.2002C0.137723 7.02248 0.244339 6.86456 0.387513 6.74436C0.530687 6.62417 0.704685 6.54651 0.889763 6.52021L6.58976 5.6902L9.09976 0.560204C9.18165 0.391133 9.3095 0.248546 9.46867 0.148777C9.62785 0.049009 9.81191 -0.00390625 9.99976 -0.00390625C10.1876 -0.00390625 10.3717 0.049009 10.5309 0.148777C10.69 0.248546 10.8179 0.391133 10.8998 0.560204L13.4398 5.6802L19.1398 6.51021C19.3248 6.53651 19.4988 6.61417 19.642 6.73436C19.7852 6.85456 19.8918 7.01248 19.9498 7.1902C20.0028 7.36388 20.0076 7.54872 19.9635 7.7249C19.9195 7.90107 19.8283 8.06193 19.6998 8.1902L15.5798 12.1902L16.5798 17.8202C16.6155 18.0077 16.5968 18.2015 16.5259 18.3787C16.455 18.5559 16.3349 18.7091 16.1798 18.8202C15.9987 18.9471 15.7806 19.0104 15.5598 19.0002Z"
        fill={index < (rating ? rating : painting) ? '#FFD900' : '#D1D1D1'}
      />
    </svg>
  );
};

export default StarIcon;
