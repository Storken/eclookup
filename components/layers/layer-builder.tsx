import { Form, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import styled from 'styled-components'
import useCardLayers from '../../contexts/layer-context'
import { artistLayerNames, commonsPerLayer } from '../../utils/layer-helper'
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
  max-width: 400px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: ${({ theme }) => theme.spacings.md};
  }
`

const LayersOutputWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledSelect = styled(Select)`
  color: black;
`

const { Option } = StyledSelect

const LayerBuilder = () => {
  const { layers, updateLayer } = useCardLayers()
  const [form] = useForm()
  const getLayerIds = (layerIndex: number) => {
    const commonLayerIds = []
    const artistLayerIds = []
    //@ts-ignore
    for (let i = 0; i < commonsPerLayer[layerIndex.toString()]; i++) {
      commonLayerIds.push({
        id: `0${(i + 1).toString(16)}`,
        name: `Common ${i + 1}`
      })
    }
    for (let i = 0; i < artistLayerNames.length; i++) {
      if (artistLayerNames[i] !== '') {
        artistLayerIds.push({
          id: `${(i + 1).toString(16)}${layerIndex + 1}`,
          name: artistLayerNames[i]
        })
      }
    }
    return artistLayerIds.concat(commonLayerIds)
  }

  useEffect(() => {
    const formValues = []
    for (let i = 0; i < 5; i++) {
      formValues.push(['layer' + i, layers[i]])
    }
    form.setFieldsValue(Object.fromEntries(formValues))
  }, [layers])

  return (
    <LayersOutputContainer>
      <LayersOutputWrapper>
        <LayersOutput />
      </LayersOutputWrapper>
      <StyledForm
        form={form}
        name='selectLayers'
        layout='vertical'
        initialValues={Object.fromEntries(
          layers.map((id, i) => [`layer${i}`, id])
        )}
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
