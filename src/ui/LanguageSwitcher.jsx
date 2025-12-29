import { useTranslation } from "react-i18next";
import styled from "styled-components";

const LanguageContainer = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
`;

const Label = styled.span`
  font-size: 1.3rem;
  color: var(--color-grey-600);
  font-weight: 500;
`;

const LanguageButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  background-color: ${(props) =>
    props.$active ? "var(--color-brand-600)" : "var(--color-grey-200)"};
  color: ${(props) =>
    props.$active ? "var(--color-grey-0)" : "var(--color-grey-600)"};
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.$active ? "var(--color-brand-700)" : "var(--color-grey-300)"};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContainer>
      <Label>Lang:</Label>
      <LanguageButton
        $active={i18n.language === "en"}
        onClick={() => handleLanguageChange("en")}
      >
        EN
      </LanguageButton>
      <LanguageButton
        $active={i18n.language === "zh"}
        onClick={() => handleLanguageChange("zh")}
      >
        中
      </LanguageButton>
    </LanguageContainer>
  );
}

export default LanguageSwitcher;
