export const getLayerImageURLs = (ids: string[]) => {
    const commonLayerURLBase = `${window.location.origin}/assets/layer_images/common_layers`
    const artistLayerURLBase = `${window.location.origin}/assets/layer_images`
    const images: string[] = []
    for(let i = 0; i < 5; i++) {
      const layerId = ids[i]
      if (layerId.startsWith('0')) {
        images.push(`${commonLayerURLBase}/${i+1}/${layerId}.png`)
      } else {
        images.push(`${artistLayerURLBase}/${layerId}.png`)
      }
    }

    return images;
  }