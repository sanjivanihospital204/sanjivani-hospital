import React, { Fragment } from "react";
import font from "../../fonts/NotoSansGujarati-Regular.ttf";
import boldFont from "../../fonts/NotoSansGujarati-Bold.ttf";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import Header from "./Header";
import Footer from "./Footer";
const logo = require("../../images/logo.png"); // Replace with the actual path to your logo

Font.register({
  family: "NotoSansGujarati",
  format: "truetype",
  fonts: [
    { src: font, fontWeight: 400 },
    { src: boldFont, fontWeight: 600 },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansGujarati",
    boxSizing: "border-box",
    width: "100%",
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "gray",
  },
  mainContent: {
    flexGrow: 1,
    position: "relative",
    textAlign: "center",
    alignItems: "center",
    top: '7%'
  },
  logo: {
    width: "50%",
    height: "auto",
    opacity: 0.1,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
  },
  value: {
    marginLeft: 5,
    paddingLeft: 7,
    width: "100%",
    borderBottom: "1px dotted #000",
    fontSize: 12,
  },
  w80: {
    width: "80%",
  },
  w70: {
    width: "70%",
  },
  w30: {
    width: "30%",
  },
  w40: {
    width: "40%",
  },
  w20: {
    width: "20%",
  },
  w50: {
    width: "50%",
  },
  w100: {
    width: "100%",
  },
});

const PatientData = ({ patient }) => (
  <Fragment>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Header />
          <View style={styles.rowContainer}>
            <View style={[styles.w70, styles.rowContainer]}>
              <Text style={styles.label}>નામ :</Text>
              <Text style={styles.value}>{patient?.name}</Text>
            </View>
            <View style={[styles.w30, styles.rowContainer]}>
              <Text style={styles.label}>તારીખ :</Text>
              <Text style={styles.value}>{patient?.date}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.w100, styles.rowContainer]}>
              <Text style={styles.label}>સરનામું :</Text>
              <Text style={styles.value}>{patient?.address}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.w40, styles.rowContainer]}>
              <Text style={styles.label}>જાતિ :</Text>
              <Text style={styles.value}>{patient?.gender}</Text>
            </View>
            <View style={[styles.w30, styles.rowContainer]}>
              <Text style={styles.label}>ઉંમર :</Text>
              <Text style={styles.value}>{patient?.age}</Text>
            </View>
            <View style={[styles.w30, styles.rowContainer]}>
              <Text style={styles.label}>વજન :</Text>
              <Text style={styles.value}>{patient?.weight}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.w50, styles.rowContainer]}>
              <Text style={styles.label}>ReferDr :</Text>
              <Text style={styles.value}>{patient?.referDoctor}</Text>
            </View>
            <View style={[styles.w50, styles.rowContainer]}>
              <Text style={styles.label}>ConsultantDr :</Text>
              <Text style={styles.value}>{patient?.consultantDoctor}</Text>
            </View>
          </View>

        </View>
        <View style={styles.mainContent}>
          <Image style={styles.logo} src={logo} alt="Logo" />
        </View>
        <View style={styles.footer}>
          <Footer />
        </View>
      </Page>
    </Document>
  </Fragment>
);

export default PatientData;
