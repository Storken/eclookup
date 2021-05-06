export const commonsPerLayer = {
  '0': 14,
  '1': 3,
  '2': 8,
  '3': 2,
  '4': 8
}

export const artistLayerNames = [
  'Zsuzsanna Tasi',
  'Laszlo Ujvarosi',
  'Mihaly Szemeti',
  'Georgo Kovacs',
  'Eskalexia Baws',
  'David Szabo',
  'Pixoloid',
  'Zsolt Kosa',
  'Agnes Szabo',
  'Edvin Avdagic',
  'Ordo Universe',
  'Dirty Robot',
  'Vizie'
]

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
        firstNumber++
        layerId = firstNumber.toString(16) + secondLayerId
      }
      images.push(`${artistLayerURLBase}/${layerId}.png`)
    }
  }

  return images
}

export const getLayerImageURL = (id: string, index: number) => {
  const commonLayerURLBase = `https://eclookup.xyz/assets/layer_images/common_layers`
  const artistLayerURLBase = `https://eclookup.xyz/assets/layer_images`
  if (id.startsWith('0'))
  return `${commonLayerURLBase}/${index}/${id}.png`
  
  let layerId = id
  if (Number.parseInt(layerId.slice(0, 1), 16) > 6) {
    const firstLayerId = layerId.slice(0, 1)
    const secondLayerId = layerId.slice(1, 2)
    let firstNumber = Number.parseInt(firstLayerId, 16)
    firstNumber++
    layerId = firstNumber.toString(16) + secondLayerId
  }
  return `${artistLayerURLBase}/${layerId}.png`
}

export const getLayerArtistNames = (ids: string[]) => {
  const layerNames = []
  for (let i = 0; i < 5; i++) {
    const id = ids[i]
    if (id.startsWith('0')) {
      layerNames.push(`Common ${id.slice(1, 2)}`)
    } else {
      const artistIndex = Number.parseInt(id.slice(0, 1), 16)
      layerNames.push(artistLayerNames[artistIndex])
    }
  }

  return layerNames
}

export const getLayerIdsFromURLs = (urls: string[]) => {
  return urls.map(url => {
    const idIndex = url.indexOf('.png')
    const id = url.slice(idIndex - 2, idIndex)
    let artist = Number.parseInt(id.slice(0, 1), 16)
    const layer = id.slice(1, 2)
    if (artist > 6) {
      artist -= 1
    }
    return artist.toString(16) + layer
  })
}
