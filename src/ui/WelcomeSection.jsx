import styled from "styled-components";

const WelcomeSection = styled.div`
  background-color: var(--color-grey-0);
  padding: 2.4rem;
  border-radius: var(--border-radius-md);
  margin-bottom: 2.4rem;
  border: 1px solid var(--color-grey-100);

  h2 {
    margin: 0 0 0.8rem 0;
    font-size: 2rem;
    color: var(--color-grey-800);
  }

  p {
    margin: 0;
    color: var(--color-grey-600);
    font-size: 1.4rem;
  }
`;

export default WelcomeSection;
