import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
const EmergencyLogo = require("../../images/24_7_services.png"); // Replace with the actual path to your logo

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
  },
  header: {
    justifyContent: "space-between",
  },
  logo: {
    width: 70,
    height: 60,
  },
  hrs: {
    fontSize: 25,
    fontWeight: 600,
    color: "#eb550b",
    paddingLeft: 7,
    marginTop: 10
  },
  emergencyText: {
    fontSize: 17,
    fontWeight: 600,
    color: "#0066cc",
    paddingLeft: 7,
  },
  footerContent: {
    textAlign: "center",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    fontSize: 8,
  },
  centerContent: {
    marginLeft: 15,
    alignItems: "center",
    textAlign: "center",
    display: "flex",
  },
  span: {
    color: "#0066cc",
  },
  problems: {
    color: "#0066cc",
    fontSize: 9,
  },
  contact: {
    color: "#990000",
    fontSize: 10,
  },
  warning: {
    fontSize: 11,
  },
  address: {
    color: "#204060",
  },
  time: {
    color: "#204060",
  },
});

const Footer = () => (
  <>
    <View style={[styles.row, styles.header]}>
      <View style={[styles.row]}>
        <Image style={styles.logo} src={EmergencyLogo} alt="Logo" />
        <View>
          <View style={styles.footerContent}>
            <View style={styles.centerContent}>
              <View style={[styles.row]}>
                <Text style={styles.span}>ફરી_________________________</Text>
                <Text style={styles.span}>
                  દિવસ પછી તા._________________________
                </Text>
                <Text style={styles.span}>બતાવવા આવવું</Text>
              </View>
              <Text style={styles.contact}>
                સંપર્ક : ફોન ૦૨૮૪૮-૨૪૨૫૪૫, મો. ૯૦૮૧૪૩૪૩૦૭
              </Text>
              <Text style={styles.address}>
                મહાવીર પ્લાઝા, પંચબીબી રોડ, ડૉ. મનસુખભાઈ માંડવીયા ઓફીસની
                બાજુમાં, પાલીતાણા,
              </Text>
              <Text style={styles.time}>
                ઓપીડી સમય : સવારે ૧૦:૩૦ થી ૨.૦૦ સાંજે ૫.૩૦ થી ૮.૦૦
              </Text>
              <Text style={styles.problems}>
                • દવાથી આવતું રીએકશન દર્દીની તાસીર પર આધાર રાખે છે તે માટે
                ડૉક્ટર જવાબદાર નથી.
              </Text>
              <Text style={styles.warning}>
                • Prescripation valid for only once time
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.hrs}>૨૪ કલાક</Text>
        <Text style={styles.emergencyText}>ઈમરજન્સી સારવાર</Text>
      </View>
    </View>
  </>
);

export default Footer;
