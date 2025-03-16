import React from 'react';
import styled from 'styled-components';

const OverlayContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: ${props => props.height || 'auto'};
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    rgba(0, 0, 0, ${props => props.overlayOpacity || 0.6}), 
    rgba(0, 0, 0, ${props => props.overlayOpacity || 0.6})
  ), url(${props => props.src}) center/cover no-repeat;
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  color: ${props => props.textColor || '#fff'};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.justifyContent || 'center'};
  align-items: ${props => props.alignItems || 'center'};
  padding: ${props => props.padding || '2rem'};
`;

const TextOverlay = ({ 
  backgroundSrc, 
  height, 
  overlayOpacity,
  textColor,
  justifyContent,
  alignItems,
  padding,
  children 
}) => {
  return (
    <OverlayContainer height={height}>
      <BackgroundImage 
        src={backgroundSrc} 
        overlayOpacity={overlayOpacity} 
      />
      <Content 
        textColor={textColor}
        justifyContent={justifyContent}
        alignItems={alignItems}
        padding={padding}
      >
        {children}
      </Content>
    </OverlayContainer>
  );
};

export default TextOverlay; 