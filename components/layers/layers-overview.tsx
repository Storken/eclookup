import { Collapse, Typography } from 'antd'
import styled from 'styled-components'
import { artistLayerNames, commonsPerLayer } from '../../utils/layer-helper'
import SelectableImageLayer from './selectable-image-layer'

const LayersOverviewContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacings.xl};
  width: 100%;
`

const ImageFlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const { Panel } = Collapse
const { Title } = Typography

const LayersOverview = () => {
  return (
    <LayersOverviewContainer>
      {Object.keys(commonsPerLayer).map((key, i) => (
        <Collapse defaultActiveKey={[key]} ghost>
          <Panel header={<Title level={4}>Layer {i + 1}</Title>} key={key}>
            <ImageFlexContainer>
              {artistLayerNames.map((name, index) => {
                return (
                  <SelectableImageLayer
                    name={name}
                    layerIndex={i}
                    layerId={`${(index + 1).toString(16)}${i + 1}`}
                  />
                )
              })}
              {//@ts-ignore
              Array(commonsPerLayer[key])
                .fill(0)
                .map((_, index) => {
                  return (
                    <SelectableImageLayer
                      name={'Common ' + (index + 1)}
                      layerIndex={i}
                      layerId={`0${(index + 1).toString(16)}`}
                    />
                  )
                })}
            </ImageFlexContainer>
          </Panel>
        </Collapse>
      ))}
    </LayersOverviewContainer>
  )
}

export default LayersOverview
