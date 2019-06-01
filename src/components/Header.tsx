import * as React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  background-color: #3b4252;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  font-family: 'Didact Gothic', sans-serif;
  font-size: calc(10px + 2vmin);
  color: #d8dee9;
`

const H2 = styled.h2`
  padding-left: 50px;
`

class Header extends React.Component<{}, {}> {

  render() {
    return (
      <Div>
        <H2>Graph Editor</H2>
      </Div>
    );
  }

}

export default Header;
