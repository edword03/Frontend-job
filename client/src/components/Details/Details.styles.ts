import styled from 'styled-components';

export const DetailsBlock = styled.div`
  background: ${props => props.theme.white};
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  padding: 23px 30px;
  max-width: 660px;
  width: 100%;
  margin-left: 40px;
  margin-bottom: 30px;

  @media screen and (max-width: 1024px) {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    top: -8px;
    margin-left: 0;
    max-width: 100%;
  }
`;

export const DetailsHead = styled.div`
  border-bottom: 2px solid #f9f9f9;
  margin-bottom: 30px;
`;


export const LogoSection = styled.div`
  @media screen and (max-width: 600px) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }
`;

export const DetailsHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const DetailsTitle = styled.h2`
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
`;

export const DetailsSubtitleBlock = styled.div`
  display: flex;
  margin-top: 8px;

  @media screen and (max-width: 600px) {
    margin-top: 12px;
  }
`;

export const Delimetr = styled.div`
  width: 12px;
  height: 1px;
  transform: rotate(90deg);
  margin: auto 15px auto;
  background-color: #9aaab5;
`;

export const DetailsSubtitle = styled.p`
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  color: #9aaab5;

  &:hover {
    text-decoration: underline;
  }
`;

export const DetailsSalary = styled.p`
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 37px;
`;


export const Experience = styled.span`
  color: #9aaab5;
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const ExperienceRequire = styled.span`
  @media screen and (max-width: 600px) {
    display: block;
  }
`;
