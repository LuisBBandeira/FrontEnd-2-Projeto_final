import  { type Anime } from '../../../app/services'

export interface CarouselProps {
    items: Anime[];
    autoPlay?: boolean;
    showDots?: boolean;
    itemClassName?: string;
  }