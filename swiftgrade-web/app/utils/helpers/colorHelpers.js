import { LightenDarkenColor } from 'lighten-darken-color';

export const getLightColor = color => (color === '#bdbdbd' ? '#e8e8e8' : LightenDarkenColor(color, 60));
