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

const StyledCollapse = styled(Collapse)`
  .ant-collapse-header {
    display: flex;
    align-items: center;

    h4 {
      margin: 0;
    }
  }
`

const { Panel } = Collapse
const { Title } = Typography

const LayersOverview = () => {
  return (
    <LayersOverviewContainer>
      {Object.keys(commonsPerLayer).map((key, i) => (
        <StyledCollapse ghost key={'collapse-' + key}>
          <Panel header={<Title level={4}>Layer {i + 1}</Title>} key={key}>
            <ImageFlexContainer>
              {artistLayerNames.map((name, index) => {
                return (
                  <SelectableImageLayer
                    name={name}
                    layerIndex={i}
                    key={`${(index + 1).toString(16)}${i + 1}`}
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
                      key={`0${(index + 1).toString(16)}${i}`}
                      layerId={`0${(index + 1).toString(16)}`}
                    />
                  )
                })}
            </ImageFlexContainer>
          </Panel>
        </StyledCollapse>
      ))}
    </LayersOverviewContainer>
  )
}

export default LayersOverview
