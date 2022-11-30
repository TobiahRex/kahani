import { GALLERY_TEMPLATE } from './index';

export function stub(_) {
  return _;
}

export function selectCurrentShapes(state) {
  if (state.galleries.currentId) {
    const targetGallery = state.galleries.all.find(
      (shape) => shape.id === state.galleries.currentId);
    return targetGallery;
  }
  return { ...GALLERY_TEMPLATE };
}
