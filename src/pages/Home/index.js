import { lazy, useEffect } from "react";

import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/ContactContent.json";
import Calculation from "../../components/Calculation";
import { withTranslation } from "react-i18next";


const ContactFrom = lazy(() => import("../../components/ContactForm"));
const TeamBlock = lazy(() => import("../../components/TeamBlock"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

const Home = ({ t, isAuthorize, setIsAuthorize, setOpenLoginRegisterDialog,setInProfileMOde }) => {

  useEffect(() => {
    // Good!
  }, [isAuthorize]);
  return (
    <Container>
      <ScrollToTop />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

     
      <div style={{ background: '#fff', borderRadius: 30, paddingLeft:15, paddingRight:15}}>
        <ContentBlock
          type="right"
          first="true"
          title={t("introContentTitle")}
          content={t("introContentText")}
          additionalText={t('UsedFree')}
          // button={[{ "title": t("introContentButton1") }, { "title": t("introContentButton2"), "color": "#fff" }]}
          icon="developer.svg"
          id="intro"
        />
      </div>

      <MiddleBlock
        title={MiddleBlockContent.title}
        content={MiddleBlockContent.text}
        button={MiddleBlockContent.button}
        isAuthorize={isAuthorize}
        setIsAuthorize={setIsAuthorize}
        setOpenLoginRegisterDialog={setOpenLoginRegisterDialog}
        setInProfileMOde={setInProfileMOde}
      />
      <ContentBlock
        type="left"
        title={t("HowItTitle")}
        content={t("HowItDesc")}
        section={[{
          "title": t("HowItTitle1"),
          "content": t("HowItDesc1"),
          "icon": "notes.svg"
        }, {
          "title": t("HowItTitle2"),
          "content": t("HowItDesc2"),
          "icon": "notes.svg"
        }]}
        icon="graphs.svg"
        id="about"
      />
      {/* <ContentBlock
        type="right"
        title={MissionContent.title}
        content={MissionContent.text}
        icon="product-launch.svg"
        id="mission"
      /> */}
      <br />
      <Calculation title={t("CalcPageTiTle")}
        content={MissionContent.text} id="mission" icon="product-launch.svg" />
      <br />
      <ContentBlock
        type="left"
        title={t("About").toUpperCase()}
        content={t("OurMission")}
        icon="waving.svg"
        id="product"
      />

      {/* <TeamBlock /> */}
      <br />
      <ContactFrom
        title={t("ContactForm")}
        content={t("ContactFormDesc")}
        id="contact"
      />
    </Container>
  );
};

export default withTranslation()(Home);
