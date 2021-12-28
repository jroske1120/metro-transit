import { Wrapper } from "./Footer.styles";

const Footer: React.FC = () => (
  <Wrapper className="footer">
    <p className="copyright">
      Metro Transit is a service of the&nbsp;
      <strong>
        <a href="https://metrocouncil.org/" target="_blank" rel="noreferrer">
          Metropolitan Council
        </a>
      </strong>
    </p>
    <p>Minneapolis/St. Paul, MN</p>
    <p>© 2021 JJ Roske - Metro Transit</p>
  </Wrapper>
);

export default Footer;
