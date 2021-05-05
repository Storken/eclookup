import { Form, Select } from 'antd'
import styled from 'styled-components'
import useCardLayers from '../../contexts/layer-context'
import LayersOutput from './layers-output'

const LayersOutputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
  }
`

const StyledForm = styled(Form)`
  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: ${({ theme }) => theme.spacings.md};
  }
`

const LayersOutputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const StyledSelect = styled(Select)`
  color: black;
`

const { Option } = StyledSelect

const commonLayers = {
  '0': 14,
  '1': 3,
  '2': 8,
  '3': 2,
  '4': 8
}

const artistLayers = [
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

const LayerBuilder = () => {
  const { layers, updateLayer } = useCardLayers()

  const getLayerIds = (layerIndex: number) => {
    const commonLayerIds = []
    const artistLayerIds = []
    //@ts-ignore
    for (let i = 0; i < commonLayers[layerIndex.toString()]; i++) {
      commonLayerIds.push({
        id: `0${(i + 1).toString(16)}`,
        name: `common ${i}`
      })
    }
    for (let i = 0; i < artistLayers.length; i++) {
      if (artistLayers[i] !== '') {
        artistLayerIds.push({
          id: `${(i + 1).toString(16)}${layerIndex + 1}`,
          name: artistLayers[i]
        })
      }
    }
    return artistLayerIds.concat(commonLayerIds)
  }

  return (
    <LayersOutputContainer>
      <LayersOutputWrapper>
        <LayersOutput />
      </LayersOutputWrapper>
      <StyledForm
        name='selectLayers'
        layout='vertical'
        initialValues={{
          ...Object.fromEntries(layers.map((id, i) => [`layer${i}`, id]))
        }}
      >
        {[0, 1, 2, 3, 4].map(index => (
          <Form.Item
            key={'form-item' + index}
            name={`layer${index}`}
            label={`Layer ${index + 1}`}
          >
            <StyledSelect
              value={layers[index]}
              onChange={value => updateLayer(index, value?.toString() ?? '01')}
            >
              {getLayerIds(index).map(({ id, name }) => (
                <Option key={id} style={{ color: 'black' }} value={id}>
                  {name}
                </Option>
              ))}
            </StyledSelect>
          </Form.Item>
        ))}
      </StyledForm>
    </LayersOutputContainer>
  )
}

export default LayerBuilder
