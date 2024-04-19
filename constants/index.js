import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property as windmills",
  },
  {
    label: "Moder",
    icon: MdOutlineVilla,
    description: "This property is modern",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property is has skiing activities",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is a castle",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities",
  },
  {
    label: "Artic",
    icon: BsSnow,
    description: "This property is in artic",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave",
  },
  {
    label: "Dessert",
    icon: GiCactus,
    description: "This property is in the dessert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious!",
  },
];
