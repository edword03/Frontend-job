import styled from 'styled-components';

export const DetailsBlock = styled.div`
  background: ${props => props.theme.white};
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  padding: 23px 30px;
  max-width: 660px;
  width: 100%;
  margin-left: 40px;
`;

export const DetailsHead = styled.div`
  border-bottom: 2px solid #f9f9f9;
  margin-bottom: 30px;
`;

export const HeadLogo = styled.img`
  border-radius: 20px;
  max-width: 130px;
  height: auto;
  margin-right: 20px;
`;

export const DetailsHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const DetailsTitle = styled.h2`
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
`;

export const DetailsSubtitleBlock = styled.div`
  display: flex;
  margin-top: 8px;
`

export const Delimetr = styled.div`
width: 12px;
height: 1px;
transform: rotate(90deg);
margin: auto 15px auto;
background-color: #9AAAB5;
`

export const DetailsSubtitle = styled.p`
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  color: #9aaab5;
`;

export const DetailsSalary = styled.p`
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 37px;
`;

export const DetailsDescription = styled.div`
  p {
    margin-bottom: 15px;
    line-height: 1.57;
  }

  ul > li:before {
    display: block;
    right: 100%;
    padding-right: 6px;
    content: '—';
  }

  ul li p {
    margin: 0;
  }

  li {
    display: flex;
    line-height: 1.57;
    margin-bottom: 5px;
  }
`;

export const Experience = styled.span`
  color: #9aaab5;
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`