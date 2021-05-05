export const getLayerImageURLs = (ids: string[]) => {
  const commonLayerURLBase = `${window.location.origin}/assets/layer_images/common_layers`
  const artistLayerURLBase = `${window.location.origin}/assets/layer_images`
  const images: string[] = []
  for (let i = 0; i < 5; i++) {
    let layerId = ids[i]
    if (layerId.startsWith('0')) {
      images.push(`${commonLayerURLBase}/${i + 1}/${layerId}.png`)
    } else {
      if (Number.parseInt(layerId.slice(0, 1), 16) > 6) {
        const firstLayerId = layerId.slice(0, 1)
        const secondLayerId = layerId.slice(1, 2)
        let firstNumber = Number.parseInt(firstLayerId, 16)
        firstNumber++;
        layerId = firstNumber.toString(16) + secondLayerId
      }
      images.push(`${artistLayerURLBase}/${layerId}.png`)
    }
  }

  return images
}
